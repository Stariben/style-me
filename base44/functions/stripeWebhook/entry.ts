import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));

Deno.serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userEmail = session.metadata?.user_email;
    const credits = parseInt(session.metadata?.credits || '0');

    if (userEmail && credits > 0) {
      try {
        const base44 = createClientFromRequest(req);
        const users = await base44.asServiceRole.entities.User.filter({ email: userEmail });
        if (users.length > 0) {
          const user = users[0];
          const currentCredits = user.analysis_credits || 0;
          await base44.asServiceRole.entities.User.update(user.id, {
            analysis_credits: currentCredits + credits,
          });
          console.log(`Added ${credits} credits to ${userEmail}. Total: ${currentCredits + credits}`);
        }
      } catch (err) {
        console.error('Error updating credits:', err.message);
      }
    }
  }

  return Response.json({ received: true });
});