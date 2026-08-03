import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

function toIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export default function ExperienceSection() {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="chrome-gradient mb-10 text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
      >
        Experience
      </motion.h2>

      <div>
        {experience.map((job, index) => {
          const hasLogo = job.logo.trim().length > 0;

          return (
          <motion.div
            key={`${job.company}-${job.period}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
            className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[120px_1fr]"
          >
            {hasLogo ? (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 sm:h-24 sm:w-24">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <span className="text-5xl font-bold text-neutral-700 sm:text-6xl">
                {toIndex(index + 1)}
              </span>
            )}

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold uppercase text-white sm:text-2xl">
                  {job.company} — {job.role}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
                  {job.period}
                </span>
              </div>

              <p className="mb-2 text-xs font-medium tracking-wide text-neutral-500">
                {job.location}
              </p>

              <p className="mb-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                {job.summary}
              </p>

              <ul className="space-y-2">
                {job.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-neutral-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
