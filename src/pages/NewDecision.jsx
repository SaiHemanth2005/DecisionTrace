
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewDecision({ onAddDecision, projects }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
   title: "",
   description: "",
   reason: "",
   assumptions: "",
   alternatives: "",
   evidence: "",
   owner: "",
   projectId: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const splitLines = (value) =>
      value.split("\n").map((s) => s.trim()).filter(Boolean);

    const newDecision = {
      title: form.title.trim(),
      projectId: form.projectId,
      description: form.description.trim(),
      reason: form.reason.trim(),
      owner: form.owner.trim() || "Team member",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "active",
      assumptions: splitLines(form.assumptions),
      alternatives: splitLines(form.alternatives).map((name) => ({
        name,
        reason: "Not specified",
      })),
      evidence: splitLines(form.evidence),
      decayDetected: false,
      decayMessage: "",
    };

    const savedDecision = onAddDecision(newDecision);
    navigate(`/decisions/${savedDecision.id}`);
  }

  return (
    <main className="new-decision-page">
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <h1>Create New Decision</h1>
      <p className="form-subtitle">
        Record what your team decided and why.
      </p>

      <form onSubmit={handleSubmit} className="decision-form">
        <label>
          Decision title *
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Use PostgreSQL"
            required
          />
        </label>
        <label>
          Project *
        <select
          name="projectId"
          value={form.projectId}
          onChange={handleChange}
          required
        >
          <option value="">Select a project</option>

          {projects
            .filter((project) => project.status === "active")
            .map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          What was decided? *
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your decision..."
            required
          />
        </label>

        <label>
          Why was this decision made? *
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Explain the reasoning..."
            required
          />
        </label>

        <label>
          Assumptions
          <textarea
            name="assumptions"
            value={form.assumptions}
            onChange={handleChange}
            placeholder="Enter one assumption per line"
          />
        </label>

        <label>
          Alternatives considered
          <textarea
            name="alternatives"
            value={form.alternatives}
            onChange={handleChange}
            placeholder="Enter one alternative per line"
          />
        </label>

        <label>
          Supporting evidence
          <textarea
            name="evidence"
            value={form.evidence}
            onChange={handleChange}
            placeholder="Enter one reference per line"
          />
        </label>

        <label>
          Decision owner
          <input
            name="owner"
            value={form.owner}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <div className="form-actions">
          <Link to="/" className="cancel-button">
            Cancel
          </Link>

          <button type="submit" className="save-button">
            Save Decision
          </button>
        </div>
      </form>
    </main>
  );
}

export default NewDecision;