import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navItems } from "@/config/content";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-semibold tracking-tight">{siteConfig.fullName}</p>
          <p className="text-muted-foreground text-sm">
            © {year} — Tous droits réservés
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <SocialLinks />
      </div>
    </footer>
  );
}
