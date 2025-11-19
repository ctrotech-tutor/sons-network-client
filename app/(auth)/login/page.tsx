// app/(auth)/login/page.tsx

// This is a Server Component, so it can import Server Actions
import { signInWithEmail, signInWithGoogle } from "@/app/actions/auth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <LoginForm
      signInWithEmail={signInWithEmail}
      signInWithGoogle={signInWithGoogle}
    />
  );
}
