import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";

function ReviewAlerts({ decisions }) {
  const reviewDecisions = decisions.filter(
    (decision) => decision.decayDetected
  );

  const [newInformation, setNewInformation] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReview() {
    if (!newInformation.trim()) {
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const response = await fetch("http://127.0.0.1:8000/review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_information: newInformation.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to review decisions");
      }

      const result = await response.json();

      setAnalysis(result.analysis);
    } catch (error) {
      console.error(error);
      setError("Could not connect to the DecisionTrace backend.");
    } finally {
      setLoading(false);
    }
  }

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

      <div className="content-card">
        <h2>Check for Decision Decay</h2>

        <p>
          Enter new information to check whether it may affect previous
          decisions.
        </p>

        <textarea
          value={newInformation}
          onChange={(event) => setNewInformation(event.target.value)}
          placeholder="Example: Analytics requirements have decreased significantly."
          rows={4}
        />

        <button
          className="primary-button"
          onClick={handleReview}
          disabled={loading || !newInformation.trim()}
        >
          {loading ? "Checking..." : "Check Decisions"}
        </button>

        {error && <p>{error}</p>}

        {analysis && (
          <div className="alert-reason">
            <strong>Decision Decay Analysis</strong>
            <p>{analysis}</p>
          </div>
        )}
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
