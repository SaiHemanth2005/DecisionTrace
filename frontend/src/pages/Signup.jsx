import { Link, useNavigate } from "react-router-dom";

function Signup() {
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
          <h1>Create your account</h1>
          <p>Start preserving the reasoning behind your team's decisions.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </label>

          <button className="auth-button" type="submit">
            Create account →
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;