// components/marketing/FeaturedChallenge.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react"; // A fitting icon for a Bible challenge

export default function FeaturedChallenge() {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 sm:py-24">
      <div className="container text-center flex flex-col items-center space-y-6">
        
        {/* Icon */}
        <div className="p-4 bg-primary/10 rounded-full">
          <BookMarked className="h-10 w-10 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
          Embark on the 90-Day Bible Challenge
        </h2>

        {/* Description */}
        <p className="text-lg max-w-3xl text-muted-foreground">
          Transform your spiritual life with our guided 90-day reading plan. Receive daily devotionals, track your progress, and join a community committed to growing together.
        </p>

        {/* Call to Action */}
        <div className="pt-4">
          <Link href="/challenge">
            <Button size="lg" className="text-lg px-8 py-6">
              Learn More & Join
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
