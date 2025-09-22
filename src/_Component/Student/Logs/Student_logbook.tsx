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
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStudentStore } from "@/store/useStudentStore";
import SuccessModal from "@/_Component/Modal/Success_Modal";
import LogbookModal from "@/_Component/Modal/Logbook_Modal";
import Loading_Page from "@/_Component/Loading/Loading";

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
  title?: string;
  date?: string;
  time?: string;
  hours_worked?: number;
  entry_type?: string;
  description?: string;
  tasks_completed?: string[];
  status?: string;
  attachments?: FileAttachment[];
}

export default function Student_LogBook() {
  const { data: session } = useSession();
  const {
    userInfo,
    rooms,
    isLoading,
    progressData,
    fetchEnrolledRooms,
    fetchProgressData,
  } = useStudentStore();
  const [modalAppear, setModalAppear] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showLogbook, setShowLogbook] = useState<boolean>(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<ProgressData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    date: "",
    hours_worked: "",
    entry_type: "daily",
    title: "",
    description: "",
    attachments: [],
  });

  const handleModalAppear = () => {
    setModalAppear(!modalAppear);
    setErrorMessage("");
    setRoomCode("");
  };

  const downloadFile = (file: FileAttachment) => {
    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (roomCode.length !== 5) {
      setErrorMessage("Length");
      return;
    }
    try {
      const response = await fetch("/api/request/Room/Enroll_room", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode,
          studentData: {
            id: session?.user?.id,
            name: session?.user?.name,
            email: session?.user?.email,
            phone: session?.user?.phone,
            student_id: userInfo.student_id,
            course: userInfo.course,
            school: userInfo.school,
            year_level: userInfo.year_level,
            hours_required: userInfo.hours_required,
          },
        }),
      });
      if (response.ok) {
        setModalAppear(false);
        setShowSuccess(true);
        fetchEnrolledRooms(
          userInfo?.student_id?.trim() || "",
          session?.user.name || ""
        );
      } else {
        setErrorMessage("Room");
      }
    } catch (error) {
      console.error("Error enrolling in room:", error);
    }
  };

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    try {
      const response = await fetch("/api/request/LogBookRequest/logbook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: session?.user?.username,
          email_add: session?.user?.email,
          roomcode: rooms[0]?.room_code || null,
          status: "pending",
          account_type: "student",
          progress: progress,
        }),
      });

      if (response.ok) {
        setIsLogModalOpen(false);
        setFormData({
          date: "",
          hours_worked: "",
          entry_type: "daily",
          title: "",
          description: "",
          attachments: [],
        });
        setTasks([]);
        fetchProgressData(session?.user.email || "");
      }
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };

  const filterLogs = (
    searchValue: string,
    statusValue: string = statusFilter
  ) => {
    setSearchTerm(searchValue);

    let filtered = progressData;

    if (searchValue.trim()) {
      filtered = filtered.filter(
        (log) =>
          log.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          log.description?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (statusValue !== "all") {
      filtered = filtered.filter((log) => log.status === statusValue);
    }
    setFilteredData(filtered);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterLogs(searchTerm, status);
  };

  useEffect(() => {
    if (showLogbook && session?.user?.email) {
      fetchProgressData(session.user.email);
    }
  }, [showLogbook, session?.user?.email, fetchProgressData]);

  useEffect(() => {
    setFilteredData(progressData);
  }, [progressData]);

  if (isLoading) {
    return <Loading_Page />;
  }

  // Show logbook when room is clicked
  if (showLogbook && rooms.length > 0) {
    return (
      <main className="text-black space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <button
              onClick={() => setShowLogbook(false)}
              className="text-blue-500 text-sm mb-2 hover:underline"
            >
              ← Back to Room
            </button>
            <h1
              className="flex flex-col sm:text-2xl text-lg font-semibold"
              onClick={() => console.log(progressData)}
            >
              OJT Logbook
              <span className="sm:text-sm text-xs font-light">
                Track your daily activities and weekly progress
              </span>
            </h1>
          </div>
          <button
            onClick={() => setIsLogModalOpen(true)}
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
              <span className="text-sm text-gray-500 font-light">
                Total Logs
              </span>
              {progressData.length}
            </h1>
          </div>
          {/* Total Approved */}
          <div className="flex-1/3 p-3 py-4 shadow-lg rounded-2xl self-stretch flex items-center gap-4">
            <span className="p-2 rounded-lg bg-[#dbfce7] text-[#2ab65e]">
              <CheckCircle size={18} />
            </span>
            <h1 className="flex flex-col text-2xl font-bold">
              <span className="text-sm text-gray-500 font-light">Approved</span>
              {progressData.reduce(
                (count, log) => (log.status === "approved" ? count + 1 : count),
                0
              )}
            </h1>
          </div>
          {/* Total pending */}
          <div className="flex-1/3 p-3 py-4 shadow-lg rounded-2xl self-stretch flex items-center gap-4 ">
            <span className="p-2 rounded-lg bg-[#fef9c2] text-[#e2b44d]">
              <Clock size={18} />
            </span>
            <h1 className="flex flex-col text-2xl font-bold">
              <span className="text-sm text-gray-500 font-light">Pending</span>
              {progressData.reduce(
                (count, log) => (log.status === "pending" ? count + 1 : count),
                0
              )}
            </h1>
          </div>
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
          <div className="flex items-center relative bg-[#f3f3f5] rounded-2xl py-2 px-3 sm:flex-1/4 h-10 self-stretch">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="text-sm focus:outline-none appearance-none pr-8 bg-transparent w-full"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
            <span className="absolute right-2">
              <ChevronDown size={18} />
            </span>
          </div>
        </div>
        {/* Log list */}
        {filteredData.map((log, index) => (
          <div
            key={index}
            className="p-4 py-5 bg-white shadow-lg rounded-2xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs flex gap-2 items-center sm:flex-row flex-col">
                <div className="flex items-center gap-3">
                  <p className="bg-[#fef9c2] text-[#e2b44d] px-2 p-1 rounded-2xl flex gap-2 items-center">
                    <Clock size={12} />{" "}
                    {log.status
                      ? log.status.charAt(0).toUpperCase() + log.status.slice(1)
                      : "No Status"}
                  </p>
                  <p className="bg-white text-black border border-gray-300 px-2 p-1 rounded-2xl">
                    {log.entry_type
                      ? log.entry_type.charAt(0).toUpperCase() +
                        log.entry_type.slice(1)
                      : "No Entry Type"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {log.date}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {log.time}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Eye size={18} />
                <Edit size={18} />
                <Trash2 size={18} className="text-red-500" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-xl">{log.title}</h1>
              <p className="text-xs text-gray-700">{log.description}</p>
              <h4 className="text-xs">Task Completed:</h4>
              <div className="flex flex-col py-4 px-2 bg-[#f8fafc] shadow-lg rounded-md gap-1">
                {log.tasks_completed?.map((task, idx) => (
                  <span
                    key={idx}
                    className="flex items-center text-xs text-gray-500 gap-3"
                  >
                    <CheckCircle size={12} className="text-[#2ab65e]" /> {task}
                  </span>
                ))}
              </div>
            </div>
            {log?.attachments?.length && (
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
        ))}
        <LogbookModal
          isOpen={isLogModalOpen}
          isEditing={false}
          formData={formData}
          tasks={tasks}
          currentTask={currentTask}
          onClose={() => setIsLogModalOpen(false)}
          onSubmit={handleLogSubmit}
          onFormDataChange={setFormData}
          onTasksChange={setTasks}
          onCurrentTaskChange={setCurrentTask}
        />
      </main>
    );
  }

  return (
    <main>
      <div className="relative">
        {rooms.length == 0 && (
          <button
            className="flex items-center py-2 px-3 rounded-2xl shadow-lg gap-2 text-md"
            onClick={handleModalAppear}
          >
            <Plus size={12} /> Join Room
          </button>
        )}

        {modalAppear && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Joining Room</h2>
                <button
                  onClick={() => setModalAppear(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Room Code
                  </label>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => {
                      setRoomCode(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Ask for code to your supervisor"
                    className="w-full py-2 px-3 border rounded-lg focus:outline-none"
                    maxLength={5}
                  />
                  {errorMessage === "Length" && (
                    <span className="text-red-500 text-xs mt-1 block">
                      Room Code must be exactly 5 characters
                    </span>
                  )}
                  {errorMessage === "Room" && (
                    <span className="text-red-500 text-xs mt-1 block">
                      Room Code does not exist
                    </span>
                  )}
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalAppear(false)}
                    className="flex-1 py-1 px-3 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? "Joining..." : "Join Room"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Room Display */}
      {rooms.length > 0 && rooms[0] && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-4">My OJT Room</h3>
          <div
            className="bg-white rounded-lg shadow-lg p-6 border cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setShowLogbook(true)}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-medium text-gray-800">
                {rooms[0].room_name?.trim()}
              </h4>
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {rooms[0].room_code?.trim()}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              {rooms[0].room_description?.trim()}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700 block mb-1">
                    Company
                  </span>
                  <p className="text-gray-800">
                    {rooms[0].company?.trim() || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700 block mb-1">
                    Location
                  </span>
                  <p className="text-gray-800">
                    {rooms[0].company_location?.trim() || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700 block mb-1">
                    Supervisor
                  </span>
                  <p className="text-gray-800">
                    {rooms[0].supervisor_name?.trim() || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700 block mb-1">
                    Contact Email
                  </span>
                  <p className="text-gray-800 break-all">
                    {rooms[0].supervisor_email?.trim() || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-blue-600">
              Click to view logbook →
            </div>
          </div>
        </section>
      )}

      {showSuccess && (
        <SuccessModal
          title="Successfully Joined!"
          message="You have successfully joined the room."
          onClose={() => setShowSuccess(false)}
        />
      )}
    </main>
  );
}
