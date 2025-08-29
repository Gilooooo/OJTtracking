import { Bell, BookOpen, HomeIcon, LogOut, Menu, User2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface MobileNavBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
}

export default function MobileNavBar({ isMenuOpen, setIsMenuOpen, activeSection, setActiveSection,  handleLogout }: MobileNavBarProps) {
  const { data: session } = useSession();
  const [initialName , setInitialName] = useState<string>("");

  const InitialNaming = () => {
    const name = session?.user?.name?.trim();
    const t = name?.split(" ")
    setInitialName((t?.[0]?.[0] || '') + (t?.[1]?.[0] || ''))
  }
  useEffect(() =>{
    InitialNaming();
  })

  return (
    <>
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
                  <div className="h-14 w-14 rounded-full bg-amber-400 flex items-center justify-center">{initialName}</div>
                  <div className="flex flex-col">
                    <span className="text-sm">{session?.user?.name}</span>
                    {session?.user?.role.trim() == "student" ? <span>Student Course</span>: null}
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
    </>
  );
}
