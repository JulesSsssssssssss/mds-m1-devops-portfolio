import { GraduationCap, Briefcase } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { timeline } from "@/config/content";

export function Experience() {
  return (
    <Section id="parcours">
      <SectionHeading eyebrow="Parcours" title="Formation & expériences" />

      <div className="relative">
        {/* Ligne verticale */}
        <div className="bg-border absolute top-2 bottom-2 left-[19px] w-px md:left-[23px]" />

        <ol className="flex flex-col gap-8">
          {timeline.map((item, i) => {
            const Icon = item.type === "education" ? GraduationCap : Briefcase;
            return (
              <BlurFade key={`${item.title}-${i}`} inView delay={0.05 * i}>
                <li className="relative flex gap-5">
                  <span className="border-border bg-background z-10 flex size-10 shrink-0 items-center justify-center rounded-full border md:size-12">
                    <Icon className="size-5" />
                  </span>
                  <div className="pt-1">
                    <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {item.period}
                    </span>
                    <h3 className="mt-1 font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-foreground/80 text-sm font-medium">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                      {item.description}
                    </p>
                  </div>
                </li>
              </BlurFade>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
