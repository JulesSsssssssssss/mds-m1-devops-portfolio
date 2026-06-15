"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Changer de thème"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Les deux icônes sont rendues ; le CSS (variante `dark:`) choisit
          laquelle afficher → pas de mismatch d'hydratation. */}
      <Sun className="hidden size-5 dark:block" />
      <Moon className="block size-5 dark:hidden" />
    </Button>
  );
}
