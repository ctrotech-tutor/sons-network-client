// components/core/Footer.tsx
import Link from "next/link";
import { Youtube, Instagram, Twitter, Facebook } from "lucide-react";
import NewsletterForm from "../forms/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold">The Sons Network</h3>
            <p className="text-muted-foreground max-w-xs">
              A digital space for believers to learn, grow, and connect.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-lg mb-2">Navigate</h4>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link href="/testimonies" className="text-muted-foreground hover:text-primary transition-colors">Testimonies</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          </div>

          {/* Column 3: Explore Content */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-lg mb-2">Explore</h4>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link href="/podcasts" className="text-muted-foreground hover:text-primary transition-colors">Podcasts</Link>
            <Link href="/shows" className="text-muted-foreground hover:text-primary transition-colors">Shows</Link>
            <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link>
            <Link href="/challenge" className="text-muted-foreground hover:text-primary transition-colors">90-Day Challenge</Link>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4 md:col-span-1">
            <h4 className="font-semibold text-lg">Join the Community</h4>
            <p className="text-muted-foreground">Get weekly inspiration and updates delivered to your inbox.</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t">
        <div className="container flex items-center justify-center py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} The Sons Network. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
