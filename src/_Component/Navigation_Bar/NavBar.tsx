import { useNonStudentStore } from "@/store/useNonStudentstore";
import { useStudentStore } from "@/store/useStudentStore";
import { useSupervisorStore } from "@/store/useSupervisor";
import { Bell, BookOpen, HomeIcon, LogOut, User2, Users2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
  setIsComponentLoading?: (loading: boolean) => void;
}

export default function NavBar({
  activeSection,
  setActiveSection,
  handleLogout,
  setIsComponentLoading,
}: NavBarProps) {
  const handleSectionChange = (section: string) => {
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
  const [initialName, setInitialName] = useState<string>("");
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

  useEffect(() => {
    // Initial Name Function
    const InitialNaming = () => {
      const name = session?.user?.name?.trim();
      const t = name?.split(" ");
      setInitialName((t?.[0]?.[0] || "") + (t?.[1]?.[0] || ""));
    };
    InitialNaming();
  }, [session]);

  return (
    <>
      <nav className="h-full bg-white min-w-xs px-4 py-1 md:block hidden">
        <div className="px-3 py-4 flex flex-col">
          <span>Ojt Tracking</span>
          <span className="text-xs text-gray-600">{userData.role} Portal</span>
        </div>
        <div className="bg-radial from-[#3a77fc] from-50% to-[#dbeafe] p-4 rounded-2xl text-xs shadow">
          <div className="flex items-center gap-2">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#dbeafe]/30">
              {initialName}
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{session?.user.name}</span>
              {session?.user.role === "supervisor" || "student" ? (
                <span className="text-xs">
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
        <div className="py-4">
          <ul className="flex flex-col items-start gap-3">
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
      </nav>
    </>
  );
}
