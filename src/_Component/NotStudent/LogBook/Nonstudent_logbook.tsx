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
  X,
  Upload,
} from "lucide-react";
import { useState } from "react";

export default function NonStudent_LogBook(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState("");
    return(
         <main className="text-black space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <h1 className="flex flex-col sm:text-2xl text-lg font-semibold">
          OJT Logbook
          <span className="sm:text-sm text-xs font-light">
            Track your daily activities and weekly progress
          </span>
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 xs:py-2 xs:px-3 p-2 bg-blue-500 rounded-lg text-white xs:text-sm text-[10px]"
        >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Log</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hours Work</label>
                  <input type="number" placeholder="8" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Entry Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="daily">Daily Log</option>
                  <option value="weekly">Weekly Log</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" placeholder="Enter log title" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Detailed Description</label>
                <textarea rows={2} placeholder="Describe your activities..." className="w-full p-2 border rounded-lg resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Task Completed</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={currentTask}
                      onChange={(e) => setCurrentTask(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (currentTask.trim()) {
                            setTasks([...tasks, currentTask.trim()]);
                            setCurrentTask("");
                          }
                        }
                      }}
                      placeholder="Add task and press Enter" 
                      className="flex-1 p-2 border rounded-lg" 
                    />
                  </div>
                  {tasks.length > 0 && (
                    <div className="space-y-1">
                      {tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span>•</span>
                          <span className="flex-1">{task}</span>
                          <button 
                            type="button"
                            onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop files here or</p>
                  <input type="file" multiple className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    Choose files
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
    )
}