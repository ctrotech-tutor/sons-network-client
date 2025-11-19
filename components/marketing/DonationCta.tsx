// components/marketing/DonationCta.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react"; // An icon that represents partnership and giving

export default function DonationCta() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-secondary p-8 md:p-12 rounded-lg">
          
          {/* Left Side: The Message */}
          <div className="space-y-4">
            <div className="inline-block p-3 bg-primary/10 rounded-lg">
                <HeartHandshake className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Partner With Our Mission
            </h2>
            <p className="text-muted-foreground">
              Your generous contributions enable us to create high-quality content, develop new discipleship programs, and reach more people around the world with a message of hope. Join us in making a difference.
            </p>
          </div>

          {/* Right Side: The Action */}
          <div className="flex flex-col items-center justify-center text-center">
            <Link href="/donate">
              <Button size="lg" className="text-lg px-10 py-7 w-full sm:w-auto">
                Donate Now
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Securely processed by Flutterwave
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
