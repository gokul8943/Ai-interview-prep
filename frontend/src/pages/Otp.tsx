import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Shield, AlertCircle, Loader2 } from 'lucide-react';

import logoSvg from '../public/logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { verifyOtp, sendOtp } from '@/services/UserAPi/AuthApi';

type InputRef = HTMLInputElement | null;

const OtpPage: React.FC = () => {
  const [otps, setOtps] = useState<string[]>(Array(6).fill(''));
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<InputRef[]>([]);
  const navigate = useNavigate();

  const handleChange = (element: HTMLInputElement, index: number): void => {
    const value = element.value;

    if (isNaN(Number(value))) return;
    const newOtp = [...otps];
    newOtp[index] = value.substring(0, 1);
    setOtps(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Backspace' && !otps[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (/^\d+$/.test(pastedData) && pastedData.length === 6) {
      const digits = pastedData.slice(0, 6).split('');
      setOtps(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    const email = localStorage.getItem("email") || "";
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }
    if (resending) return;

    try {
      setResending(true);
      await sendOtp(email);
      toast.success("OTP sent successfully");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const otp = otps.join('');
    const email = localStorage.getItem("email") || "";
    if (otp.length !== 6 || !email) {
      toast.error('Enter the 6-digit code sent to your email');
      return;
    }
    if (verifying) return;
    try {
      setVerifying(true);
      await verifyOtp(email, otp);
      toast.success('Email verified successfully');
      const source = localStorage.getItem('otpSource') || localStorage.getItem('authFlow');
      localStorage.removeItem('email');
      localStorage.removeItem('otpSource');
      localStorage.removeItem('authFlow');
      if (source === 'sign-up') {
        navigate('/sign-in');
      } else {
        navigate('/sign-in');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const email = localStorage.getItem("email") || "";
  const maskedEmail = email.replace(/(.{2}).*(@.*)/, '$1***$2');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-top bg-no-repeat opacity-30" />
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-sm text-slate-500 font-mono">
              app.intelliprep.ai/verify
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <img src={logoSvg} alt="" width={38} height={32} />
              <span className="font-bold text-xl text-slate-900">IntelliPrep</span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Verify Your Email</h2>
            <p className="text-slate-600 text-center mb-6">We've sent a 6-digit code to <span className="font-medium text-slate-900">{maskedEmail}</span></p>

            <div className="mb-8">
              <div className="flex justify-center space-x-2">
                {[...Array(6)].map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    className="h-14 w-12 rounded-lg bg-slate-50 border-2 border-slate-200 text-center text-xl font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
                    value={otps[index] || ''}
                    onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    ref={(ref) => {
                      if (ref) {
                        inputRefs.current[index] = ref;
                      }
                    }}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={verifying || otps.some(v => !v)}
              className="w-full py-3 rounded-lg"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Didn't receive the code?
                <button
                  onClick={handleResendOtp}
                  disabled={resending}
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resending ? 'Sending...' : 'Resend OTP'}
                </button>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Code expires in 10 minutes. Never share your code with anyone.</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Didn't request this? <a href="/sign-in" className="text-blue-600 hover:underline font-medium">Sign in instead</a>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;