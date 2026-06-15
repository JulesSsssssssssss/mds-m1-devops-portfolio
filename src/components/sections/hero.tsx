import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BlurFade } from "@/components/ui/blur-fade";
import { AuroraText } from "@/components/ui/aurora-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { SocialLinks } from "@/components/social-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ctaBase =
  "h-11 rounded-xl px-6 text-base [&_svg:not([class*='size-'])]:size-4";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <DotPattern
        glow
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]",
          "fill-neutral-400/60",
        )}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-24 text-center sm:px-6 md:py-36">
        {siteConfig.avatarUrl ? (
          <BlurFade>
            <div className="relative mb-8 size-28 overflow-hidden rounded-full border">
              <Image
                src={siteConfig.avatarUrl}
                alt={siteConfig.fullName}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
              <BorderBeam size={60} duration={8} />
            </div>
          </BlurFade>
        ) : null}

        <BlurFade delay={0.05}>
          <div className="border-border bg-background/50 mb-6 inline-flex items-center rounded-full border px-3 py-1 backdrop-blur">
            <AnimatedShinyText className="text-sm">
              ✨ {siteConfig.role}
            </AnimatedShinyText>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Bonjour, je suis{" "}
            <AuroraText>{siteConfig.firstName}</AuroraText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.2}>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg sm:text-xl">
            {siteConfig.tagline}
          </p>
        </BlurFade>

        {siteConfig.location ? (
          <BlurFade delay={0.25}>
            <p className="text-muted-foreground mt-4 inline-flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" />
              {siteConfig.location}
            </p>
          </BlurFade>
        ) : null}

        <BlurFade delay={0.3}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/#projets"
              className={cn(buttonVariants({ variant: "default" }), ctaBase)}
            >
              Voir mes projets
              <ArrowRight />
            </Link>
            <Link
              href="/#contact"
              className={cn(buttonVariants({ variant: "outline" }), ctaBase)}
            >
              Me contacter
            </Link>
            {siteConfig.resumeUrl ? (
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "ghost" }), ctaBase)}
              >
                <Download />
                Mon CV
              </a>
            ) : null}
          </div>
        </BlurFade>

        <BlurFade delay={0.35}>
          <SocialLinks className="mt-8" />
        </BlurFade>
      </div>
    </section>
  );
}
