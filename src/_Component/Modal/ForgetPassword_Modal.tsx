import { X } from "lucide-react";
import { useState } from "react";
import SuccessModal from "./Success_Modal.tsx";

interface ForgetPassModalProps {
  setForgetPass: (value: boolean) => void;
}

export default function ForgetPassModal({
  setForgetPass,
}: ForgetPassModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/forgetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send reset email');
      }
    } catch (error) {
        console.error("Error:", error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setForgetPass(false);
  };

  if (showSuccess) {
    return (
      <SuccessModal
        title="Email Sent!"
        message="We've sent a password reset link to your email address. Please check your inbox and follow the instructions."
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Forget Password</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} onClick={() => setForgetPass(false)} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-4">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email Address"
              className="py-2 px-3 rounded-md bg-[#f3f3f5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => setForgetPass(false)}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
