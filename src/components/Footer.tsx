import { useState } from "react";
import { Check, Copy, Phone } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SocialLinks from "./SocialLinks";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    if (!profile.social.email) return;
    try {
      await navigator.clipboard.writeText(profile.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore silently
    }
  };

  return (
    <footer id="contact" className="border-t border-white/10 bg-[#0c0c0c] px-6 pt-20 md:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 pb-16 sm:grid-cols-3">
        <div>
          <p className="chrome-gradient mb-3 text-2xl font-semibold uppercase">{profile.name}</p>
          <p className="mb-1 text-sm text-neutral-400">{profile.specialization}</p>
          <p className="text-sm text-neutral-500">{profile.location}</p>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-neutral-500">NAVIGATE</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-neutral-500">REACH OUT</p>

          {profile.social.email && (
            <button
              type="button"
              onClick={handleCopyEmail}
              className="mb-3 flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
            >
              {profile.social.email}
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {profile.social.phone && (
            <p className="mb-5 flex items-center gap-2 text-sm text-neutral-400">
              <Phone className="h-3.5 w-3.5" />
              {profile.social.phone}
            </p>
          )}

          <SocialLinks social={profile.social} />
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-neutral-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
