import { Bell, BookOpen, HomeIcon, User2 } from "lucide-react";
import DashboardSection from "./dashboardsection";

export default function Dashboard() {
  return (
    <main className="w-full h-screen">
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
              <li className="border border-[#bce8fe] bg-[#f0f9ff] w-full rounded-lg py-2 px-3 text-black flex items-center gap-2">
                <HomeIcon size={14} />
                <span className="text-sm">Dashboard</span>
              </li>
              <li className="flex items-center gap-2 py-2 px-3">
                <BookOpen size={14}/>
                <span className="text-sm">Logbook</span>
              </li>
              <li className="flex items-center gap-2 py-2 px-3">
                <User2 size={14}/>
                <span className="text-sm">Profile</span>
              </li>
              <li className="flex items-center gap-2 py-2 px-3">
                <Bell size={14}/>
                <span className="text-sm">Notifications</span>
              </li>
            </ul>
          </div>
        </nav>
        <section className="bg-[#f8fafc] flex-1 h-full overflow-y-auto">
          <DashboardSection/>
        </section>
      </section>
    </main>
  );
}
