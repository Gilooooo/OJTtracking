import {
  Award,
  Building,
  Clock,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  TrendingUp,
} from "lucide-react";

export default function Profile() {
  return (
    <main className="text-black space-y-3.5">
      <div className="flex items-center justify-between">
        <h1 className="flex flex-col sm:text-2xl text-lg font-semibold">
          My Profile
          <span className="sm:text-sm text-xs font-light">
            Manage your personal information and OJT details
          </span>
        </h1>
        <button className="flex items-center gap-2 xs:py-2 xs:px-3 p-2 bg-blue-500 rounded-lg text-white xs:text-sm text-[10px]">
          <Edit size={12} /> Edit profile
        </button>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col flex-1/3 gap-4">
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            {/* Profile Picture */}
            <div className="p-10 rounded-full bg-amber-400 w-fit">MS</div>
            {/* Full Name */}
            <h1 className="text-center mt-4 font-semibold text-lg">
              Maria Santos
            </h1>
            {/* Course */}
            <span className="text-gray-500 text-sm text-center">
              Bachelor of Science in Computer Science
            </span>
            {/* Student id if applicable */}
            <span className="text-xs ">Student ID : 2023-12345</span>
            <span className="py-1 px-2 bg-[#dbeafe] text-[#3a77fc] rounded-lg text-xs mt-4">
              Active
            </span>
            <div className="mt-4 border-t border-gray-300 w-full pt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-gray-400" />
                <span className="text-xs flex flex-col items-start text-gray-400">
                  Email
                  <span className="text-black font-semibold">
                    maria.santos@gmail.com
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-gray-400" />
                <span className="text-xs flex flex-col items-start text-gray-400">
                  Phone
                  <span className="text-black font-semibold">
                    +63 9665907737
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-xs flex flex-col items-start text-gray-400">
                  Address
                  <span className="text-black font-semibold">
                    Dasmarinas Cavite
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* Academic Info */}
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            <h1 className="flex items-center gap-2 w-full text-lg">
              <GraduationCap size={18} className="text-[#3a77fc]" /> Academic
              Information
            </h1>
            <div className="w-full pt-4 flex flex-col gap-4">
              <span className="text-xs flex flex-col items-start text-gray-400">
                Course
                <span className="text-black font-semibold">
                  Bachelor of Science in Computer Science
                </span>
              </span>
              <span className="text-xs flex flex-col items-start text-gray-400">
                Year Level
                <span className="text-black font-semibold">4th Year</span>
              </span>
              <span className="text-xs flex flex-col items-start text-gray-400">
                GWA
                <span className="text-black font-semibold">1.0</span>
              </span>
            </div>
          </div>
          {/* Achivements */}
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            <h1 className="flex items-center gap-2 w-full text-lg">
              <Award size={18} className="text-[#3a77fc]" /> Achievements
            </h1>
            <div className="w-full pt-4 flex flex-col gap-2">
              {/* Achievemnts type */}
              <div className="flex items-center gap-2 py-2 px-3 bg-[#f3f3f5] rounded-lg">
                <span className="p-2 bg-[#2b7fff] text-white rounded-lg">
                  <TrendingUp size={12} />
                </span>
                <div className="text-xs flex flex-col">
                  <span className="font-semibold">Quick Learner</span>
                  <span className="text-gray-600">
                    Completed onboarding on time
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 py-2 px-3 bg-[#f3f3f5] rounded-lg">
                <span className="p-2 bg-[#fe9a00] text-white rounded-lg">
                  <Star size={12} />
                </span>
                <div className="text-xs flex flex-col">
                  <span className="font-semibold">Quick Learner</span>
                  <span className="text-gray-600">
                    Completed onboarding on time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="flex flex-col flex-2/3 gap-4">
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            <div className="flex flex-col w-full">
              <h1 className="flex items-center gap-2 text-lg">
                <Clock size={18} className="text-[#3a77fc]" /> Academic OJT
                Progress
              </h1>
              <span className="text-xs text-gray-500">
                Track your internship hours and milestones
              </span>
            </div>
            {/* Progress bar */}
            <div className="flex justify-between items-center self-stretch">
              {/* Total hours required */}
              <div className="flex flex-col self-end">
                <p className="xs:text-md text-sm">Total Hours Completed</p>
                <p className="xs:text-sm text-xs">350 of 600 required hours</p>
              </div>
              {/* Progress in percentage */}
              <div className="text-end">
                <p className="xs:text-2xl text-lg font-semibold text-blue-600">
                  58%
                </p>
                <p className="xs:text-sm text-xs">250 hours remaining</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 my-2">
              <div
                className="bg-black h-4 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="w-full flex sm:flex-row  flex-col items-center gap-3 mt-2">
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                62 <span className="text-sm font-extralight">Days Left</span>
              </h1>
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                4 <span className="text-sm font-extralight">Total Logs</span>
              </h1>
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                3 <span className="text-sm font-extralight">Approved</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            <h1 className="flex items-center gap-2 w-full text-lg">
              <Building size={18} className="text-[#3a77fc]" /> Company
              Information
            </h1>
            <div className="w-full pt-4 grid xs:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Course</span>
                <h1 className="text-black font-semibold text-sm">
                  Tech Company
                </h1>
                <p className="text-xs text-gray-500">Makati City</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">Supervisor</span>
                <h1 className="text-black font-semibold text-sm">
                  Iron Man
                </h1>
                <p className="text-xs text-gray-500">iron.man@gmail.com</p>
                <p className="text-xs text-gray-500">+63 999999999</p>
              </div>
              {/* Date Start */}
              <div>
                <span className="text-xs text-gray-400">Start Date</span>
                <h1 className="text-black font-semibold text-sm">
                  January 15, 2025
                </h1>
              </div>
              {/* Date End */}
               <div>
                <span className="text-xs text-gray-400">End Date</span>
                <h1 className="text-black font-semibold text-sm">
                  December 15, 2025
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
