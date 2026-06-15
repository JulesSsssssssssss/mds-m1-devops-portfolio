import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

export function Projects({
  projects,
  showAllLink = true,
}: {
  projects: Project[];
  showAllLink?: boolean;
}) {
  return (
    <Section id="projets">
      <SectionHeading
        eyebrow="Projets"
        title="Réalisations sélectionnées"
        description="Une sélection de projets sur lesquels j'ai travaillé."
      />

      {projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project, i) => (
              <BlurFade key={project.id} inView delay={0.05 * i}>
                <ProjectCard project={project} />
              </BlurFade>
            ))}
          </div>

          {showAllLink ? (
            <div className="mt-10 flex justify-center">
              <Link
                href="/projets"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-xl")}
              >
                Tous les projets
                <ArrowRight />
              </Link>
            </div>
          ) : null}
        </>
      )}
    </Section>
  );
}

function EmptyProjects() {
  return (
    <div className="border-border text-muted-foreground flex flex-col items-center gap-3 rounded-2xl border border-dashed p-12 text-center">
      <FolderGit2 className="size-8" />
      <p className="font-medium">Aucun projet pour le moment</p>
      <p className="text-sm">
        Ajoutez-en un avec{" "}
        <code className="bg-muted rounded px-1.5 py-0.5">npm run project:add</code>{" "}
        ou <code className="bg-muted rounded px-1.5 py-0.5">npm run db:seed</code>.
      </p>
    </div>
  );
}
