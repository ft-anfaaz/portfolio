import { motion } from "framer-motion";
import { Cloud, Download, FolderOpen, MousePointer2, Wifi } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

function NeonGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="about-neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FloatingIcon({
  className,
  icon: Icon,
  delay = 0,
}: {
  className: string;
  icon: typeof Cloud;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute hidden md:block ${className}`}
    >
      <Icon
        className="h-10 w-10"
        strokeWidth={1.5}
        stroke="url(#about-neon-gradient)"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(168,85,247,0.7)) drop-shadow(0 0 16px rgba(236,72,153,0.5))",
        }}
      />
    </motion.div>
  );
}

export default function AboutSection() {
  const { profile, skills } = usePortfolio();
  const hasResume = profile.resumeUrl.trim().length > 0;

  return (
    <>
      <section
        id="about"
        className="relative mx-auto max-w-5xl overflow-hidden px-6 py-28 text-center md:px-10"
      >
        <NeonGradientDefs />
        <FloatingIcon icon={Cloud} className="left-6 top-6 -rotate-6" delay={0} />
        <FloatingIcon icon={MousePointer2} className="right-6 top-6 rotate-6" delay={0.1} />
        <FloatingIcon icon={Wifi} className="bottom-10 left-6 -rotate-3" delay={0.2} />
        <FloatingIcon icon={FolderOpen} className="bottom-10 right-6 rotate-3" delay={0.3} />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="chrome-gradient text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="no-mid-word-break mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {hasResume && (
            <a
              href={profile.resumeUrl}
              download
              className="neon-outline-pill inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
            >
              Download Resume
              <Download className="h-4 w-4" />
            </a>
          )}
        </motion.div>
      </section>

      <section id="skills" className="mx-auto max-w-5xl px-6 pb-28 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="chrome-gradient mb-10 text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
        >
          Skills
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h4 className="mb-4 text-[1.05rem] font-semibold tracking-wide text-white">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.9rem] text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
