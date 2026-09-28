import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";

function ReviewAlerts({ decisions }) {
  const reviewDecisions = decisions.filter(
    (decision) => decision.decayDetected
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">DECISION HEALTH</div>
          <h1>Review Alerts</h1>
          <p>
            Decisions whose assumptions may no longer match current conditions.
          </p>
        </div>
      </div>

      {reviewDecisions.length === 0 ? (
        <div className="content-card empty-large">
          <AlertTriangle size={30} />
          <h2>No review alerts</h2>
          <p>All tracked decisions are currently healthy.</p>
        </div>
      ) : (
        <div className="alert-list">
          {reviewDecisions.map((decision) => (
            <div className="large-alert-card" key={decision.id}>
              <div className="large-alert-icon">
                <AlertTriangle size={21} />
              </div>

              <div className="large-alert-content">
                <span>Decision #{decision.id}</span>

                <h2>{decision.title}</h2>

                <div className="alert-reason">
                  <strong>Why this was flagged</strong>
                  <p>{decision.decayMessage}</p>
                </div>

                <Link
                  to={`/decisions/${decision.id}`}
                  className="primary-button small"
                >
                  Review Decision
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewAlerts;