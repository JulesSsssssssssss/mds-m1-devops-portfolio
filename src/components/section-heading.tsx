import { BlurFade } from "@/components/ui/blur-fade";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      {eyebrow ? (
        <BlurFade inView>
          <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
            {eyebrow}
          </span>
        </BlurFade>
      ) : null}
      <BlurFade inView delay={0.05}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </BlurFade>
      {description ? (
        <BlurFade inView delay={0.1}>
          <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>
        </BlurFade>
      ) : null}
    </div>
  );
}
