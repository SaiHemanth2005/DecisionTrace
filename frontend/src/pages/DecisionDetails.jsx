import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  User,
  FolderKanban,
  ShieldCheck,
  FileText,
  Users,
} from "lucide-react";

function DecisionDetails({ decisions }) {
  const { id } = useParams();

  const decision = decisions.find(
    (item) => item.id === id
  );

  if (!decision) {
    return (
      <div className="page">
        <Link to="/decisions" className="back-link">
          <ArrowLeft size={15} />
          Back to Decisions
        </Link>

        <div className="empty-large">
          <FileText size={32} />
          <h2>Decision not found</h2>
          <p>
            The decision you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const isReview = decision.decayDetected;

  return (
    <div className="page decision-details-page">

      {/* =========================
          BACK
      ========================= */}

      <Link
        to="/decisions"
        className="back-link"
      >
        <ArrowLeft size={15} />
        Back to Decisions
      </Link>


      {/* =========================
          HEADER
      ========================= */}

      <div className="decision-detail-header">

        <div className="decision-detail-heading">

          <div className="eyebrow">
            DECISION #{decision.id}
          </div>

          <h1>
            {decision.title}
          </h1>

          <div className="decision-meta">

            <span>
              <CalendarDays size={14} />
              {decision.date}
            </span>

            <span>
              <User size={14} />
              {decision.owner}
            </span>

            {decision.projectId && (
              <span>
                <FolderKanban size={14} />
                {decision.projectId}
              </span>
            )}

          </div>

        </div>


        {/* STATUS */}

        <div
          className={`decision-health ${
            isReview
              ? "health-review"
              : "health-active"
          }`}
        >
          {isReview ? (
            <>
              <AlertTriangle size={16} />
              Review required
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              Active
            </>
          )}
        </div>

      </div>


      {/* =========================
          DECISION SUMMARY
      ========================= */}

      <section className="detail-section">

        <div className="detail-section-header">
          <div className="section-icon blue">
            <FileText size={17} />
          </div>

          <div>
            <h2>Decision</h2>
            <p>
              What the team decided.
            </p>
          </div>
        </div>

        <div className="decision-summary">
          {decision.description || decision.title}
        </div>

      </section>


      {/* =========================
          WHY
      ========================= */}

      <section className="detail-section">

        <div className="detail-section-header">
          <div className="section-icon purple">
            <ShieldCheck size={17} />
          </div>

          <div>
            <h2>Why we chose this</h2>
            <p>
              The reasoning behind the decision.
            </p>
          </div>
        </div>

        <p className="detail-text">
          {decision.reason ||
            "No reasoning has been recorded for this decision."}
        </p>

      </section>


      {/* =========================
          ASSUMPTIONS
      ========================= */}

      <section className="detail-section">

        <div className="detail-section-header">
          <div className="section-icon amber">
            <AlertTriangle size={17} />
          </div>

          <div>
            <h2>Assumptions</h2>
            <p>
              Conditions the decision was based on.
            </p>
          </div>
        </div>

        {decision.assumptions?.length > 0 ? (
          <div className="detail-list">

            {decision.assumptions.map(
              (assumption, index) => (
                <div
                  className="detail-list-item"
                  key={index}
                >
                  <CheckCircle2 size={15} />
                  <span>{assumption}</span>
                </div>
              )
            )}

          </div>
        ) : (
          <p className="detail-empty">
            No assumptions recorded.
          </p>
        )}

      </section>


      {/* =========================
          ALTERNATIVES
      ========================= */}

      <section className="detail-section">

        <div className="detail-section-header">
          <div className="section-icon slate">
            <FolderKanban size={17} />
          </div>

          <div>
            <h2>Alternatives considered</h2>
            <p>
              Other options evaluated by the team.
            </p>
          </div>
        </div>

        {decision.alternatives?.length > 0 ? (
          <div className="alternative-list">

            {decision.alternatives.map(
              (alternative, index) => (
                <div
                  className="alternative-item"
                  key={index}
                >
                  <div className="alternative-number">
                    {index + 1}
                  </div>

                  <div>
                    <strong>
                      {alternative.name}
                    </strong>

                    <p>
                      {alternative.reason ||
                        "No reason recorded."}
                    </p>
                  </div>
                </div>
              )
            )}

          </div>
        ) : (
          <p className="detail-empty">
            No alternatives recorded.
          </p>
        )}

      </section>


      {/* =========================
          EVIDENCE
      ========================= */}

      <section className="detail-section">

        <div className="detail-section-header">
          <div className="section-icon green">
            <FileText size={17} />
          </div>

          <div>
            <h2>Supporting evidence</h2>
            <p>
              Information used to support this decision.
            </p>
          </div>
        </div>

        {decision.evidence?.length > 0 ? (
          <div className="evidence-list">

            {decision.evidence.map(
              (evidence, index) => (
                <div
                  className="evidence-item"
                  key={index}
                >
                  <FileText size={15} />
                  <span>{evidence}</span>
                </div>
              )
            )}

          </div>
        ) : (
          <p className="detail-empty">
            No supporting evidence recorded.
          </p>
        )}

      </section>


      {/* =========================
          STAKEHOLDERS
      ========================= */}

      {decision.stakeholders?.length > 0 && (
        <section className="detail-section">

          <div className="detail-section-header">
            <div className="section-icon blue">
              <Users size={17} />
            </div>

            <div>
              <h2>Stakeholders</h2>
              <p>
                People and teams involved in the decision.
              </p>
            </div>
          </div>

          <div className="stakeholder-list">

            {decision.stakeholders.map(
              (stakeholder, index) => (
                <span
                  className="stakeholder-chip"
                  key={index}
                >
                  <User size={13} />
                  {stakeholder}
                </span>
              )
            )}

          </div>

        </section>
      )}


      {/* =========================
          DECISION HEALTH
      ========================= */}

      <section
        className={`decision-health-card ${
          isReview
            ? "health-card-review"
            : "health-card-active"
        }`}
      >

        <div className="health-card-icon">

          {isReview ? (
            <AlertTriangle size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}

        </div>

        <div className="health-card-content">

          <div className="health-card-label">
            DECISION HEALTH
          </div>

          <h2>
            {isReview
              ? "This decision may need review"
              : "This decision is currently healthy"}
          </h2>

          <p>
            {isReview
              ? decision.decayMessage
              : "No changes to the assumptions behind this decision have been detected."}
          </p>

          {isReview && (
            <button
              className="review-action-button"
              onClick={() =>
                alert(
                  "Decision review started. Backend integration will handle this action later."
                )
              }
            >
              Review decision
              <ArrowLeft
                size={15}
                style={{
                  transform: "rotate(180deg)",
                }}
              />
            </button>
          )}

        </div>

      </section>

    </div>
  );
}

export default DecisionDetails;