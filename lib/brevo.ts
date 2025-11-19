// lib/brevo.ts
import * as Brevo from '@getbrevo/brevo';

// Check if the API key is available
if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY is not defined in environment variables.");
}

// --- Client for Transactional Emails ---
const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);
export const brevoTransactionalEmailsApi = transactionalEmailsApi;


// --- Client for Managing Contacts ---
const contactsApi = new Brevo.ContactsApi();
contactsApi.setApiKey(
  Brevo.ContactsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);
export const brevoContactsApi = contactsApi;
