import { useNonStudentStore } from "@/store/useNonStudentstore";
import { useStudentStore } from "@/store/useStudentStore";
import { useSupervisorStore } from "@/store/useSupervisor";
import {
  Bell,
  BookOpen,
  HomeIcon,
  LogOut,
  Menu,
  User2,
  Users2,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";

interface MobileNavBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
  setIsComponentLoading?: (loading: boolean) => void;
}

export default function MobileNavBar({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  setActiveSection,
  handleLogout,
  setIsComponentLoading,
}: MobileNavBarProps) {
  const handleSectionChange = (section: string) => {
    setIsMenuOpen(false);
    if (setIsComponentLoading) {
      setIsComponentLoading(true);
      setTimeout(() => {
        setActiveSection(section);
        setIsComponentLoading(false);
      }, 300);
    } else {
      setActiveSection(section);
    }
  };
  const { data: session } = useSession();
  const studentStore = useStudentStore();
  const supervisorStore = useSupervisorStore();
  const nonStudentStore = useNonStudentStore();

  const getUserData = () => {
    switch (session?.user?.role) {
      case "student":
        return {
          role: "Student",
          course: studentStore.userInfo.course,
          isLoading: studentStore.isLoading,
        };
      case "supervisor":
        return {
          role: "Supervisor",
          company: supervisorStore.userInfo.company,
          isLoading: supervisorStore.isLoading,
        };
      case "non-student":
        return {
          role: "Non student",
          isLoading: nonStudentStore.isLoading,
        };
      default:
        return { isLoading: false };
    }
  };

  const userData = getUserData();


  return (
    <>
      <nav className="md:hidden bg-white w-full text-black  ">
        <div className="flex items-center justify-between p-4">
          <div className="flex-col flex">
            <span className="font-semibold">OJT Tracking</span>
            <span className="text-xs text-gray-600">
              {userData.role} Portal
            </span>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50">
            <div className="p-4">
              <div className="bg-radial from-[#3a77fc] from-50% to-[#dbeafe] p-4 rounded-2xl text-xs mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-lg">{session?.user?.name}</span>
                    {session?.user.role === "supervisor" || "student" ? (
                      <span className="text-xs text-gray-700">
                        {userData.company || userData.course}
                      </span>
                    ) : (
                      <span className="text-xs">Non Student</span>
                    )}
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
                  onClick={() => handleSectionChange("dashboard")}
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
                  onClick={() => handleSectionChange("logbook")}
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
                  onClick={() => handleSectionChange("profile")}
                >
                  <User2 size={14} />
                  <span className="text-sm">Profile</span>
                </li>
                {session?.user.role === "supervisor" && (
                  <>
                    <li
                      className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                        activeSection === "room"
                          ? "border border-[#bce8fe] bg-[#f0f9ff]"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSectionChange("room")}
                    >
                      <Users2 size={14} />
                      <span className="text-sm">Room</span>
                    </li>
                  </>
                )}
                {session?.user.role !== "non-student" && (
                  <>
                    <li
                      className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                        activeSection === "notifications"
                          ? "border border-[#bce8fe] bg-[#f0f9ff]"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSectionChange("notifications")}
                    >
                      <Bell size={14} />
                      <span className="text-sm">Notifications</span>
                    </li>
                  </>
                )}
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
