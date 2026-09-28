import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "decisiontrace-user",
      JSON.stringify({ name: "Sai Hemanth" })
    );

    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-mark">D</div>
        <span>DecisionTrace</span>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to continue to DecisionTrace.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>

          <div className="auth-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="auth-button" type="submit">
            Sign in
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;