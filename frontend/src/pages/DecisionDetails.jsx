import { useState } from "react";
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
  Clock3,
  MessageCircle,
  Brain,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";

function DecisionDetails({ decisions }) {
  const { id } = useParams();

  const decision = decisions.find(
    (item) => item.id === id
  );

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askLoading, setAskLoading] = useState(false);
  const [askError, setAskError] = useState("");

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

  /*
    ========================================
    ASK DECISIONTRACE
    ========================================
  */

  async function handleAsk(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    setAskLoading(true);
    setAskError("");
    setAnswer("");

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:8000";

      const response = await fetch(`${apiUrl}/ask/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      setAnswer(
        data.answer ||
          "DecisionTrace returned an empty answer."
      );
    } catch (error) {
      console.error(
        "Ask DecisionTrace error:",
        error
      );

      setAskError(
        "Unable to connect to DecisionTrace right now. Make sure the backend is running."
      );
    } finally {
      setAskLoading(false);
    }
  }

  function askPreset(text) {
    setQuestion(text);
  }

  /*
    ========================================
    TIMELINE / EVIDENCE DATA
    ========================================
  */

  const timelineItems = [
    {
      icon: <CheckCircle2 size={16} />,
      title: "Decision created",
      description:
        decision.description || decision.title,
      date: decision.date,
      type: "decision",
    },

    {
      icon: <ShieldCheck size={16} />,
      title: "Reason recorded",
      description:
        decision.reason ||
        "No reasoning has been recorded.",
      date: decision.date,
      type: "reason",
    },

    ...(decision.assumptions?.length > 0
      ? [
          {
            icon: <AlertTriangle size={16} />,
            title: "Assumptions recorded",
            description:
              decision.assumptions.join(" • "),
            date: decision.date,
            type: "assumption",
          },
        ]
      : []),

    ...(decision.alternatives?.length > 0
      ? [
          {
            icon: <FolderKanban size={16} />,
            title: "Alternatives considered",
            description:
              decision.alternatives
                .map(
                  (alternative) =>
                    alternative.name
                )
                .join(" • "),
            date: decision.date,
            type: "alternative",
          },
        ]
      : []),

    ...(decision.evidence?.length > 0
      ? [
          {
            icon: <FileText size={16} />,
            title: "Supporting evidence added",
            description:
              decision.evidence.join(" • "),
            date: decision.date,
            type: "evidence",
          },
        ]
      : []),

    ...(isReview
      ? [
          {
            icon: <AlertTriangle size={16} />,
            title:
              "Potential decision decay detected",
            description:
              decision.decayMessage ||
              "An assumption behind this decision may have changed.",
            date: "Review required",
            type: "decay",
          },
        ]
      : []),
  ];

  return (
    <div className="page decision-details-page">

      {/* ========================================
          BACK
      ======================================== */}

      <Link
        to="/decisions"
        className="back-link"
      >
        <ArrowLeft size={15} />
        Back to Decisions
      </Link>


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="decision-detail-header">

        <div className="decision-detail-heading">

          <div className="eyebrow">
            DECISION #{decision.id}
          </div>

          <h1>{decision.title}</h1>

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


      {/* ========================================
          ASK DECISIONTRACE
      ======================================== */}

      <section className="ask-decisiontrace-card">

        <div className="ask-card-header">

          <div className="ask-card-icon">
            <MessageCircle size={20} />
          </div>

          <div>
            <div className="eyebrow">
              AI DECISION MEMORY
            </div>

            <h2>Ask DecisionTrace</h2>

            <p>
              Ask questions about this decision,
              its reasoning, assumptions, or evidence.
            </p>
          </div>

        </div>


        <div className="ask-suggestions">

          <button
            type="button"
            onClick={() =>
              askPreset(
                `Why did we choose ${decision.title}?`
              )
            }
          >
            Why did we choose this?
          </button>

          <button
            type="button"
            onClick={() =>
              askPreset(
                "What assumptions were made?"
              )
            }
          >
            What assumptions were made?
          </button>

          <button
            type="button"
            onClick={() =>
              askPreset(
                "What evidence supported this decision?"
              )
            }
          >
            Show supporting evidence
          </button>

        </div>


        <form
          className="ask-form"
          onSubmit={handleAsk}
        >

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="Ask DecisionTrace a question..."
            rows={3}
          />

          <div className="ask-form-footer">

            <span>
              DecisionTrace will search the
              organization's decision memory.
            </span>

            <button
              type="submit"
              className="ask-button"
              disabled={
                askLoading ||
                !question.trim()
              }
            >
              {askLoading ? (
                <>
                  <Loader2
                    size={16}
                    className="spin"
                  />
                  Thinking...
                </>
              ) : (
                <>
                  Ask
                  <Send size={15} />
                </>
              )}
            </button>

          </div>

        </form>


        {askError && (
          <div className="ask-error">
            <AlertTriangle size={17} />
            <span>{askError}</span>
          </div>
        )}


        {answer && (
          <div className="ask-answer">

            <div className="answer-header">

              <div className="answer-icon">
                <Brain size={17} />
              </div>

              <div>
                <strong>
                  DecisionTrace
                </strong>

                <span>
                  AI-generated decision context
                </span>
              </div>

            </div>

            <p>{answer}</p>

          </div>
        )}

      </section>


      {/* ========================================
          DECISION
      ======================================== */}

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
          {decision.description ||
            decision.title}
        </div>

      </section>


      {/* ========================================
          WHY
      ======================================== */}

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


      {/* ========================================
          ASSUMPTIONS
      ======================================== */}

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


      {/* ========================================
          ALTERNATIVES
      ======================================== */}

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


      {/* ========================================
          TIMELINE / EVIDENCE
      ======================================== */}

      <section className="detail-section timeline-section">

        <div className="detail-section-header">

          <div className="section-icon blue">
            <Clock3 size={17} />
          </div>

          <div>
            <h2>Timeline / Evidence</h2>

            <p>
              How this decision was formed
              and what happened afterward.
            </p>
          </div>

        </div>


        <div className="decision-timeline">

          {timelineItems.map(
            (item, index) => (
              <div
                className={`timeline-item timeline-${item.type}`}
                key={`${item.title}-${index}`}
              >

                <div className="timeline-marker">
                  {item.icon}
                </div>

                <div className="timeline-content">

                  <div className="timeline-top">

                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.date}
                    </span>

                  </div>

                  <p>
                    {item.description}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </section>


      {/* ========================================
          SUPPORTING EVIDENCE
      ======================================== */}

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

                  <div className="evidence-icon">
                    <FileText size={15} />
                  </div>

                  <div className="evidence-content">

                    <strong>
                      {evidence}
                    </strong>

                    <span>
                      Supporting information used
                      during the decision.
                    </span>

                  </div>

                  <ExternalLink
                    size={14}
                    className="evidence-link-icon"
                  />

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


      {/* ========================================
          STAKEHOLDERS
      ======================================== */}

      {decision.stakeholders?.length > 0 && (
        <section className="detail-section">

          <div className="detail-section-header">

            <div className="section-icon blue">
              <Users size={17} />
            </div>

            <div>
              <h2>Stakeholders</h2>

              <p>
                People and teams involved
                in the decision.
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


      {/* ========================================
          DECISION DECAY
      ======================================== */}

      {isReview && (
        <section className="decision-decay-alert">

          <div className="decay-alert-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="decay-alert-content">

            <div className="eyebrow">
              POTENTIAL DECISION DECAY
            </div>

            <h2>
              This decision may need review
            </h2>

            <p>
              {decision.decayMessage ||
                "An assumption behind this decision may no longer be valid."}
            </p>

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
                  transform:
                    "rotate(180deg)",
                }}
              />
            </button>

          </div>

        </section>
      )}


      {/* ========================================
          DECISION HEALTH
      ======================================== */}

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
              ? "Potential change detected"
              : "This decision is currently healthy"}
          </h2>

          <p>
            {isReview
              ? decision.decayMessage
              : "No changes to the assumptions behind this decision have been detected."}
          </p>

        </div>

      </section>

    </div>
  );
}

export default DecisionDetails;