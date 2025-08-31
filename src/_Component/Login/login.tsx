"use client"
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [CheckPass, SetCheckPass] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const checking = (): void => {
    SetCheckPass(!CheckPass);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });
      console.log(result);
      
      if (result?.ok) {
        router.push('/Dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white h-[100dvh] text-[#242323] flex justify-center items-center ">
      <section className="m-auto flex justify-center items-center sm:p-0 p-2 w-full">
        <form onSubmit={handleSubmit} className="p-5 bg-white rounded-lg drop-shadow-2xl w-full max-w-sm">
          <h2 className="text-center text-2xl pb-9">Sign In</h2>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex flex-col">
              <label>Email Address</label>
              <div className="py-2 px-3 grow bg-[#f3f3f5] rounded-xl flex items-center">
                <Mail size={18}/>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className=" focus:outline-none flex-1 px-3"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <div className="py-2 px-3 grow bg-[#f3f3f5] rounded-xl flex items-center">
                <Lock size={18}/>
                <input
                  type={CheckPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="focus:outline-none flex-1 px-3"
                  placeholder="Password"
                  required
                />
                {CheckPass ? (
                  <EyeClosed onClick={checking} size={18}/>
                ) : (
                  <Eye onClick={checking} size={18}/>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between items-center-safe">
              <div className="flex gap-1 items-center justify-center text-sm">
                <input type="checkbox" name="remember" id="remember" className="  " />
                <label htmlFor="remember" className="">
                  Remember Me
                </label>
              </div>
              <a className="text-blue-400">Forget Password?</a>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-500 text-white py-2 w-full self-center rounded-sm text-sm text-center hover:shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a className="text-blue-400" href="/SignUp">Sign Up</a>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
