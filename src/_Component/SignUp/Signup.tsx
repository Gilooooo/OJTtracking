"use client"
import { Building, ChevronDown, Eye, EyeClosed, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("");

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="bg-white min-h-screen text-[#242323] flex justify-center items-center py-8">
      <section className="m-auto flex justify-center items-center sm:p-0 p-2 w-full">
        <form className="p-6 bg-white rounded-lg shadow-2xl w-full sm:max-w-lg max-w-sm">
          <h2 className="text-center text-2xl pb-6">Create Account</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Email */}
            <div className="flex flex-col">
              <label>Email Address</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span><Mail size={14}/></span>
                <input
                  type="email"
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="flex flex-col">
              <label>Full Name</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span><User size={14}/></span>
                <input
                  type="text"
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label>Username</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span><User size={14}/></span>
                <input
                  type="text"
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label>Phone Number</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span><Phone size={14}/></span>
                <input
                  type="tel"
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col md:col-span-2">
              <label>Password</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <Lock size={18}/>
                <input
                  type={showPassword ? "text" : "password"}
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Create a password"
                />
                {showPassword ? (
                  <EyeClosed onClick={togglePassword} size={18} className="cursor-pointer"/>
                ) : (
                  <Eye onClick={togglePassword} size={18} className="cursor-pointer"/>
                )}
              </div>
            </div>

            {/* User Type */}
            <div className="flex flex-col md:col-span-2">
              <label>Account Type</label>
              <div className="flex items-center relative bg-[#f3f3f5] rounded-xl py-2 px-3 h-10">
                <select 
                  className="text-sm focus:outline-none appearance-none pr-8 bg-transparent w-full"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select account type</option>
                  <option value="student">Student</option>
                  <option value="non-student">Non-Student</option>
                  <option value="supervisor">Supervisor</option>
                </select>
                <span className="absolute right-2">
                  <ChevronDown size={18} />
                </span>
              </div>
            </div>

            {/* Student Fields */}
            {userType === "student" && (
              <>
                <div className="flex flex-col">
                  <label>Student ID</label>
                  <input
                    type="text"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter student ID"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Course</label>
                  <input
                    type="text"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter your course"
                  />
                </div>
                <div className="flex flex-col">
                  <label>School</label>
                  <input
                    type="text"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter school name"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Year Level</label>
                  <div className="flex items-center relative bg-[#f3f3f5] rounded-xl py-2 px-3 h-10">
                    <select className="text-sm focus:outline-none appearance-none pr-8 bg-transparent w-full">
                      <option value="">Select year level</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                    <span className="absolute right-2">
                      <ChevronDown size={18} />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label>Hours Required</label>
                  <input
                    type="number"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter required hours"
                  />
                </div>
              </>
            )}

            {/* Non-Student Fields */}
            {userType === "non-student" && (
              <div className="flex flex-col md:col-span-2">
                <label>Hours Required</label>
                <input
                  type="number"
                  className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                  placeholder="Enter required hours"
                />
              </div>
            )}

            {/* Supervisor Fields */}
            {userType === "supervisor" && (
              <div className="flex flex-col md:col-span-2">
                <label>Company</label>
                <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                  <Building size={18}/>
                  <input
                    type="text"
                    className="focus:outline-none flex-1 px-3 bg-transparent"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
            )}
          </div>

          <button className="bg-blue-500 text-white py-2 w-full mt-6 rounded-xl text-sm">
            Create Account
          </button>
          
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a className="text-blue-400 cursor-pointer" href="/Login">Sign In</a>
          </p>
        </form>
      </section>
    </main>
  );
}