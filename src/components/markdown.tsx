import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Rend du contenu Markdown (corps des articles et projets).
 * Style assuré par le plugin @tailwindcss/typography (classes `prose`).
 */
export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        "prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:text-foreground prose-a:underline-offset-4",
        "prose-pre:border prose-pre:bg-muted prose-pre:text-foreground",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-img:rounded-xl prose-img:border",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
