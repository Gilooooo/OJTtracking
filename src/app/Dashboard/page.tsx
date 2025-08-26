"use client";
import DashboardSection from "@/_Component/Student/Dashboard/dashboardsection";
import LogBook from "@/_Component/Student/Logs/Logbook";
import Notification from "@/_Component/Student/Notifications/notification";
import Profile from "@/_Component/Student/Profile/Profile";
import { Bell, BookOpen, HomeIcon, LogOut, Menu, User2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "logbook":
        return <LogBook />;
      case "profile":
        return <Profile/>;
      case "notifications":
        return <Notification/>;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <main className="w-full h-screen">
      {/* Mobile Hamburger Nav */}
      <nav className="md:hidden bg-white w-full text-black  ">
        <div className="flex items-center justify-between p-4">
          <span className="font-semibold">OJT Tracking</span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50">
            <div className="p-4">
              <div className="bg-blue-500 p-4 rounded-2xl text-xs mb-4">
                <div className="flex items-center gap-2">
                  <div className="py-3 px-4 rounded-full bg-amber-400">IT</div>
                  <div className="flex flex-col">
                    <span className="text-sm">Student Name</span>
                    <span>Student Course</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span>Status</span>
                  <span className="py-1 px-2 border border-gray-400 rounded-full">
                    Active
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                <li
                  className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                    activeSection === "dashboard"
                      ? "border border-[#bce8fe] bg-[#f0f9ff]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("dashboard")}
                >
                  <HomeIcon size={14} />
                  <span className="text-sm">Dashboard</span>
                </li>
                <li
                  className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                    activeSection === "logbook"
                      ? "border border-[#bce8fe] bg-[#f0f9ff]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("logbook")}
                >
                  <BookOpen size={14} />
                  <span className="text-sm">Logbook</span>
                </li>
                <li
                  className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                    activeSection === "profile"
                      ? "border border-[#bce8fe] bg-[#f0f9ff]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("profile")}
                >
                  <User2 size={14} />
                  <span className="text-sm">Profile</span>
                </li>
                <li
                  className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                    activeSection === "notifications"
                      ? "border border-[#bce8fe] bg-[#f0f9ff]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("notifications")}
                >
                  <Bell size={14} />
                  <span className="text-sm">Notifications</span>
                </li>
                <li 
                  className="w-full rounded-lg py-2 px-3 text-red-500 flex items-center gap-2 cursor-pointer hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={14} />
                  <span className="text-sm">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      <section className="flex h-full text-black">
        <nav className="h-full bg-white max-w-xs px-4 py-1 md:block hidden">
          <div className="px-3 py-4 flex flex-col">
            <span>Ojt Tracking</span>
            <span className="text-xs text-gray-600">Ojt Tracking</span>
          </div>
          <div className="bg-blue-500 p-4 rounded-2xl text-xs">
            <div className="flex items-center gap-2">
              <div className="py-3 px-4 rounded-full bg-amber-400">IT</div>
              <div className="flex flex-col">
                <span className="text-sm">Student Name</span>
                <span>Student Course</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span>Status</span>
              <span className="py-1 px-2 border border-gray-400 rounded-full">
                Active
              </span>
            </div>
          </div>
          <div className="py-4">
            <ul className="flex flex-col items-start gap-3">
              <li
                className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                  activeSection === "dashboard"
                    ? "border border-[#bce8fe] bg-[#f0f9ff]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <HomeIcon size={14} />
                <span className="text-sm">Dashboard</span>
              </li>
              <li
                className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                  activeSection === "logbook"
                    ? "border border-[#bce8fe] bg-[#f0f9ff]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("logbook")}
              >
                <BookOpen size={14} />
                <span className="text-sm">Logbook</span>
              </li>
              <li
                className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                  activeSection === "profile"
                    ? "border border-[#bce8fe] bg-[#f0f9ff]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("profile")}
              >
                <User2 size={14} />
                <span className="text-sm">Profile</span>
              </li>
              <li
                className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                  activeSection === "notifications"
                    ? "border border-[#bce8fe] bg-[#f0f9ff]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("notifications")}
              >
                <Bell size={14} />
                <span className="text-sm">Notifications</span>
              </li>
              <li 
                className="w-full rounded-lg py-2 px-3 text-red-500 flex items-center gap-2 cursor-pointer hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut size={14} />
                <span className="text-sm">Logout</span>
              </li>
            </ul>
          </div>
        </nav>
        <section className="bg-[#f8fafc] flex-1 h-full overflow-y-auto">
          <section className="max-w-4xl bg-[#f8fafc] m-auto min-h-full py-4 px-3">
            {renderSection()}
          </section>
        </section>
      </section>
    </main>
  );
}
