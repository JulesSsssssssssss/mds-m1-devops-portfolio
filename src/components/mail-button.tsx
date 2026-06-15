"use client";

import { Mail } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function MailButton({
  email,
  label = "Envoyer un email",
}: {
  email: string;
  label?: string;
}) {
  return (
    <ShimmerButton
      onClick={() => {
        window.location.href = `mailto:${email}`;
      }}
      className="gap-2 text-base shadow-2xl"
    >
      <Mail className="size-4" />
      {label}
    </ShimmerButton>
  );
}
