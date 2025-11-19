// app/actions/newsletter.ts
"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import { brevoContactsApi, brevoTransactionalEmailsApi } from "@/lib/brevo";

// --- TYPE DEFINITIONS ---

// 1. Define a precise type for our action's state. This replaces 'any' for prevState.
type SubscribeState = {
  message: string;
  errors?: {
    email?: string[];
  } | null;
};

// 2. Define the shape of a Brevo API error.
interface BrevoErrorResponse {
  response: {
    body: {
      code: string;
      message: string;
    };
  };
}

/**
 * A robust, type-safe guard to check if an error is a Brevo API error.
 * This version avoids all uses of 'any'.
 * @param error The error object to check, of type 'unknown'.
 * @returns True if the error matches the BrevoErrorResponse shape.
 */
function isBrevoError(error: unknown): error is BrevoErrorResponse {
  if (typeof error !== "object" || error === null) return false;

  const err = error as Record<string, unknown>;
  if (typeof err.response !== "object" || err.response === null) return false;

  const response = err.response as Record<string, unknown>;
  if (typeof response.body !== "object" || response.body === null) return false;

  const body = response.body as Record<string, unknown>;
  return typeof body.message === "string";
}
// ------------------------

// Zod schema for form validation (unchanged)
const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// --- IMPORTANT: REPLACE THESE WITH YOUR REAL IDs ---
const BREVO_LIST_ID = 1; // Replace with your "Newsletter Subscribers" list ID
const BREVO_WELCOME_TEMPLATE_ID = 1; // Replace with your "Welcome Email" template ID
// ------------------------------------------------

// 3. Use the 'SubscribeState' type for prevState, eliminating 'any'.
export async function subscribeToNewsletter(
  prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const validatedFields = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  try {
    // Step 1: Save to Supabase
    const { error: supabaseError } = await supabase
      .from("subscribers")
      .insert({ email: email, status: "subscribed" });

    if (supabaseError) {
      if (supabaseError.code === "23505") {
        await brevoContactsApi.createContact({
          email,
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        });
        return { message: "You are already subscribed!", errors: null };
      }
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    // Step 2 & 3: Sync to Brevo and send welcome email
    await Promise.all([
      brevoContactsApi.createContact({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
      brevoTransactionalEmailsApi.sendTransacEmail({
        templateId: BREVO_WELCOME_TEMPLATE_ID,
        to: [{ email: email }],
      }),
    ]);

    return { message: "Success! A welcome email is on its way.", errors: null };

  } catch (error) {
    console.error("Subscription Error:", error);

    if (isBrevoError(error)) {
      console.error("Brevo API Error Body:", error.response.body);
      return {
        message: `Could not complete subscription: ${error.response.body.message || 'API error'}`,
        errors: null,
      };
    }

    return { message: "An unexpected error occurred. Please try again later.", errors: null };
  }
}
