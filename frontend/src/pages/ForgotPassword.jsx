import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-mark">D</div>
        <span>DecisionTrace</span>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1>Forgot your password?</h1>
          <p>
            Enter your email and we'll send instructions to reset your
            password.
          </p>
        </div>

        {submitted ? (
          <div className="auth-success">
            <strong>Reset link requested</strong>
            <p>
              If an account exists for this email, password reset instructions
              will be available.
            </p>

            <Link to="/login">Back to sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <button className="auth-button" type="submit">
              Send reset link
            </button>
          </form>
        )}

        <div className="auth-footer">
          Remembered your password? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;