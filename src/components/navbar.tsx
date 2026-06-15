"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/config/content";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background/70 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {siteConfig.firstName}
          <span className="text-muted-foreground">.</span>
          {siteConfig.lastName}
        </Link>

        {/* Navigation bureau */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="bg-border mx-1 h-5 w-px" />
          <ThemeToggle />
        </div>

        {/* Actions mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Menu mobile déroulant */}
      <div
        className={cn(
          "overflow-hidden border-t transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
