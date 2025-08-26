import {
  Bell,
  ChevronDown,
  CircleCheckBig,
  Clock,
  Filter,
  Star,
  Trash2,
} from "lucide-react";

export default function Notification() {
  return (
    <main className="text-black space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="flex items-center gap-2 sm:text-3xl text-lg font-semibold pb-3">
            <Bell size={26} className="text-[#0084d1]" />
            Notifications
          </h1>
          <span className="text-xs text-gray-600">
            Stay updated with supervisor feedback, approvals, and system updates
          </span>
        </div>
        <div>
          <button className="flex items-center bg-white border border-gray-400 rounded-lg py-1 px-3 text-sm gap-2">
            <CircleCheckBig size={14} /> Mark All Read
          </button>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center gap-2">
        <div className="p-4 shadow-lg flex gap-2 items-center rounded-xl flex-1 self-stretch">
          <span className="p-2 rounded-md bg-[#ffe7e7] text-[#e91721]">
            <Bell size={18} />
          </span>{" "}
          <h1 className="text-lg flex flex-col">
            <span className="text-gray-500 text-sm">Unread</span> 4
          </h1>
        </div>
        <div className="p-4 shadow-lg flex gap-2 items-center rounded-xl flex-1 self-stretch">
          <span className="p-2 rounded-md bg-[#dbeafe] text-[#2165fc]">
            <Star size={18} />
          </span>{" "}
          <h1 className="text-lg flex flex-col">
            <span className="text-gray-500 text-sm">Feedback</span> 3
          </h1>
        </div>
        <div className="p-4 shadow-lg flex gap-2 items-center rounded-xl flex-1 self-stretch">
          <span className="p-2 rounded-md bg-[#dbfce7] text-[#2ab65e]">
            <CircleCheckBig size={18} />
          </span>{" "}
          <h1 className="text-lg flex flex-col">
            <span className="text-gray-500 text-sm">Approvals</span> 1
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2 py-4 px-5 rounded-2xl shadow-lg">
        <Filter size={12} />
        <div className="flex items-center relative bg-[#f3f3f5] rounded-2xl py-2 px-3 h-10">
          <select className="text-xs focus:outline-none appearance-none pr-8 bg-transparent w-full">
            <option value="all">All Notifications</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <span className="absolute right-2">
            <ChevronDown size={18} />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* Notifications */}
        <div className="py-4 px-5 shadow-lg rounded-2xl flex  gap-2 border-2 border-[#b8e6fe]">
          <span className="bg-[#dbeafe] text-[#2165fc] p-2 rounded-md flex items-center w-fit h-fit">
            <Star size={18} />
          </span>
          <div className="w-full flex-col flex">
            <div className="flex items-center justify-between">
              <h1 className="text-md">Supervisor Feedback</h1>
              <span className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={12} /> 2 hours ago
              </span>
            </div>
            <p className="text-xs py-3">
              John Smith has provided feedback on your daily log from January
              15th: &quot;Excellent work on the React components. Your attention
              to detail in the responsive design is commendable. Keep up the
              great work!&quot;
            </p>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-3"> 
                <span className="py-2 px-3 rounded-full bg-gray-500">IM</span>
                <h1 className="flex flex-col text-xs">
                  Iron Man<span className="text-gray-500">Supervisor</span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-xs hover:shadow-lg py-1 px-3 rounded-2xl">
                  <CircleCheckBig size={12} />
                  Mark as read
                </button>
                <Trash2 size={18} className="text-red-500 hover:shadow-lg" />
              </div>
            </div>
          </div>
        </div>

         <div className="py-4 px-5 shadow-lg rounded-2xl flex  gap-2 border-2 border-[#b8e6fe]">
          <span className="bg-[#dbeafe] text-[#2165fc] p-2 rounded-md flex items-center w-fit h-fit">
            <Star size={18} />
          </span>
          <div className="w-full flex-col flex">
            <div className="flex items-center justify-between">
              <h1 className="text-md">Supervisor Feedback</h1>
              <span className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={12} /> 2 hours ago
              </span>
            </div>
            <p className="text-xs py-3">
              John Smith has provided feedback on your daily log from January
              15th: &quot;Excellent work on the React components. Your attention
              to detail in the responsive design is commendable. Keep up the
              great work!&quot;
            </p>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-3"> 
                <span className="py-2 px-3 rounded-full bg-gray-500">IM</span>
                <h1 className="flex flex-col text-xs">
                  Iron Man<span className="text-gray-500">Supervisor</span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-xs hover:shadow-lg py-1 px-3 rounded-2xl">
                  <CircleCheckBig size={12} />
                  Mark as read
                </button>
                <Trash2 size={18} className="text-red-500 hover:shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
