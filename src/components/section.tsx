import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}
