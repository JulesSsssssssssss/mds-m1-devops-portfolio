import Link from "next/link";
import { Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 py-32 text-center">
      <p className="text-muted-foreground text-7xl font-bold tracking-tight">
        404
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">
        Cette page n&apos;existe pas
      </h1>
      <p className="text-muted-foreground max-w-md">
        Le lien est peut-être cassé, ou la page a été déplacée.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "default" }), "rounded-xl")}
      >
        <Home className="size-4" />
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
