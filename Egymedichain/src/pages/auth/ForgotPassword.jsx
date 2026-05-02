import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/http";
import "./login.css";
import "./ForgotPassword.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    setError("");
    if (!email) {
      setError("fill");
      return;
    }
    setLoading(true);
  
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="login-form_right">
        <h2>Forgot <span>Password</span></h2>
        <h1 className="desc">
          Enter your email and we'll send you a reset link.
        </h1>

        <div className="input-box">
          <FaEnvelope />
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

        {success && (
          <p className="success-msg">Reset link sent! Check your email ✅</p>
        )}

        <button type="button" onClick={handleReset} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="back-login" onClick={() => navigate("/")}>
          ← Back to Login
        </p>
      </div>

      <div className="login-form_left">
        <img src="/image 2 .png" alt="Login Image" />
      </div>
    </div>
  );
}