import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(30); // ✅ 10-second timer
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(30); // Reset timer when modal opens
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/create-interview"); // ✅ Auto redirect
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="border border-e-amber-200 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Interview Instructions</h2>

        {/* Instructions */}
        <ul className="space-y-3 text-gray-700">
          <li>✔ Ensure your microphone is working properly.</li>
          <li>✔ Find a quiet environment for the interview.</li>
          <li>✔ Read each question carefully before answering.</li>
          <li>✔ You will have limited time to answer each question.</li>
          <li>✔ Click "Next" to proceed to the next question.</li>
        </ul>

        {/* ✅ Countdown Timer */}
        <div className="text-center mt-4 text-lg font-bold text-blue-600">
          Interview will start in {timeLeft} seconds...
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <Link to="/create-interview">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;
