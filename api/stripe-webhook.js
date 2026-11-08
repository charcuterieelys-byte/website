import crypto from 'node:crypto';

const DESTINATION_EMAIL = 'elyscharcuteria@gmail.com';
const SENDER_EMAIL = "Ely's Charcuterie <orders@elyscharcuterie.com>";
const LOGO_URL = 'https://www.elyscharcuterie.com/brand/logo-vertical-rojo.png';

function escapeHtml(value) {
  if (value == null) return '';
  return String(value)
    .slice(0, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/[^\x20-\x7E]/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

function verifyStripeSignature(rawPayload, sigHeader, secret) {
  if (!rawPayload || !sigHeader || !secret) return false;
  const parts = Object.fromEntries(
    sigHeader.split(',').map((item) => item.split('='))
  );
  if (!parts.t || !parts.v1) return false;
  const signedPayload = `${parts.t}.${rawPayload}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(parts.v1, 'hex')
    );
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
  }

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
      const sig = req.headers['stripe-signature'];
      const rawBody =
        typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      if (!verifyStripeSignature(rawBody, sig, webhookSecret)) {
        return res.status(400).json({ error: 'Invalid Stripe webhook signature' });
      }
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!event || event.type !== 'checkout.session.completed') {
      return res.status(200).json({ received: true });
    }

    const session = event.data?.object || {};
    const amountTotal = session.amount_total
      ? `$${(session.amount_total / 100).toFixed(2)} ${(session.currency || 'usd').toUpperCase()}`
      : 'Confirmado en Stripe';
    const customerName = session.customer_details?.name || 'Cliente';
    const customerEmail = session.customer_details?.email || '';
    const customerPhone = session.customer_details?.phone || '';

    const metadata = session.metadata || {};
    const isDeposit50 = metadata.payment_mode === 'deposit50';
    const paymentModeLabel = isDeposit50
      ? 'Anticipo de Reserva (50%)'
      : 'Pago Completo (100%)';
    const productNameMeta = metadata.product_name || '';
    const totalPackageUsd = metadata.total_package_usd || '';
    const remainingBalanceUsd = metadata.remaining_balance_usd || '';

    const customFields = Array.isArray(session.custom_fields)
      ? session.custom_fields
      : [];

    const customRows = customFields
      .map((field) => {
        const label = field.label?.custom || field.key || 'Detalle';
        const val =
          field.text?.value ||
          field.dropdown?.value ||
          field.numeric?.value ||
          '-';
        return `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17; width: 38%;">${escapeHtml(label)}:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(val)}</td>
          </tr>
        `;
      })
      .join('');

    const ownerHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 24px; background-color: #E7D095; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #4A120E;">
  <div style="background-color: #FAF5E8; padding: 36px 32px; border: 1px solid #841F17; max-width: 580px; margin: 0 auto;">
    <div style="text-align: center; border-bottom: 1px solid rgba(132,31,23,0.2); padding-bottom: 22px; margin-bottom: 24px;">
      <img src="${LOGO_URL}" alt="Ely's Charcuterie" width="115" style="display: block; margin: 0 auto 14px; width: 115px; height: auto;" />
      <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #841F17; margin: 0; font-weight: 600;">
        PAGO RECIBIDO EN STRIPE &middot; ELY&rsquo;S CHARCUTERIE
      </p>
      <h2 style="font-family: Georgia, 'Times New Roman', serif; color: #841F17; font-weight: normal; margin: 8px 0 0; font-size: 26px;">
        ${isDeposit50 ? `Reserva 50% Pagada (${escapeHtml(amountTotal)})` : `Nuevo Pedido Pagado (${escapeHtml(amountTotal)})`}
      </h2>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6; color: #4A120E;">
      ${
        productNameMeta
          ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17; width: 38%;">Paquete:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600;">${escapeHtml(productNameMeta)}</td>
      </tr>`
          : ''
      }
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17; width: 38%;">Modalidad:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 700;">${escapeHtml(paymentModeLabel)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17; width: 38%;">Monto Cobrado Hoy:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 700;">${escapeHtml(amountTotal)}</td>
      </tr>
      ${
        isDeposit50 && remainingBalanceUsd
          ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17; width: 38%;">Saldo Pendiente (50%):</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 700; color: #841F17;">${escapeHtml(remainingBalanceUsd)} (Total: ${escapeHtml(totalPackageUsd)})</td>
      </tr>`
          : ''
      }
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Cliente:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(customerName)}</td>
      </tr>
      ${
        customerEmail
          ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Correo:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(customerEmail)}</td>
      </tr>`
          : ''
      }
      ${
        customerPhone
          ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Tel&eacute;fono:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(customerPhone)}</td>
      </tr>`
          : ''
      }
      ${customRows}
    </table>
  </div>
</body>
</html>`;

    const ownerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [DESTINATION_EMAIL],
        reply_to: customerEmail || undefined,
        subject: isDeposit50
          ? `Reserva 50% Recibida (${amountTotal}) - ${customerName}`
          : `Pago Completo Recibido (${amountTotal}) - ${customerName}`,
        html: ownerHtml,
      }),
    });

    if (!ownerResponse.ok) {
      const errBody = await ownerResponse.text();
      return res.status(502).json({ error: 'Failed to dispatch notification email', details: errBody });
    }

    if (customerEmail && customerEmail.includes('@')) {
      const clientHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 24px; background-color: #E7D095; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #4A120E;">
  <div style="background-color: #FAF5E8; padding: 36px 32px; border: 1px solid #841F17; max-width: 580px; margin: 0 auto; text-align: center;">
    <img src="${LOGO_URL}" alt="Ely's Charcuterie" width="115" style="display: block; margin: 0 auto 14px; width: 115px; height: auto;" />
    <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #841F17; margin: 0 0 8px; font-weight: 600;">
      ELY&rsquo;S CHARCUTERIE &middot; LOUISVILLE, KY
    </p>
    <h2 style="font-family: Georgia, 'Times New Roman', serif; color: #841F17; font-weight: normal; margin: 0 0 18px; font-size: 26px;">
      Thank you for your order / Gracias por tu pedido
    </h2>
    <p style="line-height: 1.6; font-size: 14px; margin: 0 0 14px;">
      Hola <strong>${escapeHtml(customerName)}</strong>, hemos recibido tu ${isDeposit50 ? 'anticipo de reserva del 50%' : 'pago completo'} por <strong>${escapeHtml(amountTotal)}</strong>${isDeposit50 && remainingBalanceUsd ? ` (saldo restante al recoger: <strong>${escapeHtml(remainingBalanceUsd)}</strong>)` : ''}. Elianne preparar&aacute; tu pedido fresco bajo reserva para recoger (pick-up) en Louisville, Kentucky.
    </p>
    <p style="line-height: 1.6; font-size: 14px; margin: 0;">
      Este pedido es exclusivamente para recoger (Pick-Up) en Louisville, KY. Para coordinar la hora de recogida, escr&iacute;benos directamente por WhatsApp al <a href="https://wa.me/15023454063" style="color: #841F17; font-weight: bold;">+1 (502) 345-4063</a>.
    </p>
  </div>
</body>
</html>`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [customerEmail],
          reply_to: DESTINATION_EMAIL,
          subject: "Confirmacion de Pedido - Ely's Charcuterie",
          html: clientHtml,
        }),
      });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Webhook error' });
  }
}
