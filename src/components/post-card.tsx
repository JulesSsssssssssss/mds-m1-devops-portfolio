import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Tag } from "@/components/tag";
import { formatDate, readingMinutes } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-border bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors hover:border-foreground/20">
      {post.coverImage ? (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {formatDate(post.publishedAt ?? post.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {readingMinutes(post.content)} min
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>

        <p className="text-muted-foreground line-clamp-3 text-sm">
          {post.excerpt}
        </p>

        {post.tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
