import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// In-memory rate limit store: { email -> { count, windowStart } }
const rateLimitStore = new Map();
const RATE_LIMIT_MAX = 5;       // max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(email) {
  const now = Date.now();
  const entry = rateLimitStore.get(email);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(email, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isRateLimited(user.email)) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { subject, message, type } = await req.json();

    // Input validation
    if (type === 'contact') {
      if (!subject || typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 200) {
        return Response.json({ error: 'Invalid subject' }, { status: 400 });
      }
      if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 2000) {
        return Response.json({ error: 'Invalid message' }, { status: 400 });
      }
    }

    let emailSubject, emailBody;

    // Sanitize user-provided fields to prevent injection
    const safeName = (user.full_name || 'N/A').replace(/[<>&"']/g, '');
    const safeEmail = (user.email || '').replace(/[<>&"']/g, '');
    const safeSubject = type === 'contact' ? subject.replace(/[<>&"']/g, '') : '';
    const safeMessage = type === 'contact' ? message.replace(/[<>&"']/g, '') : '';

    if (type === 'contact') {
      emailSubject = `[StyleMatch Contact] ${safeSubject}`;
      emailBody = `Message de ${safeName} (${safeEmail}):\n\n${safeMessage}`;
    } else if (type === 'delete') {
      emailSubject = `[StyleMatch] Demande de suppression de compte`;
      emailBody = `Bonjour,\n\nL'utilisateur suivant a demandé la suppression de son compte :\n\nNom : ${safeName}\nEmail : ${safeEmail}\n\nConformément à notre politique de confidentialité, la suppression sera effectuée dans un délai de 30 jours.\n\nVeuillez traiter cette demande.\n\nStyleMatch`;
    } else {
      return Response.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Send confirmation email to the user who made the request
    await base44.integrations.Core.SendEmail({
      to: user.email,
      subject: emailSubject,
      body: emailBody,
      from_name: 'StyleMatch',
    });

    // Also notify all admin users
    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    await Promise.all(
      admins
        .filter(a => a.email !== user.email)
        .map(admin =>
          base44.asServiceRole.integrations.Core.SendEmail({
            to: admin.email,
            subject: emailSubject,
            body: emailBody,
            from_name: 'StyleMatch',
          })
        )
    );

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});