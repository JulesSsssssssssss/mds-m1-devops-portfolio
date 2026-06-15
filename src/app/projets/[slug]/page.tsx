import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";
import { Markdown } from "@/components/markdown";
import { Tag } from "@/components/tag";
import { GitHubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/projets"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Retour aux projets
      </Link>

      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg">{project.description}</p>

        {project.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}

        {(project.githubUrl || project.demoUrl) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
              >
                <GitHubIcon className="size-4" />
                Voir le code
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }), "rounded-xl")}
              >
                Voir la démo
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        )}
      </header>

      {project.coverImage ? (
        <div className="relative my-8 aspect-video overflow-hidden rounded-2xl border">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="my-8" />
      )}

      {project.content ? (
        <Markdown content={project.content} />
      ) : (
        <p className="text-muted-foreground">
          Pas de description détaillée pour ce projet.
        </p>
      )}
    </article>
  );
}
