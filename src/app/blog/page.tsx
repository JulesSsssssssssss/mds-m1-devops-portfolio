import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { PostCard } from "@/components/post-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, notes et tutoriels sur le développement et le DevOps.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Section>
      <SectionHeading
        eyebrow="Blog"
        title="Tous les articles"
        description="Mes notes et tutoriels sur le développement et le DevOps."
      />

      {posts.length === 0 ? (
        <div className="border-border text-muted-foreground flex flex-col items-center gap-3 rounded-2xl border border-dashed p-12 text-center">
          <Newspaper className="size-8" />
          <p className="font-medium">Aucun article publié pour le moment</p>
          <p className="text-sm">
            Ajoutez-en un avec{" "}
            <code className="bg-muted rounded px-1.5 py-0.5">npm run post:add</code>{" "}
            ou <code className="bg-muted rounded px-1.5 py-0.5">npm run db:seed</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlurFade key={post.id} inView delay={0.05 * i}>
              <PostCard post={post} />
            </BlurFade>
          ))}
        </div>
      )}
    </Section>
  );
}
