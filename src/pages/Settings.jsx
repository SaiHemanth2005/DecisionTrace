import { useEffect, useState } from "react";

function Settings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("decisiontrace-theme") || "dark";
  });

  const [reviewAlerts, setReviewAlerts] = useState(() => {
    return (
      localStorage.getItem("decisiontrace-review-alerts") !== "false"
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("decisiontrace-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "decisiontrace-review-alerts",
      String(reviewAlerts)
    );
  }, [reviewAlerts]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }

  function toggleReviewAlerts() {
    setReviewAlerts((currentValue) => !currentValue);
  }

  return (
    <div className="page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <div className="eyebrow">ACCOUNT</div>

          <h1>Settings</h1>

          <p>
            Manage your DecisionTrace workspace preferences.
          </p>
        </div>
      </div>


      <div className="settings-card">

        {/* GENERAL */}

        <div className="settings-section">
          <h2>General</h2>

          <p>
            Basic workspace preferences.
          </p>

          <div className="setting-row">
            <div>
              <strong>Workspace name</strong>

              <span>
                DecisionTrace
              </span>
            </div>

            <button className="secondary-button">
              Edit
            </button>
          </div>
        </div>


        {/* NOTIFICATIONS */}

        <div className="settings-section">
          <h2>Notifications</h2>

          <p>
            Choose which alerts you want to receive.
          </p>

          <div className="setting-row">

            <div>
              <strong>
                Decision review alerts
              </strong>

              <span>
                {reviewAlerts
                  ? "Receive alerts when decision assumptions may have changed."
                  : "Decision review notifications are disabled."}
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                checked={reviewAlerts}
                onChange={toggleReviewAlerts}
              />

              <span />

            </label>

          </div>
        </div>


        {/* APPEARANCE */}

        <div className="settings-section">

          <h2>Appearance</h2>

          <p>
            Customize how DecisionTrace looks.
          </p>

          <div className="setting-row">

            <div>
              <strong>Theme</strong>

              <span>
                {theme === "dark"
                  ? "Dark"
                  : "Light"}
              </span>
            </div>

            <button
              className="secondary-button theme-button"
              onClick={toggleTheme}
            >
              {theme === "dark"
                ? "Switch to Light"
                : "Switch to Dark"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;