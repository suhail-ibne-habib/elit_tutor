"use client";

type ApplyNowLinkProps = {
  className?: string;
};

const whatsappGroupUrl =
  process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/JdeX3siGPIKEz54H93SEBW";

export function ApplyNowLink({ className = "btn btn-primary" }: ApplyNowLinkProps) {
  return (
    <a className={className} href={whatsappGroupUrl} target="_blank" rel="noreferrer">
      Apply Now
    </a>
  );
}
