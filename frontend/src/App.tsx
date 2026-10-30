import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import OtpPage from "./pages/Otp";
import HomePage from "./pages/Home/HomePage";
import CreateInterview from "./pages/CreateInterview/CreateInterview";
import Interview from "./pages/Interview/Interview";
import InterviewSummary from "./pages/Summary/InterviewSummary";
import Profile from "./pages/Profile/Profile";
import DemoPage from "./pages/Demo/DemoPage";
import RolesPage from "./pages/Roles/RolesPage";
import PrivacyPage from "./pages/Privacy/PrivacyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPublicPage = ['/demo', '/roles', '/privacy', '/create-interview'].includes(location.pathname) || location.pathname.startsWith('/summary/') || location.pathname.startsWith('/interview/');

  return (
    <>
      <Navbar />
      <div className={isHomePage || isPublicPage ? "min-h-screen bg-slate-50" : "min-h-screen bg-gradient-to-tl from-black to-blue-950 pt-[50px]"}
>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/otp-verify" element={<OtpPage />} />
            <Route
              path="/create-interview"
              element={
                <ProtectedRoute>
                  <CreateInterview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/:id"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summary/:id"
              element={
                <ProtectedRoute>
                  <InterviewSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;