import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useAdminAuth } from "./context/AdminAuthContext";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { NudgesPage } from "./pages/NudgesPage";
import { SubmitPage } from "./pages/SubmitPage";
import { TipDetailPage } from "./pages/TipDetailPage";

const ProtectedSubmitPage = () => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated ? <SubmitPage /> : <Navigate to="/admin" replace />;
};

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit" element={<ProtectedSubmitPage />} />
      <Route path="/tip/:id" element={<TipDetailPage />} />
      <Route path="/nudges" element={<NudgesPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
