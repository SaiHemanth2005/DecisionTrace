import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function ProjectDetails({ projects, decisions }) {
  const { id } = useParams();

  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="page">
        <Link to="/projects" className="back-link">
          <ArrowLeft size={15} />
          Back to Projects
        </Link>

        <div className="empty-large">
          <h2>Project not found</h2>
        </div>
      </div>
    );
  }

  const projectDecisions = decisions.filter(
    (decision) => decision.projectId === project.id
  );

  return (
    <div className="page">
      <Link to="/projects" className="back-link">
        <ArrowLeft size={15} />
        Back to Projects
      </Link>

      <div className="project-detail-header">
        <div className="project-icon large">
          <FileText size={23} />
        </div>

        <div>
          <div className="eyebrow">{project.id}</div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
      </div>

      <div className="detail-stats">
        <div>
          <span>Status</span>
          <strong>
            {project.status === "active" ? "Active" : "Completed"}
          </strong>
        </div>

        <div>
          <span>Owner</span>
          <strong>{project.owner}</strong>
        </div>

        <div>
          <span>Decisions</span>
          <strong>{projectDecisions.length}</strong>
        </div>
      </div>

      <div className="content-card">
        <div className="panel-header">
          <div>
            <h2>Project decisions</h2>
            <p>Decisions associated with this project.</p>
          </div>
        </div>

        <div className="decision-table">
          {projectDecisions.length === 0 ? (
            <div className="empty-state">
              <FileText size={25} />
              <strong>No decisions yet</strong>
            </div>
          ) : (
            projectDecisions.map((decision) => (
              <Link
                to={`/decisions/${decision.id}`}
                className="decision-table-row"
                key={decision.id}
              >
                <div>
                  <strong>{decision.title}</strong>
                  <span>#{decision.id}</span>
                </div>

                <span>{decision.owner}</span>

                <span
                  className={`status-badge ${
                    decision.status === "review"
                      ? "review-status"
                      : "active-status"
                  }`}
                >
                  {decision.status === "review" ? (
                    <>
                      <AlertTriangle size={13} />
                      Review
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={13} />
                      Active
                    </>
                  )}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;