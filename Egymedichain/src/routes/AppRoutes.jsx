import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";
import YoureBackIn from "../pages/auth/YoureBackIn";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/youre-back-in" element={<YoureBackIn />} />

      {/* Protected Pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;