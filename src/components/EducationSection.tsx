import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

function toIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export default function EducationSection() {
  const { education } = usePortfolio();

  if (education.length === 0) return null;

  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="chrome-gradient mb-10 text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
      >
        Education
      </motion.h2>

      <div>
        {education.map((entry, index) => (
          <motion.div
            key={`${entry.institution}-${entry.period}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
            className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[120px_1fr]"
          >
            <span className="text-5xl font-bold text-neutral-700 sm:text-6xl">
              {toIndex(index + 1)}
            </span>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold uppercase text-white sm:text-2xl">
                  {entry.institution} — {entry.degree}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
                  {entry.period}
                </span>
              </div>

              <p className="mb-2 text-xs font-medium tracking-wide text-neutral-500">
                {entry.location}
              </p>

              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                {entry.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
