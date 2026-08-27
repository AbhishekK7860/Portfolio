import { projects } from "@/data/projects";
import { Reveal } from "@/app/components/motion/Reveal";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { ProjectCard } from "@/app/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
      <Reveal>
        <SectionHeading num="02" label="SELECTED WORK" title="Projects" />
      </Reveal>
      <Reveal>
        <p className="mb-12 max-w-2xl text-muted">
          Engineering case studies — multi-agent AI, real-time LLM tooling, and
          interactive apps. Most were built under hackathon pressure; every one is
          open-source or live.
        </p>
      </Reveal>
      <div className="space-y-8">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.05, 0.15)}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
