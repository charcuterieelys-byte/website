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
      website = '', // Honeypot field
    } = req.body || {};

    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!String(name).trim() || !String(selection).trim()) {
      return res.status(400).json({ error: 'Name and selection are required' });
    }

    const html = `
      <div style="font-family: Georgia, serif; color: #4A120E; background-color: #FAF5E8; padding: 32px; border: 1px solid #841F17; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #841F17; margin: 0 0 8px;">
          ELY'S CHARCUTERIE · NUEVA SOLICITUD WEB
        </p>
        <h2 style="color: #841F17; font-weight: normal; margin: 0 0 20px; font-size: 26px;">
          Nuevo Pedido / Cotización
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Selección:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(selection)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Cliente:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(name)}</td>
          </tr>
          ${
            email
              ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Correo:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(email)}</td>
          </tr>`
              : ''
          }
          ${
            phone
              ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Teléfono:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(phone)}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Fecha deseada:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(date || 'Flexible')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18); font-weight: bold; color: #841F17;">Invitados:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid rgba(132,31,23,0.18);">${escapeHtml(guests || 'Por confirmar')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #841F17; vertical-align: top;">Notas / Detalles:</td>
            <td style="padding: 8px 0;">${escapeHtml(notes || 'Ninguna')}</td>
          </tr>
        </table>
      </div>
    `;

    const payload = {
      from: SENDER_EMAIL,
      to: [DESTINATION_EMAIL],
      subject: `Nuevo Pedido Web: ${escapeHtml(selection)} — ${escapeHtml(name)}`,
      html,
    };

    if (email && String(email).includes('@')) {
      payload.reply_to = String(email).slice(0, 200);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
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
