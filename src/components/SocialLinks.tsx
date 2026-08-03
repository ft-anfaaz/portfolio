import { Github, Instagram, Linkedin, Mail, Globe } from "lucide-react";
import type { CSSProperties } from "react";
import type { SocialLinksData } from "../types/portfolio";

interface SocialLinksProps {
  social: SocialLinksData;
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
  iconStroke?: string;
  iconStyle?: CSSProperties;
}

const DEFAULT_LINK_CLASSNAME =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 transition-colors duration-200 hover:border-white/20 hover:text-white";

type SocialEntry = {
  key: keyof SocialLinksData;
  href: string;
  label: string;
  icon: typeof Github;
};

function buildHref(key: keyof SocialLinksData, value: string): string {
  if (key === "email") return `mailto:${value}`;
  return value;
}

export default function SocialLinks({
  social,
  className = "",
  iconClassName = "h-4 w-4",
  linkClassName = DEFAULT_LINK_CLASSNAME,
  iconStroke,
  iconStyle,
}: SocialLinksProps) {
  const entries: SocialEntry[] = (
    [
      { key: "github", label: "GitHub", icon: Github },
      { key: "instagram", label: "Instagram", icon: Instagram },
      { key: "linkedin", label: "LinkedIn", icon: Linkedin },
      { key: "email", label: "Email", icon: Mail },
      { key: "website", label: "Website", icon: Globe },
    ] as { key: keyof SocialLinksData; label: string; icon: typeof Github }[]
  )
    .filter((entry) => Boolean(social[entry.key]))
    .map((entry) => ({
      ...entry,
      href: buildHref(entry.key, social[entry.key]),
    }));

  if (entries.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {entries.map(({ key, href, label, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel={key === "email" ? undefined : "noopener noreferrer"}
          aria-label={label}
          className={linkClassName}
        >
          <Icon
            className={iconClassName}
            strokeWidth={1.75}
            {...(iconStroke ? { stroke: iconStroke } : {})}
            style={iconStyle}
          />
        </a>
      ))}
    </div>
  );
}
