import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import EditUser from "./pages/EditUser";
import ConsultUser from "./pages/ConsultUser";
import FilteredTraces from "./pages/FilteredTraces";
import CreateTrace from "./pages/CreateTrace";
import EditTrace from "./pages/EditTrace";
import { JSX } from "react";
import CreateNumSerie from "./pages/CreateNumSerie";
import CreateOperation from "./pages/CreateOperation";
import ImportExcel from "./pages/ImportExcel";

// ProtectedRoute Component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            !!localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/traces"
          element={
            <ProtectedRoute>
              <FilteredTraces />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trace"
          element={
            <ProtectedRoute>
              <CreateTrace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/import-excel"
          element={
            <ProtectedRoute>
              <ImportExcel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-CreateNumSerie"
          element={
            <ProtectedRoute>
              <CreateNumSerie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-Operation"
          element={
            <ProtectedRoute>
              <CreateOperation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-trace/:id"
          element={
            <ProtectedRoute>
              <EditTrace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consult/:id"
          element={
            <ProtectedRoute>
              <ConsultUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
