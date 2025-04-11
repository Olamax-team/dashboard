import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

type OTPVerificationProps = {
    setShowOTP: (isOpen: boolean) => void; 
};

export default function OTPVerification({setShowOTP}: OTPVerificationProps) {

  const [otp, setOtp] = useState<string[]>(["2", "1", "0", "5", "5", "9"]);
  const [timeLeft, setTimeLeft] = useState(32);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowOTP(false)}>

    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Auth Code</h1>
        <p className="text-gray-600 mt-2">
          We just have to make sure it's really you. Kindly
          <br />
          Input the 6-digit code sent to your email.
        </p>
      </div>

      <div className="flex justify-between mb-8">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="w-14 h-14">
            <input
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index] || ""}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-full h-full text-center text-2xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>

      <div className="text-right mb-4">
        <span className="text-blue-500 font-medium">{timeLeft}s</span>
      </div>

      <Button
        className="w-full py-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg rounded-md"
        onClick={() => setShowOTP} // Close modal on proceed
      >
        Proceed
      </Button>
    </div>
    </div>
  );
}
