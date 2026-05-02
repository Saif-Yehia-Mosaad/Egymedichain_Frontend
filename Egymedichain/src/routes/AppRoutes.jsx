import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>