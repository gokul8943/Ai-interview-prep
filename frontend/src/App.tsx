import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Interview from "./pages/Interview";
import OtpPage from "./pages/Otp";
import CreateInterview from "./pages/CreateInterview";

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
            <Route path="/interview" element={<Interview/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
