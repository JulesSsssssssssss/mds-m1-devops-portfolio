import { Mail, MapPin, Briefcase } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig } from "@/config/site";

export function About() {
  const facts = [
    { Icon: Briefcase, label: siteConfig.role },
    siteConfig.location ? { Icon: MapPin, label: siteConfig.location } : null,
    siteConfig.email ? { Icon: Mail, label: siteConfig.email } : null,
  ].filter(Boolean) as { Icon: React.ComponentType<{ className?: string }>; label: string }[];

  return (
    <Section id="a-propos">
      <SectionHeading eyebrow="À propos" title="Quelques mots sur moi" />
      <div className="grid gap-10 md:grid-cols-3">
        <BlurFade inView className="md:col-span-2">
          <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
            {siteConfig.bio}
          </p>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <ul className="flex flex-col gap-4">
            {facts.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="border-border bg-muted/50 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </Section>
  );
}
