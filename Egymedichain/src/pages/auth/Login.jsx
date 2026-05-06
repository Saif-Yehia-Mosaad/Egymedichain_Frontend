import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/http";
import { googleLogin } from "../../services/authService";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("fill");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      loginUser({ token, user });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const userData = await googleLogin(credentialResponse.credential);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }
      loginUser(userData);
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-form_right">
        <h2>
          Sign <span>In</span>
        </h2>
        <h1 className="desc">
          <span>Authorized</span> personnel access only. Monitor, audit, and
          manage Egypt's pharmaceutical supply chain.
        </h1>

        <div className="input-box">
          <img src="/Frame 48 (1).png" alt="email icon" style={{ width: "20px", height: "20px" }} />
          <input
            type="text"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        {!email && error === "fill" && (
          <p className="field-error">Please enter your email</p>
        )}

        <div className="input-box password-box">
          <img src="/Frame 48.png" alt="key icon" style={{ width: "20px", height: "20px" }} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        {!password && error === "fill" && (
          <p className="field-error">Please enter your password</p>
        )}

        <div className="options">
          <label className="remember">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <a onClick={() => navigate("/forget-password")} className="forgot" style={{ cursor: "pointer" }}>
            <span>Forgot password?</span>
          </a>
        </div>

        <button type="submit" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error === "Invalid credentials" && (
          <p className="error-msg">Invalid credentials</p>
        )}
        {error === "Google login failed. Please try again." && (
          <p className="error-msg">{error}</p>
        )}

        <div className="divider">
          <span>or</span>
        </div>

        <div className="google-btn-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google login failed. Please try again.")}
            text="signin_with"
            shape="rectangular"
            theme="outline"
            width="100%"
          />
        </div>
      </div>

      <div className="login-form_left">
        <img src="/image 2 .png" alt="Login Image" />
      </div>
    </div>
  );
}