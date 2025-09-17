"use client"
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading_Page from "../Loading/Loading";

function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid reset link');
      return;
    }
    setToken(tokenParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/changepassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          router.push('/Login');
        }, 2000);
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white h-[100dvh] text-[#242323] flex justify-center items-center">
      <section className="m-auto flex justify-center items-center sm:p-0 p-2 w-full">
        <div className="p-5 bg-white rounded-lg drop-shadow-2xl w-full max-w-sm">
          <h2 className="text-center text-2xl pb-4">Reset Password</h2>
          <p className="text-center text-gray-600 text-sm pb-6">
            Enter your new password below.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm">
            <div className="flex flex-col">
              <label>New Password</label>
              <div className="py-2 px-3 grow bg-[#f3f3f5] rounded-xl flex items-center">
                <Lock size={18}/>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="focus:outline-none flex-1 px-3"
                  placeholder="Enter new password"
                  required
                />
                {showPassword ? (
                  <EyeClosed onClick={() => setShowPassword(false)} size={18} className="cursor-pointer"/>
                ) : (
                  <Eye onClick={() => setShowPassword(true)} size={18} className="cursor-pointer"/>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label>Confirm Password</label>
              <div className="py-2 px-3 grow bg-[#f3f3f5] rounded-xl flex items-center">
                <Lock size={18}/>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:outline-none flex-1 px-3"
                  placeholder="Confirm new password"
                  required
                />
                {showConfirmPassword ? (
                  <EyeClosed onClick={() => setShowConfirmPassword(false)} size={18} className="cursor-pointer"/>
                ) : (
                  <Eye onClick={() => setShowConfirmPassword(true)} size={18} className="cursor-pointer"/>
                )}
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            {message && (
              <div className="text-green-500 text-sm text-center bg-green-50 p-2 rounded">
                {message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || !token}
              className="bg-blue-500 text-white py-2 w-full self-center rounded-sm text-sm text-center hover:shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('/Login')}
                className="text-blue-400 text-sm hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function ChangePassword() {
  return (
    <Suspense fallback={
      <main className="bg-white h-[100dvh] text-[#242323] flex justify-center items-center">
        <Loading_Page/>
      </main>
    }>
      <ChangePasswordForm />
    </Suspense>
  );
}