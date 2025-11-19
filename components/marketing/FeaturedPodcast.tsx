// components/marketing/FeaturedPodcast.tsx
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AudioPlayer from "@/components/podcast/AudioPlayer";

// Define the shape of a podcast object (unchanged)
type Podcast = {
  id: string;
  title: string;
  audio_url: string;
  description: string;
  duration: number;
  cover_image_url: string;
};

// --- THIS IS THE CORRECTED FUNCTION ---
async function getLatestPodcast(): Promise<Podcast | null> {
  // We remove .single() and handle the result manually.
  const { data, error } = await supabase
    .from("podcasts")
    .select("id, title, audio_url, description, duration, cover_image_url")
    .order("created_at", { ascending: false })
    .limit(1); // Fetch an array with at most one item

  // If there's a database error (like RLS issues), log it and return null.
  if (error) {
    console.error("Error fetching latest podcast:", error);
    return null;
  }

  // If the query is successful but returns no data (an empty array), return null.
  // This gracefully handles the case where the table is empty.
  if (!data || data.length === 0) {
    return null;
  }

  // If we have data, return the first (and only) item in the array.
  return data[0] as Podcast;
}
// -----------------------------------------

export default async function FeaturedPodcast() {
  const podcast = await getLatestPodcast();

  // If getLatestPodcast returns null, this component will render nothing.
  if (!podcast) {
    return null;
  }

  // The rest of the component's JSX remains exactly the same.
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side: Cover Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src={podcast.cover_image_url || "/hero-bg.jpg"}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Details & Player */}
          <div className="flex flex-col space-y-4">
            <Badge className="w-fit">Latest Episode</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{podcast.title}</h2>
            <p className="text-muted-foreground line-clamp-3">{podcast.description}</p>
            
            <AudioPlayer src={podcast.audio_url} />

            <div className="pt-4">
                <Link href="/podcasts">
                    <Button>View All Episodes</Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
