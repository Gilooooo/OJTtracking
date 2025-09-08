import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileText,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Loading_Page from "@/_Component/Loading";
import Delete_Modal from "@/_Component/Modal/Deleting_Modal";

interface FileAttachment {
  name: string;
  type: string;
  data: string;
}

interface FormData {
  date: string;
  hours_worked: string;
  entry_type: string;
  title: string;
  description: string;
  attachments: FileAttachment[];
}

interface ProgressData {
  date: string;
  time: string;
  hours_worked: number;
  entry_type: string;
  title: string;
  description: string;
  tasks_completed: string[];
  attachments: FileAttachment[];
}

export default function NonStudent_LogBook() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<ProgressData | null>(null);
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState<string>("");
  const [logbookData, setLogBookData] = useState({});
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ProgressData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    date: "",
    hours_worked: "",
    entry_type: "daily",
    title: "",
    description: "",
    attachments: [],
  });
  //For Downloading File
  const downloadFile = (file: FileAttachment) => {
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  //For Deleting Log
  const handleDeleteLog = async () => {
    if (!selectedLog) return;
    try {
      const response = await fetch("/api/request/non_student/logbook_delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_add: session?.user?.email,
          title: selectedLog.title
        })
      });
      
      if (response.ok) {
        setDeleteModal(false);
        setSelectedLog(null);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };
  //For Lapse Time
  const getTimeElapsed = (date: string, time: string) => {
    const logDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diffMs = now.getTime() - logDateTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks > 0)
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
    if (diffMins > 0) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //Value added to holder
    const progress = {
      date: formData.date,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      hours_worked: parseInt(formData.hours_worked),
      entry_type: formData.entry_type,
      title: formData.title,
      description: formData.description,
      tasks_completed: tasks,
      attachments: formData.attachments,
    };
    //For Checking Request Body
    const requestBody = {
      email_add: session?.user?.email,
      account_type: "non-student",
      user_name: session?.user?.name,
      progress: progress,
    };

    try {
      //API Call PUT for adding log/updating log
      const response = await fetch("/api/request/non_student/logbook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setTasks([]);
        setFormData({
          date: "",
          hours_worked: "",
          entry_type: "daily",
          title: "",
          description: "",
          attachments: [],
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };
  //Filtering Logs by title
  const filterLogs = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (!searchValue.trim()) {
      setFilteredData(progressData);
      return;
    }
    const filtered = progressData.filter(
      (log) =>
        log.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        log.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // Fetch log book data
  const fetchData = useCallback(async () => {
    if (!session?.user?.email) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `/api/request/non_student/log_book_request?email_add=${session.user.email}`
      );
      const text = await response.text();
      if (!text) {
        setProgressData([]);
        setIsLoading(false);
        return;
      }
      const data = JSON.parse(text);
      if (response.ok) {
        setLogBookData(data);
        setProgressData(data.progress || []);
      } else {
        console.error("Error", data.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate total hours worked
  useEffect(() => {
    setTotalHours(
      progressData
        .map((log) => log.hours_worked)
        .reduce((curr, sec) => curr + sec, 0)
    );
    setFilteredData(progressData);
  }, [progressData]);

  if (isLoading) {
    return <Loading_Page />;
  }

  return (
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
          <span
            className="p-2 rounded-lg bg-[#dbeafe] text-[#3a77fc]"
            onClick={() => {
              console.log(logbookData);
              console.log(totalHours);
            }}
          >
            <FileText size={18} />
          </span>
          <h1 className="flex flex-col text-2xl font-bold">
            <span className="text-sm text-gray-500 font-light">Total Logs</span>
            {progressData.length}
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
            value={searchTerm}
            onChange={(e) => filterLogs(e.target.value)}
            placeholder="Search logs by title or description...."
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Log list */}
      {filteredData.map((log, indx) => (
        <div
          className="p-4 py-5 bg-white shadow-lg rounded-2xl space-y-2"
          key={indx}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs flex gap-2 items-center sm:flex-row flex-col">
              <div className="flex items-center gap-3">
                {/* Entry Type */}
                <p className=" bg-[#dbfce7] text-black shadow-sm px-2 p-1 rounded-2xl flex gap-2 items-center">
                  {log?.entry_type.charAt(0).toUpperCase() +
                    log?.entry_type.slice(1).toLowerCase()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Date Created */}
                <span className="text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {log?.date}
                </span>
                {/* Clock from date created */}
                <span className="text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {getTimeElapsed(log?.date, log?.time)}
                </span>
              </div>
            </div>
            {/* Functions */}
            <div className="flex gap-3 items-center">
              <Eye size={18} />
              <Edit size={18} />
              <Trash2
                size={18}
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  setSelectedLog(log);
                  setDeleteModal(true);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-xl ">{log?.title}</h1>
            <p className="text-xs text-gray-700 ">
              {/* Description */}
              {log?.description}
            </p>
            <div>
              <h4 className="text-xs">Task Completed:</h4>
              <div className="flex flex-col py-4 px-2 bg-[#f8fafc] shadow-lg rounded-md gap-1">
                {log.tasks_completed.map((info, indx) => (
                  <span
                    className="flex items-center text-xs text-gray-500 gap-3"
                    key={indx}
                  >
                    <CheckCircle size={12} className="text-[#2ab65e]" /> {info}
                  </span>
                ))}
              </div>
            </div>
            {log?.attachments?.length > 0 && (
              <>
                <h4 className="text-xs">Attachments:</h4>
                <div className="flex flex-wrap gap-2">
                  {log?.attachments?.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => downloadFile(file)}
                      className="py-1 px-2 text-xs flex items-center gap-2 border border-black rounded-full w-fit hover:bg-gray-100"
                    >
                      <FileText size={12} /> {file.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      {/* Log list */}
      {deleteModal && selectedLog && (
        <Delete_Modal
          onClose={() => {
            setDeleteModal(false);
            setSelectedLog(null);
          }}
          onConfirm={handleDeleteLog}
        />
      )}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-5">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Log</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hours Work
                  </label>
                  <input
                    type="number"
                    placeholder="8"
                    value={formData.hours_worked}
                    onChange={(e) =>
                      setFormData({ ...formData, hours_worked: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Entry Type
                </label>
                <select
                  value={formData.entry_type}
                  onChange={(e) =>
                    setFormData({ ...formData, entry_type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="daily">Daily Log</option>
                  <option value="weekly">Weekly Log</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter log title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your activities..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Task Completed
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTask}
                      onChange={(e) => setCurrentTask(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
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
                    <div className="space-y-1 bg-[#f8fafc] rounded-2xl p-3 text-[#8896a9]">
                      {tasks.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-[#60c787]">
                            <CheckCircle size={10} />
                          </span>
                          <span className="flex-1">{task}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setTasks(tasks.filter((_, i) => i !== index))
                            }
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
                <label className="block text-sm font-medium mb-1">
                  Attachment
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={async (e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      const fileAttachments = await Promise.all(
                        files.map(async (file) => {
                          const reader = new FileReader();
                          return new Promise<FileAttachment>((resolve) => {
                            reader.onload = () =>
                              resolve({
                                name: file.name,
                                type: file.type,
                                data: reader.result as string,
                              });
                            reader.readAsDataURL(file);
                          });
                        })
                      );
                      setFormData({
                        ...formData,
                        attachments: fileAttachments,
                      });
                    }
                  }}
                  className="w-full p-2 border rounded-lg text-sm"
                />
                {formData.attachments.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected files:{" "}
                    {formData.attachments.map((f) => f.name).join(", ")}
                  </div>
                )}
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
  );
}
