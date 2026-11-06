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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY environment variable' });
  }

  try {
    const {
      selection = '',
      name = '',
      email = '',
      phone = '',
      date = '',
      guests = '',
      notes = '',
      website = '',
    } = req.body || {};

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!String(name).trim() || !String(selection).trim()) {
      return res.status(400).json({ error: 'Name and selection are required' });
    }

    const html = `<!DOCTYPE html>
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
        ELY&rsquo;S CHARCUTERIE &middot; LOUISVILLE, KY
      </p>
      <h2 style="font-family: Georgia, 'Times New Roman', serif; color: #841F17; font-weight: normal; margin: 8px 0 0; font-size: 26px;">
        Nuevo Pedido / Cotizaci&oacute;n Web
      </h2>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6; color: #4A120E;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17; width: 38%;">Selecci&oacute;n:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(selection)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Cliente:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(name)}</td>
      </tr>
      ${
        email
          ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Correo:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(email)}</td>
      </tr>`
          : ''
      }
      ${
        phone
          ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Tel&eacute;fono:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(phone)}</td>
      </tr>`
          : ''
      }
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Fecha deseada:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(date || 'Flexible')}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15); font-weight: 600; color: #841F17;">Invitados:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid rgba(132,31,23,0.15);">${escapeHtml(guests || 'Por confirmar')}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: 600; color: #841F17; vertical-align: top;">Notas / Detalles:</td>
        <td style="padding: 10px 0;">${escapeHtml(notes || 'Ninguna')}</td>
      </tr>
    </table>
  </div>
</body>
</html>`;

    const payload = {
      from: SENDER_EMAIL,
      to: [DESTINATION_EMAIL],
      subject: `Nuevo Pedido Web: ${String(selection).slice(0, 80)} - ${String(name).slice(0, 60)}`,
      html,
    };

    if (email && String(email).includes('@')) {
      payload.reply_to = String(email).slice(0, 200);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' });
  }
}
