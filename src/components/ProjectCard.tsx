import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

function toIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export default function ProjectCard({ project, index, total }: ProjectCardProps) {
  const hasLink = project.link.trim().length > 0;
  const hasImage = project.image.trim().length > 0;
  const hasYear = project.year.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      style={{
        top: `${96 + index * 16}px`,
        zIndex: index + 1,
      }}
      className="sticky mb-6 overflow-hidden rounded-3xl border border-white/10 bg-[#131313]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          {hasImage ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]">
              <span className="chrome-gradient px-6 text-center text-2xl font-semibold sm:text-3xl">
                {project.title}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-sm text-neutral-600">
                {toIndex(index + 1)} / {toIndex(total)}
              </span>
              {hasYear && (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
                  {project.year}
                </span>
              )}
            </div>

            <h3 className="mb-1 text-2xl font-semibold text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mb-4 text-sm font-medium text-neutral-500">{project.subtitle}</p>

            <p className="mb-6 text-sm leading-relaxed text-neutral-400 sm:text-base">
              {project.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs tracking-wide text-neutral-500">{project.role}</p>
          </div>

          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide text-black accent-gradient transition-transform duration-200 hover:scale-105"
            >
              LIVE PROJECT
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
