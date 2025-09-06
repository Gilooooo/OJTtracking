"use client";
import {
  Building,
  ChevronDown,
  Eye,
  EyeClosed,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("");
   const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    phone: "",
    password: "",
    studentId: "",
    course: "",
    school: "",
    yearLevel: "",
    hoursRequired: "",
    company: "",
  });

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          accountType: userType
        })
      });

      const result = await response.json();
      if (response.ok) {
        router.push('/Login');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error("Network error", error);
      alert('Network error occurred');
    }
  };

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      studentId: "",
      course: "",
      school: "",
      yearLevel: "",
      hoursRequired: "",
      company: ""
    }));
  }, [userType])


  return (
    <main className="bg-white min-h-screen text-[#242323] flex justify-center items-center py-8">
      <section className="m-auto flex justify-center items-center sm:p-0 p-2 w-full">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow-2xl w-full sm:max-w-lg max-w-sm"
        >
          <h2 className="text-center text-2xl pb-6">Create Account</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Email */}
            <div className="flex flex-col">
              <label>Email Address</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span>
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="flex flex-col">
              <label>Full Name</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span>
                  <User size={14} />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label>Username</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span>
                  <User size={14} />
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label>Phone Number</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <span>
                  <Phone size={14} />
                </span>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col md:col-span-2">
              <label>Password</label>
              <div className="py-2 px-3 bg-[#f3f3f5] rounded-xl flex items-center">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="focus:outline-none flex-1 px-3 bg-transparent"
                  placeholder="Create a password"
                  required
                />
                {showPassword ? (
                  <EyeClosed
                    onClick={togglePassword}
                    size={18}
                    className="cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={togglePassword}
                    size={18}
                    className="cursor-pointer"
                  />
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
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    type="text"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter student ID"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Course</label>
                  <input
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    type="text"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter your course"
                  />
                </div>
                <div className="flex flex-col">
                  <label>School</label>
                  <input
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    type="text"
                    className="py-2 px-3 bg-[#f3f3f5] rounded-xl focus:outline-none"
                    placeholder="Enter school name"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Year Level</label>
                  <div className="flex items-center relative bg-[#f3f3f5] rounded-xl py-2 px-3 h-10">
                    <select
                      className="text-sm focus:outline-none appearance-none pr-8 bg-transparent w-full"
                      name="yearLevel"
                      value={formData.yearLevel}
                      onChange={handleInputChange}
                    >
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
                    name="hoursRequired"
                    value={formData.hoursRequired}
                    onChange={handleInputChange}
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
                  name="hoursRequired"
                  value={formData.hoursRequired}
                  onChange={handleInputChange}
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
                  <Building size={18} />
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    type="text"
                    className="focus:outline-none flex-1 px-3 bg-transparent"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 w-full mt-6 rounded-xl text-sm"
          >
            Create Account
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a className="text-blue-400 cursor-pointer" href="/Login">
              Sign In
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
