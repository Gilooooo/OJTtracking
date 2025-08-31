import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
export default function Student_LogBook() {
  return (
    <main className="text-black space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <h1 className="flex flex-col sm:text-2xl text-lg font-semibold">
          OJT Logbook
          <span className="sm:text-sm text-xs font-light">
            Track your daily activities and weekly progress
          </span>
        </h1>
        <button className="flex items-center gap-2 xs:py-2 xs:px-3 p-2 bg-blue-500 rounded-lg text-white xs:text-sm text-[10px]">
          <Plus size={12} /> Add New Log
        </button>
      </div>
      <div className="flex sm:flex-row flex-col items-center gap-3">
        {/* Total Logs */}
        <div className="flex-1/3 p-3 py-4 shadow-lg rounded-2xl self-stretch flex items-center gap-4">
          <span className="p-2 rounded-lg bg-[#dbeafe] text-[#3a77fc]">
            <FileText size={18} />
          </span>
          <h1 className="flex flex-col text-2xl font-bold">
            <span className="text-sm text-gray-500 font-light">Total Logs</span>
            4
          </h1>
        </div>
        {/* Total Approved */}
        <div className="flex-1/3 p-3 py-4 shadow-lg rounded-2xl self-stretch flex items-center gap-4">
          <span className="p-2 rounded-lg bg-[#dbfce7] text-[#2ab65e]">
            <CheckCircle size={18} />
          </span>
          <h1 className="flex flex-col text-2xl font-bold">
            <span className="text-sm text-gray-500 font-light">Approved</span>3
          </h1>
        </div>
        {/* Total pending */}
        <div className="flex-1/3 p-3 py-4 shadow-lg rounded-2xl self-stretch flex items-center gap-4 ">
          <span className="p-2 rounded-lg bg-[#fef9c2] text-[#e2b44d]">
            <Clock size={18} />
          </span>
          <h1 className="flex flex-col text-2xl font-bold">
            <span className="text-sm text-gray-500 font-light">Pending</span>1
          </h1>
        </div>
      </div>
      {/* Search Log */}
      <div className="flex sm:flex-row flex-col items-center py-6 px-4 shadow-lg rounded-2xl gap-3 bg-white">
        <div className="py-2 px-3 bg-[#f3f3f5] flex items-center rounded-2xl sm:flex-3/4 gap-3 h-10 self-stretch">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search logs by title or description...."
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
        </div>
        <div className="flex items-center relative bg-[#f3f3f5] rounded-2xl py-2 px-3 sm:flex-1/4 h-10 self-stretch">
          <select className="text-sm focus:outline-none appearance-none pr-8 bg-transparent w-full">
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <span className="absolute right-2">
            <ChevronDown size={18} />
          </span>
        </div>
      </div>
      {/* Log list */}
      <div className="p-4 py-5 bg-white shadow-lg rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs flex gap-2 items-center sm:flex-row flex-col">
            <div className="flex items-center gap-3">
              {/* Approval */}
              <p className=" bg-[#dbfce7] text-[#2ab65e] px-2 p-1 rounded-2xl flex gap-2 items-center">
                <CheckCircle size={12} /> Approved
              </p>
              {/* Entry Type */}
              <p className=" bg-white text-black border border-gray-300 px-2 p-1 rounded-2xl flex gap-2 items-center">
                Daily Log
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Created */}
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                2025-08-05
              </span>
              {/* Clock from date created */}
              <span className="text-gray-400 flex items-center gap-1">
                <Clock size={12} />8 hrs ago
              </span>
            </div>
          </div>
          {/* Functions */}
          <div className="flex gap-3 items-center">
            <Eye size={18} />
            <Edit size={18} />
            <Trash2 size={18} className="text-red-500" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h1 className="text-xl ">Frontend Development Tasks</h1>
          <p className="text-xs text-gray-700 ">
            {/* Description */}
            Worked on React components for the user dashboard. Implemented
            responsive design and added form validation. Fixed several UI bugs
            reported by the testing team.
          </p>
          <h4 className="text-xs">Task Completed:</h4>
          <div className="flex flex-col py-4 px-2 bg-[#f8fafc] shadow-lg rounded-md gap-1">
            <span className="flex items-center text-xs text-gray-500 gap-3">
              <CheckCircle size={12} className="text-[#2ab65e]" /> Created user
              dashboard components
            </span>
            <span className="flex items-center text-xs text-gray-500 gap-3">
              <CheckCircle size={12} className="text-[#2ab65e]" /> Implemented
              responsive design
            </span>
            <span className="flex items-center text-xs text-gray-500 gap-3">
              <CheckCircle size={12} className="text-[#2ab65e]" /> Added form
              validation
            </span>
          </div>
          <h4 className="text-xs">Supervisor Feedback:</h4>
          <blockquote className="py-4 px-3 bg-[#dbeafe] text-[#3a77fc] shadow-lg rounded-md text-xs">&quot; Excellent work on the dashboard components. The responsive design looks great! &quot;</blockquote>
          <h4 className="text-xs">Attachments:</h4>
          <span className="py-1 px-2 text-xs flex items-center gap-2 border border-black rounded-full w-fit"><FileText size={12}/> daily-report-jan15.pdf</span>
        </div>
      </div>
       {/* Log list */}
      <div className="p-4 py-5 bg-white shadow-lg rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs flex gap-2 items-center sm:flex-row flex-col">
            <div className="flex items-center gap-3">
              {/* Approval */}
              <p className=" bg-[#fef9c2] text-[#e2b44d] px-2 p-1 rounded-2xl flex gap-2 items-center">
                <CheckCircle size={12} /> Pending
              </p>
              {/* Entry Type */}
              <p className=" bg-white text-black border border-gray-300 px-2 p-1 rounded-2xl flex gap-2 items-center">
                Daily Log
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Created */}
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                2025-08-05
              </span>
              {/* Clock from date created */}
              <span className="text-gray-400 flex items-center gap-1">
                <Clock size={12} />8 hrs ago
              </span>
            </div>
          </div>
          {/* Functions */}
          <div className="flex gap-3 items-center">
            <Eye size={18} />
            <Edit size={18} />
            <Trash2 size={18} className="text-red-500" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h1 className="text-xl ">Frontend Development Tasks</h1>
          <p className="text-xs text-gray-700 ">
            {/* Description */}
            Worked on React components for the user dashboard. Implemented
            responsive design and added form validation. Fixed several UI bugs
            reported by the testing team.
          </p>
          <h4 className="text-xs">Task Completed:</h4>
          <div className="flex flex-col py-4 px-2 bg-[#f8fafc] shadow-lg rounded-md gap-1">
            <span className="flex items-center text-xs text-gray-500 gap-3">
              <CheckCircle size={12} className="text-[#2ab65e]" /> Created user
              dashboard components
            </span>
            <span className="flex items-center text-xs text-gray-500 gap-3">
              <CheckCircle size={12} className="text-[#2ab65e]" /> Implemented
              responsive design
            </span>
            <span className="flex items-center text-xs text-gray-500 gap-3">
              <CheckCircle size={12} className="text-[#2ab65e]" /> Added form
              validation
            </span>
          </div>
          <h4 className="text-xs">Attachments:</h4>
          <span className="py-1 px-2 text-xs flex items-center gap-2 border border-black rounded-full w-fit"><FileText size={12}/> daily-report-jan15.pdf</span>
        </div>
      </div>
    </main>
  );
}
