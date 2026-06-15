import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/posts";
import { Markdown } from "@/components/markdown";
import { Tag } from "@/components/tag";
import { formatDate, readingMinutes } from "@/lib/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Retour au blog
      </Link>

      <header className="flex flex-col gap-4">
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            {formatDate(post.publishedAt ?? post.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" />
            {readingMinutes(post.content)} min de lecture
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </header>

      {post.coverImage ? (
        <div className="relative my-8 aspect-video overflow-hidden rounded-2xl border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="my-8" />
      )}

      <Markdown content={post.content} />
    </article>
  );
}
