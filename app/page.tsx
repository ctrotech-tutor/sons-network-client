// app/page.tsx
import HeroSection from "@/components/marketing/HeroSection";
import RecentPosts from "@/components/marketing/RecentPosts";
import FeaturedPodcast from "@/components/marketing/FeaturedPodcast";
import FeaturedChallenge from "@/components/marketing/FeaturedChallenge";
import UpcomingEvents from "@/components/marketing/UpcomingEvents";
import DonationCta from "@/components/marketing/DonationCta";

export default function LandingPage() {
  return (
    <div>
      <HeroSection
        headline="GROW IN FAITH, TOGETHER."
        subheadline="Explore weekly teachings, podcasts, and programs designed for the modern believer."
        buttonText="Explore Our Blog"
        buttonLink="/blog"
      />
      <RecentPosts />
      <FeaturedPodcast />
      <FeaturedChallenge />
      <UpcomingEvents />
      <DonationCta />
    </div>
  );
}
