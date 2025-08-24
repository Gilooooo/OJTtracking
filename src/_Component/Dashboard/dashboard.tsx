import { Bell, BookOpen, HomeIcon, User2 } from "lucide-react";
import DashboardSection from "./dashboardsection";

export default function Dashboard() {
  return (
    <main className="w-full h-screen">
      <section className="flex h-full">
        <nav className="h-full bg-amber-600 max-w-xs px-4 py-1">
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
              <li className="border border-black bg-white w-full rounded-lg py-2 px-3 text-black flex items-center gap-2">
                <HomeIcon size={18} />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen />
                <span>Logbook</span>
              </li>
              <li className="flex items-center gap-2">
                <User2 />
                <span>Profile</span>
              </li>
              <li className="flex items-center gap-2">
                <Bell />
                <span>Notifications</span>
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
