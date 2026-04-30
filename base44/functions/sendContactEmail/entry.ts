import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subject, message, type } = await req.json();
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');

    if (!ADMIN_EMAIL) {
      return Response.json({ error: 'Admin email not configured' }, { status: 500 });
    }

    let emailSubject, emailBody;

    if (type === 'contact') {
      emailSubject = `[StyleMatch Contact] ${subject}`;
      emailBody = `Message de ${user.full_name} (${user.email}):\n\n${message}`;
    } else if (type === 'delete') {
      emailSubject = `[StyleMatch] Demande de suppression de compte`;
      emailBody = `Bonjour,\n\nL'utilisateur suivant a demandé la suppression de son compte :\n\nNom : ${user.full_name || 'N/A'}\nEmail : ${user.email}\n\nConformément à notre politique de confidentialité, la suppression sera effectuée dans un délai de 30 jours.\n\nVeuillez traiter cette demande.\n\nStyleMatch`;
    } else {
      return Response.json({ error: 'Invalid type' }, { status: 400 });
    }

    await base44.integrations.Core.SendEmail({
      to: ADMIN_EMAIL,
      subject: emailSubject,
      body: emailBody,
      from_name: 'StyleMatch',
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});