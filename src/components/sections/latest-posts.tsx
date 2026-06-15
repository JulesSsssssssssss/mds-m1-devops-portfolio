import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { PostCard } from "@/components/post-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

export function LatestPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <Section id="blog">
      <SectionHeading
        eyebrow="Blog"
        title="Derniers articles"
        description="Mes notes et tutoriels sur le développement et le DevOps."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <BlurFade key={post.id} inView delay={0.05 * i}>
            <PostCard post={post} />
          </BlurFade>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
        >
          Tous les articles
          <ArrowRight />
        </Link>
      </div>
    </Section>
  );
}
