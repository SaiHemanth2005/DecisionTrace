import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

function ReviewAlerts({ decisions }) {
  const reviewDecisions = decisions.filter(
    (decision) => decision.decayDetected
  );

  const [newInformation, setNewInformation] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReview() {
    if (!newInformation.trim()) return;

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/review/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_information: newInformation.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to review decisions");
      }

      const result = await response.json();

      setAnalysis(result.analysis);
    } catch (error) {
      console.error(error);

      setError(
        "Could not connect to the DecisionTrace backend."
      );
    } finally {
      setLoading(false);
    }
  }

  function useExample() {
    setNewInformation(
      "Analytics requirements have decreased significantly."
    );
    setError("");
  }

  return (
    <div className="page review-alerts-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header review-page-header">
        <div>
          <div className="eyebrow">DECISION HEALTH</div>

          <h1>Review Alerts</h1>

          <p>
            Decisions whose assumptions may no longer match
            current conditions.
          </p>
        </div>

        <div className="review-alert-summary">
          <ShieldAlert size={17} />

          <div>
            <strong>{reviewDecisions.length}</strong>
            <span>Need review</span>
          </div>
        </div>
      </div>


      {/* =========================
          DECAY CHECK
      ========================= */}

      <section className="decay-check-card">

        <div className="decay-check-header">

          <div className="decay-check-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <h2>Check for Decision Decay</h2>

            <p>
              Add new information and DecisionTrace will
              check whether it may affect previous decisions.
            </p>
          </div>

        </div>


        <div className="decay-input-area">

          <div className="decay-input-label">
            <span>New information</span>

            <button
              type="button"
              onClick={useExample}
            >
              Use example
            </button>
          </div>

          <textarea
            className="decay-input"
            value={newInformation}
            onChange={(event) =>
              setNewInformation(event.target.value)
            }
            placeholder="Example: Analytics requirements have decreased significantly."
            rows={5}
          />

          <div className="decay-input-footer">

            <span>
              DecisionTrace compares this information with
              existing decision assumptions.
            </span>

            <button
              type="button"
              className="decay-check-button"
              onClick={handleReview}
              disabled={
                loading || !newInformation.trim()
              }
            >
              {loading ? (
                <>
                  <span className="button-spinner" />
                  Checking...
                </>
              ) : (
                <>
                  Check Decisions
                  <ArrowRight size={15} />
                </>
              )}
            </button>

          </div>

        </div>


        {/* ERROR */}

        {error && (
          <div className="decay-error">
            <AlertTriangle size={16} />

            <span>{error}</span>
          </div>
        )}


        {/* ANALYSIS */}

        {analysis && (
          <div className="decay-analysis">

            <div className="decay-analysis-icon">
              <ShieldAlert size={17} />
            </div>

            <div>
              <strong>
                Decision Decay Analysis
              </strong>

              <p>{analysis}</p>
            </div>

          </div>
        )}

      </section>


      {/* =========================
          REVIEW ALERTS
      ========================= */}

      <div className="review-alerts-section-header">

        <div>
          <div className="eyebrow">ATTENTION REQUIRED</div>

          <h2>Decisions to review</h2>

          <p>
            These decisions have assumptions that may
            no longer match current conditions.
          </p>
        </div>

        <span className="review-count">
          {reviewDecisions.length}
        </span>

      </div>


      {reviewDecisions.length === 0 ? (

        <div className="review-empty-card">

          <div className="review-empty-icon">
            <ShieldAlert size={22} />
          </div>

          <h2>No review alerts</h2>

          <p>
            All tracked decisions are currently healthy.
          </p>

        </div>

      ) : (

        <div className="review-alert-list">

          {reviewDecisions.map((decision) => (

            <article
              className="review-alert-card"
              key={decision.id}
            >

              <div className="review-alert-icon">
                <AlertTriangle size={20} />
              </div>


              <div className="review-alert-content">

                <div className="review-alert-top">

                  <span>
                    DECISION #{decision.id}
                  </span>

                  <span className="review-status-pill">
                    Review required
                  </span>

                </div>


                <h2>{decision.title}</h2>


                <div className="review-reason">

                  <div className="review-reason-label">
                    <AlertTriangle size={14} />
                    Why this was flagged
                  </div>

                  <p>
                    {decision.decayMessage ||
                      "The assumptions behind this decision may have changed."}
                  </p>

                </div>


                <Link
                  to={`/decisions/${decision.id}`}
                  className="review-decision-button"
                >
                  Review Decision
                  <ArrowRight size={15} />
                </Link>

              </div>

            </article>

          ))}

        </div>

      )}

    </div>
  );
}

export default ReviewAlerts;