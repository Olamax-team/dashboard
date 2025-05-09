
import  React from "react"
import {useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

type OTPVerificationProps = {
  setShowOTP: (isOpen: boolean) => void
}

export default function OTPVerification({ setShowOTP }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [timeLeft, setTimeLeft] = useState(60)
  const [error, setError] = useState<string | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only allow digits
    if (value && !/^\d+$/.test(value)) return

    // Only take the last character if multiple characters are entered
    const digit = value.slice(-1)

    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    // Clear any previous error when user types
    if (error) setError(null)

    // Auto-focus next input if a digit was entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)
      // Clear any previous error when user pastes a valid code
      if (error) setError(null)
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if all OTP fields are filled
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the verification code")
      return
    }

    // Here you would typically validate the OTP with your backend
    console.log("OTP submitted:", otp.join(""))

    // Close the modal after successful validation
    setShowOTP(false)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the modal from closing it
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowOTP(false)}>
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm" onClick={handleModalClick}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Auth Code</h1>
          <p className="text-gray-600 mt-2">
            We just have to make sure it's really you. Kindly
            <br />
            Input the 6-digit code sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <div key={index} className="w-14 h-14">
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  pattern="\d{1}"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-full h-full text-center text-2xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label={`Digit ${index + 1} of verification code`}
                  required
                />
              </div>
            ))}
          </div>

          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          <div className="text-right mb-4">
            <span className="text-blue-500 font-medium">{timeLeft}s</span>
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg rounded-md"
          >
            Proceed
          </Button>
        </form>
      </div>
    </div>
  )
}
