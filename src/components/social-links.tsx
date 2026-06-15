import { Mail, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SocialLink = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

/** Construit la liste des liens sociaux non vides depuis la config. */
function getLinks(): SocialLink[] {
  const { socials, email } = siteConfig;
  const links: SocialLink[] = [];
  if (socials.github)
    links.push({ label: "GitHub", href: socials.github, Icon: GitHubIcon });
  if (socials.linkedin)
    links.push({ label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon });
  if (socials.twitter)
    links.push({ label: "X (Twitter)", href: socials.twitter, Icon: XIcon });
  if (socials.website)
    links.push({ label: "Site web", href: socials.website, Icon: Globe });
  if (email)
    links.push({ label: "Email", href: `mailto:${email}`, Icon: Mail });
  return links;
}

export function SocialLinks({ className }: { className?: string }) {
  const links = getLinks();
  if (links.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-lg transition-colors"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
