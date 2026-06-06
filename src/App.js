import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LearnerLayout from "./layouts/LearnerLayout";
import DashboardPage from "./pages/learner/DashboardPage";
import LearnPage from "./pages/learner/LearnPage";
import QuizPage from "./pages/learner/QuizPage";
import ResultPage from "./pages/learner/ResultPage";
import PathPage from "./pages/learner/PathPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import DiagnosticQuizPage from "./pages/DiagnosticQuizPage";
import DiagnosticResultPage from "./pages/DiagnosticResultPage";
import AdminLayout from "./layouts/AdminLayout";
import CompletionPage from "./pages/learner/CompletionPage";

function ProtectedRoute({ children }) {
  const studentId = localStorage.getItem("student_id");
  if (!studentId) return <Navigate to="/" />;
  return children;
}

function AdminProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("admin") === "true";
  if (!isAdmin) return <Navigate to="/admin" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <LearnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="path" element={<PathPage />} />
        <Route path="completion" element={<CompletionPage />} />
      </Route>

      <Route path="/admin" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/diagnostic"
        element={
          <ProtectedRoute>
            <DiagnosticQuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/diagnostic/result"
        element={
          <ProtectedRoute>
            <LearnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DiagnosticResultPage />} />
      </Route>
    </Routes>
  );
}
