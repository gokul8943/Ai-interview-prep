import React, { useState, useRef, useEffect } from 'react';

import logoSvg from '../public/logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { verifyOtp } from '@/services/UserAPi/AuthApi';


// Define types for our component
type InputRef = HTMLInputElement | null;

const OtpPage: React.FC = () => {
    const [otps, setOtps] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<InputRef[]>([]);

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

    const handleSubmit = (): void => {
        const otp = otps.join('');
        const email = localStorage.getItem("email") || "";
        if (otp.length === 6 && email) {
            verifyOtp(email, otp)
        }
    };

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-3xl bg-zinc-900 p-8 shadow-lg">
                <div className="mb-6 flex justify-center">
                    <div className="flex items-center gap-2">
                        <img src={logoSvg} alt="logo" height={32} width={38} />
                        <h2 className="text-primary-100">IntelliPrep</h2>
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
                            <Input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="h-14 w-12 rounded-lg bg-zinc-800 text-center text-xl font-bold text-white focus:border-2 focus:border-purple-400 focus:outline-none"
                                value={otps[index] || ''}
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

                <Button
                    onClick={handleSubmit}
                    className="w-full rounded-lg bg-purple-300 py-3 font-bold text-zinc-800 transition-colors hover:bg-purple-400"
                >
                    Verify OTP
                </Button>

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
