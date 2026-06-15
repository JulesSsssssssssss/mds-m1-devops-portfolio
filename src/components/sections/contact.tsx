import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MailButton } from "@/components/mail-button";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <Section id="contact">
      <BlurFade inView>
        <div className="border-border bg-card relative overflow-hidden rounded-3xl border px-6 py-16 text-center sm:px-12">
          <BorderBeam size={120} duration={10} className="opacity-70" />

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Travaillons ensemble
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Une question, un projet ou une opportunité ? N&apos;hésitez pas à me
            contacter, je réponds rapidement.
          </p>

          <div className="mt-8 flex justify-center">
            <MailButton email={siteConfig.email} />
          </div>

          <div className="text-muted-foreground mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-foreground inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
            {siteConfig.phone ? (
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="hover:text-foreground inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="size-4" />
                {siteConfig.phone}
              </a>
            ) : null}
          </div>

          <SocialLinks className="mt-6 justify-center" />
        </div>
      </BlurFade>
    </Section>
  );
}
