// app/api/newsletter/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

// --- IMPORTANT: REPLACE THESE WITH YOUR REAL IDs ---
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 3; // Replace with your "Newsletter Subscribers" list ID
const BREVO_WELCOME_TEMPLATE_ID = 4; // Replace with your "Welcome Email" template ID
// ------------------------------------------------

const EmailSchema = z.string().email({ message: "Please enter a valid email address" });

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Validate the email
    const validation = EmailSchema.safeParse(email);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error('Brevo API Key or List ID not configured');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // 2. Add contact to Brevo list
    const brevoContactUrl = 'https://api.brevo.com/v3/contacts';
    const contactData = {
      email: validation.data,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(contactData ),
    };

    const contactResponse = await fetch(brevoContactUrl, options);

    if (!contactResponse.ok && contactResponse.status !== 400) { // 400 can mean contact exists, which is ok
       const errorData = await contactResponse.json();
       console.error('Brevo API Error (Contact):', errorData);
       return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
    }

    // 3. Send the welcome email (if template ID is set)
    if (BREVO_WELCOME_TEMPLATE_ID) {
        const brevoEmailUrl = 'https://api.brevo.com/v3/smtp/email';
        const emailData = {
            to: [{ email: validation.data }],
            templateId: BREVO_WELCOME_TEMPLATE_ID,
        };
        const emailOptions = { ...options, body: JSON.stringify(emailData ) };
        
        const emailResponse = await fetch(brevoEmailUrl, emailOptions);
        if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            console.error('Brevo API Error (Email):', errorData);
            // We don't block success if only the email fails, but we log it.
        }
    }

    // We will no longer use Supabase for this flow to keep it simple as per the article's direct approach.
    // If the API calls succeed, we return a success message.
    return NextResponse.json({ message: 'Success! Thank you for subscribing.' }, { status: 201 });

  } catch (error) {
    console.error('Error in subscribe API route:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
