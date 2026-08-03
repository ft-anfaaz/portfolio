import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const { projects } = usePortfolio();

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.highlight === b.highlight) return 0;
    return a.highlight ? -1 : 1;
  });

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="chrome-gradient mb-10 text-[3.375rem] font-bold uppercase tracking-tight sm:text-[4.05rem] md:text-[5.4rem]"
      >
        Projects
      </motion.h2>

      <div>
        {sortedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={sortedProjects.length}
          />
        ))}
      </div>
    </section>
  );
}
