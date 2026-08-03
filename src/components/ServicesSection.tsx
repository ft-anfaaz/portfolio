import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

function toIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export default function ServicesSection() {
  const { services } = usePortfolio();

  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="chrome-gradient mb-10 text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
      >
        Services
      </motion.h2>

      <div>
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
            className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[120px_1fr]"
          >
            <span className="text-5xl font-bold text-neutral-700 sm:text-6xl">
              {toIndex(index + 1)}
            </span>
            <div>
              <h3 className="mb-2 text-xl font-bold uppercase text-white sm:text-2xl">
                {service.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
