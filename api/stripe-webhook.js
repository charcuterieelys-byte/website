import crypto from 'node:crypto';

const DESTINATION_EMAIL = 'elyscharcuteria@gmail.com';
const SENDER_EMAIL = "Ely's Charcuterie <orders@elyscharcuterie.com>";

function escapeHtml(value) {
  if (value == null) return '';
  return String(value)
    .slice(0, 500)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
          '—';
        return `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">${escapeHtml(label)}:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(val)}</td>
          </tr>
        `;
      })
      .join('');

    const ownerHtml = `
      <div style="font-family: Georgia, serif; color: #4A120E; background-color: #FAF5E8; padding: 32px; border: 1px solid #841F17; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #841F17; margin: 0 0 8px;">
          PAGO RECIBIDO EN STRIPE · ELY'S CHARCUTERIE
        </p>
        <h2 style="color: #841F17; font-weight: normal; margin: 0 0 18px; font-size: 26px;">
          Nuevo Pedido Pagado (${escapeHtml(amountTotal)})
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Monto Pagado:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold;">${escapeHtml(amountTotal)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Cliente:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(customerName)}</td>
          </tr>
          ${
            customerEmail
              ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Correo:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(customerEmail)}</td>
          </tr>`
              : ''
          }
          ${
            customerPhone
              ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Teléfono:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(customerPhone)}</td>
          </tr>`
              : ''
          }
          ${customRows}
        </table>
      </div>
    `;

    const ownerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [DESTINATION_EMAIL],
        reply_to: customerEmail || undefined,
        subject: `✅ Pago Recibido (${amountTotal}) — ${customerName}`,
        html: ownerHtml,
      }),
    });

    if (!ownerResponse.ok) {
      const errBody = await ownerResponse.text();
      return res.status(502).json({ error: 'Failed to dispatch notification email', details: errBody });
    }

    if (customerEmail && customerEmail.includes('@')) {
      const clientHtml = `
        <div style="font-family: Georgia, serif; color: #4A120E; background-color: #FAF5E8; padding: 32px; border: 1px solid #841F17; max-width: 600px; margin: 0 auto;">
          <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #841F17; margin: 0 0 8px;">
            ELY'S CHARCUTERIE · LOUISVILLE, KY
          </p>
          <h2 style="color: #841F17; font-weight: normal; margin: 0 0 16px; font-size: 26px;">
            Thank you for your order / Gracias por tu pedido
          </h2>
          <p style="line-height: 1.6; font-size: 14px;">
            Hola <strong>${escapeHtml(customerName)}</strong>, hemos recibido tu pago por <strong>${escapeHtml(amountTotal)}</strong>. Elianne preparará tu pedido fresco bajo reserva en Louisville, Kentucky.
          </p>
          <p style="line-height: 1.6; font-size: 14px;">
            Si deseas coordinar algún detalle adicional de entrega, puedes escribirnos directamente por WhatsApp al <a href="https://wa.me/15023454063" style="color: #841F17; font-weight: bold;">+1 (502) 345-4063</a>.
          </p>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [customerEmail],
          reply_to: DESTINATION_EMAIL,
          subject: `Confirmación de Pedido — Ely's Charcuterie`,
          html: clientHtml,
        }),
      });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Webhook error' });
  }
}
