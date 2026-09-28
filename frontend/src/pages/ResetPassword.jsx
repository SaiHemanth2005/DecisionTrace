import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-mark">D</div>
        <span>DecisionTrace</span>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1>Reset password</h1>
          <p>Create a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            New password
            <input
              type="password"
              placeholder="Enter new password"
              required
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              placeholder="Confirm new password"
              required
            />
          </label>

          <button className="auth-button" type="submit">
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;