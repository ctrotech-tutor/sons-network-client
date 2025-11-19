import Image from "next/image";

// --- Types ---
type Post = {
  title: string;
  excerpt: string;
  image: string;
  content: string;
};

// --- Post collection with proper typing ---
const posts: Record<string, Post> = {
  "90-days-bible-challenge": {
    title: "90 Days Bible Challenge – A Journey That Transforms You",
    excerpt:
      "A structured, spirit-filled Bible immersion experience for believers hungry for depth, consistency, and transformation.",
    image: "/images/bible-hero.jpg",
    content: `
      <p>The Sons Network invites you into a deeper walk with God through our daily Bible immersion challenge.</p>
    `,
  },

  "sons-network-vision": {
    title: "The Sons Network – Our Vision & Purpose",
    excerpt:
      "A kingdom-minded community built to raise strong believers through mentorship, discipleship, and spiritual growth.",
    image: "/images/sons-vision.jpg",
    content: `
      <p>The Sons Network exists to build, train, and raise believers with discipline & clarity.</p>
    `,
  },
};

// --- Dynamic Metadata (must be async in Next.js now) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// --- Page Component (must be async and unwrap params) ---
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-semibold text-gray-600">Post not found.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-5 md:px-16">
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>

        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <article
        className="max-w-3xl mx-auto prose dark:prose-invert prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section className="max-w-3xl mx-auto mt-16 text-center">
        <a
          href="https://chat.whatsapp.com/BZFzCHyNVqM5c0r6nnlbvC?mode=ems_copy_t"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow"
        >
          Join The Sons Network
        </a>
      </section>
    </main>
  );
}
