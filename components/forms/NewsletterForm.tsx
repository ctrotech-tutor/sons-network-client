// components/forms/NewsletterForm.tsx
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

// Define the shape of our form's state
type SubscribeState = {
  message: string;
  errors?: { email?: string[] } | null;
};

const initialState: SubscribeState = {
  message: "",
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        const firstError = Object.values(state.errors)[0]?.[0];
        toast.error(firstError || "An error occurred.");
      } else {
        // Use toast.success for both success and "already subscribed" messages
        toast.success(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="flex w-full max-w-sm items-center space-x-2">
      <Input name="email" type="email" placeholder="your.email@example.com" required className="bg-background/80" />
      <SubmitButton />
    </form>
  );
}
