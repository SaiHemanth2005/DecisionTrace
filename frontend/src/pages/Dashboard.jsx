import { Link } from "react-router-dom";
import {
  FileText,
  AlertTriangle,
  FolderKanban,
  ArrowRight,
  Plus,
  CheckCircle2,
} from "lucide-react";

function Dashboard({ decisions, projects }) {
  const reviewDecisions = decisions.filter(
    (decision) => decision.decayDetected
  );

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  );

  const recentDecisions = decisions.slice(0, 5);

  return (
    <div className="page">
      <div className="page-header dashboard-header">
        <div>
          <div className="eyebrow">OVERVIEW</div>

          <h1>Good morning, Hemanth</h1>

          <p>
            Here's what needs your attention across your team's decisions.
          </p>
        </div>

        <Link to="/decisions/new" className="primary-button">
          <Plus size={17} />
          New Decision
        </Link>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileText size={19} />
          </div>

          <div className="stat-content">
            <span>Total Decisions</span>
            <strong>{decisions.length}</strong>
            <small>Across all projects</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber">
            <AlertTriangle size={19} />
          </div>

          <div className="stat-content">
            <span>Review Alerts</span>
            <strong>{reviewDecisions.length}</strong>
            <small>Decisions needing attention</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FolderKanban size={19} />
          </div>

          <div className="stat-content">
            <span>Active Projects</span>
            <strong>{activeProjects.length}</strong>
            <small>Currently being tracked</small>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-panel review-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title-row">
                <AlertTriangle size={18} />
                <h2>Decision health</h2>
              </div>

              <p>Decisions whose original assumptions may have changed.</p>
            </div>

            <Link to="/review-alerts" className="text-link">
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          {reviewDecisions.length === 0 ? (
            <div className="empty-state">
              <CheckCircle2 size={28} />
              <strong>All decisions look healthy</strong>
              <span>No review alerts currently require attention.</span>
            </div>
          ) : (
            reviewDecisions.slice(0, 2).map((decision) => (
              <div className="review-item" key={decision.id}>
                <div className="review-item-icon">
                  <AlertTriangle size={17} />
                </div>

                <div className="review-item-content">
                  <span>Decision #{decision.id}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.decayMessage}</p>

                  <Link to={`/decisions/${decision.id}`}>
                    Review decision
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Active projects</h2>
              <p>Your team's current projects.</p>
            </div>

            <Link to="/projects" className="text-link">
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="project-mini-list">
            {activeProjects.slice(0, 4).map((project) => (
              <Link
                to={`/projects/${project.id}`}
                className="project-mini"
                key={project.id}
              >
                <div className="project-mini-icon">
                  <FolderKanban size={17} />
                </div>

                <div>
                  <strong>{project.name}</strong>
                  <span>{project.id}</span>
                </div>

                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-panel recent-panel">
        <div className="panel-header">
          <div>
            <h2>Recent decisions</h2>
            <p>Latest decisions captured by your team.</p>
          </div>

          <Link to="/decisions" className="text-link">
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="decision-table">
          <div className="decision-table-header">
            <span>DECISION</span>
            <span>PROJECT</span>
            <span>OWNER</span>
            <span>STATUS</span>
          </div>

          {recentDecisions.map((decision) => {
            const project = projects.find(
              (item) => item.id === decision.projectId
            );

            return (
              <Link
                to={`/decisions/${decision.id}`}
                className="decision-table-row"
                key={decision.id}
              >
                <div>
                  <strong>{decision.title}</strong>
                  <span>#{decision.id}</span>
                </div>

                <span>{project?.name || "Unassigned"}</span>

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
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard; 