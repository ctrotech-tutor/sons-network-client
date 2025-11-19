import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Walking in Purpose: Finding Strength for Each New Season",
      excerpt:
        "Learn how to stay rooted in faith while navigating different stages of life with grace and confidence.",
      image: "/sample/blog1.jpg",
      category: "Faith",
    },
    {
      id: 2,
      title: "How to Build a Prayer Habit That Truly Lasts",
      excerpt:
        "Practical steps to ignite your spiritual consistency and build a strong daily prayer rhythm.",
      image: "/sample/blog2.jpg",
      category: "Spiritual Growth",
    },
    {
      id: 3,
      title: "Lessons from the 90 Days Bible Challenge",
      excerpt:
        "Deep insights from hundreds of believers who journeyed together to seek God’s Word with devotion.",
      image: "/sample/blog3.jpg",
      category: "Bible Challenge",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* -------------------------------------------------------- */}
      {/* HERO */}
      {/* -------------------------------------------------------- */}
      <section className="w-full border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Inspiring Articles for Your Walk With God
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore teachings, devotionals, insights, and spiritual reflections
            curated for believers who want to grow and stay rooted in Christ.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- */}
      {/* POSTS LIST */}
      {/* -------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid gap-10">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="bg-card border border-border rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group"
          >
            {/* Image */}
            <div className="w-full h-56 overflow-hidden bg-muted">
              <Image
                src="/hero-bg.jpg"
                alt="The Sons Network Bible Challenge"
                fill
                className="object-cover hidden"
                priority
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-3">
                {post.category}
              </span>

              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <span className="text-primary font-medium text-sm">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
