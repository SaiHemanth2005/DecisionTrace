import { Link } from "react-router-dom";
import {
  FolderKanban,
  ArrowRight,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function Projects({ projects, decisions }) {
  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">WORKSPACE</div>
          <h1>Projects</h1>
          <p>Projects and the decisions associated with them.</p>
        </div>

        <div className="project-count">
          {activeProjects.length} active projects
        </div>
      </div>

      <div className="projects-grid">
        {projects.map((project) => {
          const projectDecisions = decisions.filter(
            (decision) => decision.projectId === project.id
          );

          const isActive = project.status === "active";

          return (
            <Link
              to={`/projects/${project.id}`}
              className="project-card"
              key={project.id}
            >
              <div className="project-card-top">
                <div className="project-icon">
                  <FolderKanban size={20} />
                </div>

                <span
                  className={`project-status ${
                    isActive ? "project-active" : "project-completed"
                  }`}
                >
                  {isActive ? (
                    <>
                      <Clock3 size={13} />
                      Active
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={13} />
                      Completed
                    </>
                  )}
                </span>
              </div>

              <h2>{project.name}</h2>

              <p>{project.description}</p>

              <div className="project-card-footer">
                <span>
                  {projectDecisions.length}{" "}
                  {projectDecisions.length === 1 ? "decision" : "decisions"}
                </span>

                <ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;