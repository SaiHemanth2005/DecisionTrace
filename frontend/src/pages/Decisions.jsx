import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

function Decisions({ decisions, projects }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">WORKSPACE</div>
          <h1>Decisions</h1>
          <p>Explore and trace decisions made across your projects.</p>
        </div>

        <Link to="/decisions/new" className="primary-button">
          + New Decision
        </Link>
      </div>

      <div className="content-card">
        <div className="decision-table">
          <div className="decision-table-header">
            <span>DECISION</span>
            <span>PROJECT</span>
            <span>OWNER</span>
            <span>STATUS</span>
          </div>

          {decisions.map((decision) => {
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
                  <span>Decision #{decision.id}</span>
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

                <ArrowRight size={16} className="row-arrow" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Decisions;