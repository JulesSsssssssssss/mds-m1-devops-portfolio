import type { Metadata } from "next";
import { FolderGit2 } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectCard } from "@/components/project-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projets",
  description: "L'ensemble de mes projets et réalisations.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Section>
      <SectionHeading
        eyebrow="Projets"
        title="Tous les projets"
        description="L'ensemble de mes réalisations."
      />

      {projects.length === 0 ? (
        <div className="border-border text-muted-foreground flex flex-col items-center gap-3 rounded-2xl border border-dashed p-12 text-center">
          <FolderGit2 className="size-8" />
          <p className="font-medium">Aucun projet pour le moment</p>
          <p className="text-sm">
            Ajoutez-en un avec{" "}
            <code className="bg-muted rounded px-1.5 py-0.5">npm run project:add</code>{" "}
            ou <code className="bg-muted rounded px-1.5 py-0.5">npm run db:seed</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <BlurFade key={project.id} inView delay={0.05 * i}>
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      )}
    </Section>
  );
}
