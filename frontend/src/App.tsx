import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import OtpPage from "./pages/Otp";
import HomePage from "./pages/Home/HomePage";
import CreateInterview from "./pages/CreateInterview/CreateInterview";
import Interview from "./pages/Interview/Interview";
import InterviewSummary from "./pages/Summary/InterviewSummary";
import SpeechTest from "./pages/Speeech";



const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tl from-black to-blue-950 pt-[50px]">
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/otp-verify" element={<OtpPage />} />
            <Route path="/create-interview" element={<CreateInterview />} />
            <Route path="/interview/:id" element={<Interview/>} />
            <Route path="/summary" element={<InterviewSummary />} />
            <Route path="/speech" element={<SpeechTest />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
