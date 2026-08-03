import { Quote } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import type { Testimonial } from "../types/portfolio";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initial = testimonial.name.trim().charAt(0).toUpperCase();

  return (
    <div className="mx-3 flex w-[360px] shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:w-[420px]">
      <Quote
        className="mb-5 h-7 w-7 text-neutral-600"
        strokeWidth={1.5}
        aria-hidden
      />
      <p className="mb-8 flex-1 text-sm italic leading-relaxed text-neutral-300 sm:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-black"
          style={{ backgroundColor: testimonial.avatarColor }}
        >
          {initial}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white">
            {testimonial.name}
          </p>
          <p className="text-xs text-neutral-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  if (testimonials.length === 0) return null;

  const looped = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#0c0c0c] py-28">
      <div className="mx-auto mb-14 max-w-5xl px-6 md:px-10">
        <p className="mb-3 text-xs font-medium tracking-[0.35em] text-neutral-500">
          TESTIMONIALS
        </p>
        <h2 className="chrome-gradient max-w-2xl text-3xl font-semibold sm:text-4xl">
          What people say
        </h2>
      </div>

      <div className="overflow-x-hidden">
        <div className="marquee-track">
          {looped.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
