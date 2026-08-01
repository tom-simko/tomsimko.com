import { ArrowUpRight } from "lucide-react";
import type { Project } from "../content/site-content";
import { Reveal } from "./reveal";

function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className={`project-card ${project.motif}`}>
      <div>
        <p className="project-category mono-label">{project.category}</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      <div className="project-bottom">
        <p className="project-detail">{project.detail}</p>
        {project.link && project.linkLabel ? (
          <span className="project-link">
            {project.linkLabel} <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <span className="project-motif" aria-hidden="true" />
    </article>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}>
      {card}
    </a>
  ) : (
    card
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="work-grid">
      {projects.map((project) => (
        <Reveal className={`project-grid-item ${project.motif}`} key={project.title}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
