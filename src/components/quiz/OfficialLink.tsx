"use client";

interface OfficialLinkProps {
  href: string;
  label: string;
}

export default function OfficialLink({ href, label }: OfficialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="official-link"
    >
      {label}
    </a>
  );
}
