import { Bell, BookOpen, HomeIcon, LogOut, User2, Users2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface NavBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  handleLogout: () => void;
}

interface Information {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface Data {
  studentCourse?: string;
  company?: string;
}

export default function NavBar({
  activeSection,
  setActiveSection,
  handleLogout,
}: NavBarProps) {
  const { data: session } = useSession();
  const [information, setInformation] = useState<Information>({});
  const [additionalInfo, setAdditionalInfo] = useState<Data>({});
  const [initialName, setInitialName] = useState<string>("");
  const capitalizeFirst = () =>
    information.role
      ? information.role[0].toUpperCase() + information.role.slice(1)
      : "";

  useEffect(() => {
    const name = session?.user?.name;
    const t = name?.split(" ");
    setInitialName((t?.[0]?.[0] || "") + (t?.[1]?.[0] || ""));
    const fetchData = async () => {
      try {
        if (session?.user?.role == "student") {
          const response = await fetch(
            `/api/request/student/info?id=${session?.user?.id}`
          );
          const data = await response.json();
          if (response.ok) {
            setAdditionalInfo({ studentCourse: data?.course });
          } else {
            console.error("Error:", data.error);
          }
        } else if (session?.user?.role == "supervisor") {
          const response = await fetch(
            `/api/request/supervisor?id=${session?.user?.id}`
          );
          const data = await response.json();
          if (response.ok) {
            setAdditionalInfo({ company: data?.company });
          } else {
            console.error("Error:", data.error);
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
    setInformation({
      id: session?.user?.id || undefined,
      name: session?.user?.name || undefined,
      email: session?.user?.email || undefined,
      role: session?.user?.role || undefined,
    });
  }, [session]);

  return (
    <>
      <nav className="h-full bg-white max-w-xs px-4 py-1 md:block hidden">
        <div className="px-3 py-4 flex flex-col">
          <span>Ojt Tracking</span>
          <span className="text-xs text-gray-600">
            {capitalizeFirst()} Portal
          </span>
        </div>
        <div className="bg-blue-500 p-4 rounded-2xl text-xs">
          <div className="flex items-center gap-2">
            <div
              className="h-14 w-14 flex items-center justify-center rounded-full bg-amber-400"
              onClick={() => console.log(additionalInfo)}
            >
              {initialName}
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{information.name}</span>
              {information.role === "supervisor" || "student" ? (
                <span className="text-xs">
                  {additionalInfo.company || additionalInfo.studentCourse}
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
            {session?.user.role === "non-student" ? (
              ""
            ) : (
              <>
                <li
                  className={`w-full rounded-lg py-2 px-3 text-black flex items-center gap-2 cursor-pointer ${
                    activeSection === "room"
                      ? "border border-[#bce8fe] bg-[#f0f9ff]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("room")}
                >
                  <Users2 size={14} />
                  <span className="text-sm">Room</span>
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
