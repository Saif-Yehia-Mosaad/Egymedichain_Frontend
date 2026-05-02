import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCheckSquare, FaRegSquare, FaKey } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/http";
import "./ForgotPassword.css";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const { loginUser } = React.useContext(AuthContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("fill");
    return;
  }

  setLoading(true);

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

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
  return (

    <div className="container">


      <div className="login-form_right">
    
        <h2>
          Sign <span>In</span>
        </h2>
        <h1 className="desc">
         <span>Authorized</span> personnel access only. Monitor, audit, and manage Egypt’s pharmaceutical supply chain.
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
          {!email && error === "fill" && <p className="field-error">Please enter your email </p>}  {/* زيد هنا */}
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
    {showPassword ? <FaEye/> : <FaEyeSlash/>}
  </span>
</div>
          {!password && error === "fill" && <p className="field-error">Please enter your password</p>}  {/* زيد هنا */}

        <div className="options">

          <label className="remember">

            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <a onClick={() => navigate("/forgot-password")} className="forgot" style={{cursor:"pointer"}}>
         
            <span>Forgot password?</span>
          </a>

        </div>
       

        <button
  type="submit"
  onClick={handleLogin}
  disabled={loading}
>
          {loading ? "Signing in..." : "Sign in"}
        </button>

{error === "Invalid credentials" && <p className="error-msg">Invalid credentials</p>}




      </div>

      <div className="login-form_left">
        <img src="/image 2 .png" alt="Login Image" />
      </div>
    </div>

  );

}
