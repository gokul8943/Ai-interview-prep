import React, { useState, useRef, useEffect } from 'react';

// Define types for our component
type InputRef = HTMLInputElement | null;

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<InputRef[]>([]);

  // Handle OTP input change
  const handleChange = (element: HTMLInputElement, index: number): void => {
    const value = element.value;
    
    // Allow only numbers
    if (isNaN(Number(value))) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace and delete keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current field is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is numeric and has correct length
    if (/^\d+$/.test(pastedData) && pastedData.length === 6) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = (): void => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Here you would typically send the OTP to your backend for verification
      console.log('OTP Submitted:', otpValue);
      // Add your verification logic here
    }
  };

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-black bg-opacity-90">
      <div className="w-full max-w-md rounded-3xl bg-zinc-900 p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-200 to-purple-300"></div>
            <h1 className="ml-2 text-2xl font-bold text-white">No Name</h1>
          </div>
        </div>
        
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Enter OTP Code
        </h2>
        
        <p className="mb-6 text-center text-gray-400">
          We've sent a 6-digit code to your email
        </p>

        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="h-14 w-12 rounded-lg bg-zinc-800 text-center text-xl font-bold text-white focus:border-2 focus:border-purple-400 focus:outline-none"
                value={otp[index] || ''}
                onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={(ref) => {
                  if (ref) {
                    inputRefs.current[index] = ref;
                  }
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-purple-300 py-3 font-bold text-zinc-800 transition-colors hover:bg-purple-400"
        >
          Verify OTP
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Didn't receive code? <span className="cursor-pointer font-medium text-white hover:underline">Resend OTP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;