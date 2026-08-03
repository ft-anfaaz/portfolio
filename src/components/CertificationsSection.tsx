import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Certification } from "../types/portfolio";

function CertificationCard({ certification }: { certification: Certification }) {
  const hasLink = certification.link.trim().length > 0;

  const content = (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <img
          src={certification.image}
          alt={certification.title}
          className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white sm:text-base">
            {certification.title}
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            {certification.issuer} · {certification.date}
          </p>
        </div>

        {hasLink && (
          <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-neutral-500 transition-colors duration-200 group-hover:text-white" />
        )}
      </div>
    </>
  );

  return (
    <div className="mx-3 w-[320px] shrink-0 sm:w-[380px]">
      {hasLink ? (
        <a
          href={certification.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {content}
        </a>
      ) : (
        <div className="group">{content}</div>
      )}
    </div>
  );
}

export default function CertificationsSection() {
  const { certifications } = usePortfolio();

  if (certifications.length === 0) return null;

  const looped = [...certifications, ...certifications];

  return (
    <section id="certifications" className="overflow-hidden py-28">
      <div className="mx-auto mb-10 max-w-5xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="chrome-gradient text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
        >
          Certifications
        </motion.h2>
      </div>

      <div className="overflow-x-hidden">
        <div className="marquee-track">
          {looped.map((certification, index) => (
            <CertificationCard key={`${certification.id}-${index}`} certification={certification} />
          ))}
        </div>
      </div>
    </section>
  );
}
