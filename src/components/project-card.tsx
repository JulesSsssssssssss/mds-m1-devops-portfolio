import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { Tag } from "@/components/tag";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <MagicCard className="h-full rounded-2xl" gradientColor="#9E7AFF22">
      <article className="flex h-full flex-col">
        {/* Couverture (image ou dégradé de repli) */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="from-muted to-background flex h-full w-full items-center justify-center bg-linear-to-br">
              <span className="text-4xl font-bold tracking-tight text-foreground/20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight">
              <Link
                href={`/projets/${project.slug}`}
                className="after:absolute after:inset-0 hover:underline"
              >
                {project.title}
              </Link>
            </h3>
            <ArrowUpRight className="text-muted-foreground size-5 shrink-0" />
          </div>

          <p className="text-muted-foreground line-clamp-3 text-sm">
            {project.description}
          </p>

          {project.tags.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}

          {/* Liens externes (au-dessus du lien couvrant la carte grâce à z-10) */}
          {(project.githubUrl || project.demoUrl) && (
            <div className="relative z-10 flex items-center gap-3 pt-1">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
                >
                  <GitHubIcon className="size-4" /> Code
                </a>
              ) : null}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
                >
                  <ArrowUpRight className="size-4" /> Démo
                </a>
              ) : null}
            </div>
          )}
        </div>
      </article>
    </MagicCard>
  );
}
