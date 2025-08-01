import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "pre-interview" | "create-interview"; // 🔁 Add type
}

const InstructionModal: React.FC<InstructionModalProps> = ({ isOpen, onClose, type }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || type !== "pre-interview") return; // Only start timer in pre-interview mode

    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/create-interview");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, navigate, type]);

  if (!isOpen) return null;

  const renderInstructions = () => {
    if (type === "pre-interview") {
      return (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">Interview Instructions</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Ensure your microphone is working properly.</li>
            <li>✔ Find a quiet environment for the interview.</li>
            <li>✔ Read each question carefully before answering.</li>
            <li>✔ You will have limited time to answer each question.</li>
            <li>✔ Click "Next" to proceed to the next question.</li>
          </ul>
        </>
      );
    } else if (type === "create-interview") {
      return (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create Interview Instructions</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Fill in the candidate details accurately.</li>
            <li>✔ Choose the appropriate interview format and questions.</li>
            <li>✔ You can preview the interview before sending it out.</li>
            <li>✔ Set time limits and instructions clearly for the candidate.</li>
            <li>✔ Save or share the interview once you're done creating.</li>
          </ul>
        </>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="border border-e-amber-200 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {renderInstructions()}

        {/* Timer only for pre-interview */}
        {type === "pre-interview" && (
          <div className="text-center mt-4 text-lg font-bold text-blue-600">
            Interview will start in {timeLeft} seconds...
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          {type === "pre-interview" ? (
            <Link to="/interview">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Proceed
              </button>
            </Link>
          ) : (
            <Link to="/create-interview">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Got It
            </button>
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;
