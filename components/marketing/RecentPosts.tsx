// components/marketing/RecentPosts.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import PostCard, { Post } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";

async function getRecentPosts(): Promise<Post[]> {
  // Fetch the 3 most recent posts from the 'posts' table
  // We will also need a 'slug' column for the URL, let's select it.
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, cover_image_url, category, excerpt, created_at, slug")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }

  return data as Post[];
}

export default async function RecentPosts() {
  const posts = await getRecentPosts();

  if (posts.length === 0) {
    return null; // Don't render the section if there are no posts
  }

  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">From the Blog</h2>
          <Link href="/blog">
            <Button variant="ghost">View All Posts &rarr;</Button>
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
