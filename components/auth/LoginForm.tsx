// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // Our CLIENT-SIDE Firebase helper
import { createSessionCookie } from "@/app/actions/auth"; // Our SERVER ACTION

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Handler for Email/Password Login ---
  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign in with Firebase on the client side.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Get the ID token from the successful login.
      const idToken = await userCredential.user.getIdToken();

      // 3. Call the Server Action to create the session cookie.
      // This will handle the redirect on the server side.
      await createSessionCookie(idToken);

    } catch (error: any) {
      console.error("Firebase login error:", error);
      toast.error(error.message || "An unknown error occurred.");
      setIsLoading(false);
    }
  };

  // --- Handler for Google Login ---
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      // 1. Sign in with Google via a popup.
      const userCredential = await signInWithPopup(auth, provider);

      // 2. Get the ID token.
      const idToken = await userCredential.user.getIdToken();

      // 3. Call the Server Action to create the session cookie.
      await createSessionCookie(idToken);

    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "An unknown error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
        </div>

        {/* Google Sign-In Button */}
        <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don&appos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
