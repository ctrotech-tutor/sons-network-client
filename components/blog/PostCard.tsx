// components/blog/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define the shape of a post object for type safety
export type Post = {
  id: string;
  title: string;
  cover_image_url: string;
  category: string;
  excerpt: string;
  created_at: string;
  // We'll use a slug for the URL later
  slug: string; 
};

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden h-full transition-all hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={post.cover_image_url || "/placeholder-image.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">{post.category}</Badge>
          <h3 className="text-lg font-bold leading-snug">{post.title}</h3>
          <p className="text-muted-foreground mt-2 text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xs text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
