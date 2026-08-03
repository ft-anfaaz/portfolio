import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import SocialLinks from "./SocialLinks";

const SOCIAL_PILL_CLASSNAME =
  "flex h-12 w-12 items-center justify-center transition-opacity duration-200 hover:opacity-80 sm:h-[4.68rem] sm:w-[4.68rem]";
const SOCIAL_ICON_CLASSNAME = "h-6 w-6 sm:h-[2.34rem] sm:w-[2.34rem]";
const SOCIAL_ICON_STYLE = {
  filter:
    "drop-shadow(0 0 6px rgba(168,85,247,0.7)) drop-shadow(0 0 16px rgba(236,72,153,0.5))",
};

function NeonGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="hero-neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const AVATAR_MAX_OFFSET = 28;

export default function HeroSection() {
  const { profile } = usePortfolio();
  const hasAvatarImage = profile.avatarImage.trim().length > 0;

  const avatarX = useMotionValue(0);
  const avatarY = useMotionValue(0);
  const springX = useSpring(avatarX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(avatarY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    avatarX.set(relX * AVATAR_MAX_OFFSET * 2);
    avatarY.set(relY * AVATAR_MAX_OFFSET * 2);
  };

  const handleMouseLeave = () => {
    avatarX.set(0);
    avatarY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-16 pb-4 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.12),_transparent_55%)]"
      />
      <NeonGradientDefs />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hero-heading w-full text-left font-semibold uppercase leading-[1.05] tracking-tight"
      >
        Hi, I&apos;m {profile.shortName}
      </motion.h1>

      <div className="flex flex-1 items-center justify-center py-2">
        {hasAvatarImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ x: springX, y: springY }}
            src={profile.avatarImage}
            alt={profile.name}
            className="hero-avatar-photo"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ x: springX, y: springY }}
            className="hero-avatar-photo"
            dangerouslySetInnerHTML={{ __html: profile.avatarSvg }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <p className="max-w-[396px] text-left text-[1.1475rem] uppercase leading-relaxed tracking-wide text-neutral-300">
          {profile.tagline}
        </p>

        <SocialLinks
          social={profile.social}
          className="justify-start sm:justify-end"
          linkClassName={SOCIAL_PILL_CLASSNAME}
          iconClassName={SOCIAL_ICON_CLASSNAME}
          iconStroke="url(#hero-neon-gradient)"
          iconStyle={SOCIAL_ICON_STYLE}
        />
      </motion.div>
    </section>
  );
}
