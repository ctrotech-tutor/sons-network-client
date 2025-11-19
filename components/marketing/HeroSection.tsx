// components/marketing/HeroSection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the types for the props we will pass to the component
interface HeroSectionProps {
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonLink: string;
}

export default function HeroSection({
  headline,
  subheadline,
  buttonText,
  buttonLink,
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Layer 1: Background Image & Overlay (This part remains the same) */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-primary/30"></div>
      </div>

      {/* Layer 2: Content (Now uses props for dynamic text) */}
      <div className="relative z-10 container text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
          {headline}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90 text-shadow">
          {subheadline}
        </p>
        <div className="flex justify-center">
          <Link href={buttonLink}>
            <Button size="lg" className="text-lg px-8 py-6 transition-transform hover:scale-105">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
