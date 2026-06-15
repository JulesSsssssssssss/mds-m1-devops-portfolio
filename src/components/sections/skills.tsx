import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { Tag } from "@/components/tag";
import { skillGroups, allSkills } from "@/config/content";

export function Skills() {
  return (
    <Section id="competences">
      <SectionHeading
        eyebrow="Compétences"
        title="Technologies & outils"
        description="Les technologies avec lesquelles je travaille au quotidien."
      />

      {/* Bandeau défilant */}
      <BlurFade inView>
        <div className="relative mb-12 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s]">
            {allSkills.map((skill) => (
              <Tag key={skill} className="px-4 py-1.5 text-sm">
                {skill}
              </Tag>
            ))}
          </Marquee>
          {/* Fondus latéraux */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l to-transparent" />
        </div>
      </BlurFade>

      {/* Grille des catégories */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <BlurFade key={group.title} inView delay={0.05 * i}>
            <div className="border-border bg-card h-full rounded-2xl border p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="border-border bg-muted/50 flex size-10 items-center justify-center rounded-lg border">
                  <group.icon className="size-5" />
                </span>
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
