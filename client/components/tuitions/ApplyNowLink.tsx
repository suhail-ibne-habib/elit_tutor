"use client";

import { site } from "@/lib/site";

type ApplyNowLinkProps = {
  className?: string;
};

export function ApplyNowLink({ className = "btn btn-primary" }: ApplyNowLinkProps) {
  return (
    <a className={className} href={site.whatsappGroup} target="_blank" rel="noreferrer">
      Apply on WhatsApp group
    </a>
  );
}
