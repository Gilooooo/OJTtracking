import Loading_Page from "@/_Component/Loading/Loading";
import { useStudentStore } from "@/store/useStudentStore";
import Alert_Modal from "@/_Component/Modal/Alert_Modal";
import {
  Award,
  Building,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  GraduationCap,
  Mail,
  Phone,
  TrendingUp,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import SuccessModal from "@/_Component/Modal/Success_Modal";

interface studentProfileProps {
  handleLogout: () => void;
}

export default function Student_Profile({ handleLogout }: studentProfileProps) {
  const { data: session } = useSession();
  const [initialName, setInitialName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [academicDropdown, setAcademicDropdown] = useState<boolean>(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<string>("");
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<boolean>(false);

  const [achievementsDropdown, setAchievementsDropdown] =
    useState<boolean>(false);
  const {
    userInfo,
    enrolledDate,
    progressData,
    logTotals,
    rooms,
    isLoading,
    fetchEnrolledRooms,
  } = useStudentStore();

  const progressPercentage = useMemo(
    () =>
      (((logTotals.total || 0) / (userInfo.hours_required || 1)) * 100).toFixed(
        2
      ),
    [userInfo.hours_required, logTotals.total]
  );

  const progressRemaining = useMemo(
    () => (userInfo.hours_required || 0) - (logTotals.total || 0),
    [userInfo.hours_required, logTotals.total]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const profileData = {
      username: session?.user?.username,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      student_id: userInfo?.student_id,
      course: formData.get("course") as string,
      school: formData.get("school") as string,
      yearlevel: formData.get("yearLevel") as string,
      gwa: parseFloat(formData.get("gwa") as string) || 0,
      achievements: achievements,
    };
    console.log(profileData);
    try {
      const response = await fetch("/api/request/student/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setSuccessModal(true);
        setIsModalOpen(false);
        setTimeout(() => {
          setSuccessModal(false);
          handleLogout();
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    // Initial Name Function
    const InitialNaming = () => {
      const name = session?.user?.name?.trim();
      const t = name?.split(" ");
      setInitialName((t?.[0]?.[0] || "") + (t?.[1]?.[0] || ""));
    };
    InitialNaming();
  }, [session]);

  useEffect(() => {
    if (userInfo.student_id && session?.user?.name) {
      fetchEnrolledRooms(userInfo.student_id.trim(), session.user.name);
    }
  }, [userInfo.student_id, session?.user?.name, fetchEnrolledRooms]);

  if (isLoading) {
    return <Loading_Page />;
  }

  return (
    <main className="text-black space-y-3.5">
      <div className="flex items-center justify-between">
        <h1
          className="flex flex-col sm:text-2xl text-lg font-semibold"
          onClick={() => console.log(userInfo)}
        >
          My Profile
          <span className="sm:text-sm text-xs font-light">
            Manage your personal information and OJT details
          </span>
        </h1>
        <button
          onClick={() => setAlertModal(true)}
          className="flex items-center gap-2 xs:py-2 xs:px-3 p-2 bg-blue-500 rounded-lg text-white xs:text-sm text-[10px]"
        >
          <Edit size={12} /> Edit profile
        </button>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col flex-1/3 gap-4">
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            {/* Profile Picture */}
            <div className="h-20 w-20 rounded-full bg-amber-400 flex items-center justify-center">
              {initialName}
            </div>
            {/* Full Name */}
            <h1 className="text-center mt-4 font-semibold text-lg">
              {session?.user.name}
            </h1>
            {/* Course */}
            <span className="text-gray-500 text-sm text-center">
              {userInfo?.course}
            </span>
            {/* Student id if applicable */}
            <span className="text-xs ">
              Student ID : {userInfo?.student_id}
            </span>
            <span className="py-1 px-2 bg-[#dbeafe] text-[#3a77fc] rounded-lg text-xs mt-4">
              Active
            </span>
            <div className="mt-4 border-t border-gray-300 w-full pt-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-gray-400" />
                <span className="text-xs flex flex-col items-start text-gray-400">
                  Email
                  <span className="text-black font-semibold">
                    {session?.user.email}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-gray-400" />
                <span className="text-xs flex flex-col items-start text-gray-400">
                  Phone
                  <span className="text-black font-semibold">
                    +63 {session?.user.phone?.slice(1, 10)}
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* Academic Info */}
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            <h1 className="flex items-center gap-2 w-full text-lg">
              <GraduationCap size={18} className="text-[#3a77fc]" /> Academic
              Information
            </h1>
            <div className="w-full pt-4 flex flex-col gap-4">
              <span className="text-xs flex flex-col items-start text-gray-400">
                School
                <span className="text-black font-semibold">
                  {userInfo?.school}
                </span>
              </span>
              <span className="text-xs flex flex-col items-start text-gray-400">
                Course
                <span className="text-black font-semibold">
                  {userInfo?.course}
                </span>
              </span>
              <span className="text-xs flex flex-col items-start text-gray-400">
                Year Level
                <span className="text-black font-semibold">
                  {userInfo?.year_level}
                </span>
              </span>
              {userInfo?.gwa ? (
                <span className="text-xs flex flex-col items-start text-gray-400">
                  Year Level
                  <span className="text-black font-semibold">
                    {userInfo?.gwa}
                  </span>
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Achivements */}
          {userInfo?.achievements ? (
            <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
              <h1 className="flex items-center gap-2 w-full text-lg">
                <Award size={18} className="text-[#3a77fc]" /> Achievements
              </h1>
              <div className="w-full pt-4 flex flex-col gap-2">
                {userInfo?.achievements.map((name, key) => (
                  <div
                    className="flex items-center gap-2 py-2 px-3 bg-[#f3f3f5] rounded-lg"
                    key={key}
                  >
                    <span className="p-2 bg-[#2b7fff] text-white rounded-lg">
                      <TrendingUp size={12} />
                    </span>
                    <div className="text-xs flex flex-col">
                      <span className="font-semibold">{name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Progress */}
        <div className="flex flex-col flex-2/3 gap-4">
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            <div className="flex flex-col w-full">
              <h1 className="flex items-center gap-2 text-lg">
                <Clock size={18} className="text-[#3a77fc]" /> Academic OJT
                Progress
              </h1>
              <span className="text-xs text-gray-500">
                Track your internship hours and milestones
              </span>
            </div>
            {/* Progress bar */}
            <div className="flex justify-between items-center self-stretch">
              {/* Total hours required */}
              <div className="flex flex-col self-end">
                <p className="xs:text-md text-sm">Total Hours Completed</p>
                <p className="xs:text-sm text-xs">
                  {40} of {userInfo?.hours_required || 0} required hours
                </p>
              </div>
              {/* Progress in percentage */}
              <div className="text-end">
                <p className="xs:text-2xl text-lg font-semibold text-blue-600">
                  {progressPercentage}%
                </p>
                <p className="xs:text-sm text-xs">
                  {progressRemaining} hours remaining
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 my-2">
              <div
                className="bg-black h-4 rounded-full"
                style={{
                  width: `${(
                    ((logTotals.total || 0) / (userInfo?.hours_required || 0)) *
                    100
                  ).toFixed(2)}%`,
                }}
              ></div>
            </div>
            <div className="w-full flex sm:flex-row  flex-col items-center gap-3 mt-2">
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                {Math.ceil(
                  ((userInfo?.hours_required || 0) - (logTotals.total || 0)) / 8
                )}
                <span className="text-sm font-extralight">Days Left</span>
              </h1>
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                {logTotals.total_logs}{" "}
                <span className="text-sm font-extralight">Total Logs</span>
              </h1>
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                {progressData.reduce(
                  (count, log) =>
                    log.status === "approved" ? count + 1 : count,
                  0
                )}{" "}
                <span className="text-sm font-extralight">Approved</span>
              </h1>
            </div>
          </div>
          {rooms.length > 0 && (
            <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
              <h1 className="flex items-center gap-2 w-full text-lg">
                <Building size={18} className="text-[#3a77fc]" /> Company
                Information
              </h1>
              <div className="w-full pt-4 grid xs:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-400">Company</span>
                  <h1 className="text-black font-semibold text-sm">
                    {rooms[0]?.company || "N/A"}
                  </h1>
                  <p className="text-xs text-gray-500">
                    {rooms[0]?.company_location || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Supervisor</span>
                  <h1 className="text-black font-semibold text-sm">
                    {rooms[0]?.supervisor_name || "N/A"}
                  </h1>
                  <p className="text-xs text-gray-500">
                    {rooms[0]?.supervisor_email || "N/A"}
                  </p>
                </div>
                {/*  Date Start  */}
                <div>
                  <span
                    className="text-xs text-gray-400"
                    onClick={() => console.log(enrolledDate)}
                  >
                    Start Date
                  </span>
                  <h1 className="text-black font-semibold text-sm">
                    {enrolledDate?.start_date
                      ? new Date(enrolledDate.start_date).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )
                      : "N/A"}
                  </h1>
                </div>
                {/* Date End  */}
                <div>
                  <span className="text-xs text-gray-400">End Date</span>
                  <h1 className="text-black font-semibold text-sm">
                    {enrolledDate?.end_date
                      ? new Date(enrolledDate.end_date).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )
                      : "N/A"}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  defaultValue={session?.user.name || ""}
                  className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={session?.user.email || ""}
                  className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={session?.user.phone?.slice(1, 10)}
                  className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                />
              </div>
              <div className="max-w-md -mx-6">
                <button
                  className="flex items-center gap-2 w-full justify-center bg-gray-100 py-1 text-sm"
                  onClick={(e) => {
                    setAcademicDropdown(!academicDropdown);
                    e.preventDefault();
                  }}
                >
                  Academic Information{" "}
                  {academicDropdown ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  academicDropdown
                    ? "max-h-lvh opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    School
                  </label>
                  <input
                    name="school"
                    type="text"
                    defaultValue={userInfo?.school?.trim()}
                    className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Course
                  </label>
                  <input
                    name="course"
                    type="text"
                    defaultValue={userInfo?.course?.trim()}
                    className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Year Level
                  </label>
                  <input
                    name="yearLevel"
                    type="text"
                    defaultValue={userInfo?.year_level?.trim()}
                    className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GWA</label>
                  <input
                    name="gwa"
                    type="text"
                    defaultValue={userInfo?.gwa || 0}
                    className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                  />
                </div>
              </div>
              <div className="max-w-md -mx-6">
                <button
                  className="flex items-center gap-2 w-full justify-center bg-gray-100 py-1 text-sm"
                  onClick={(e) => {
                    setAchievementsDropdown(!achievementsDropdown);
                    e.preventDefault();
                  }}
                >
                  Achievement
                  {achievementsDropdown ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  achievementsDropdown
                    ? "max-h-lvh opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">
                    Achievements
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentAchievement}
                      onChange={(e) => setCurrentAchievement(e.target.value)}
                      placeholder="Enter achievement..."
                      className="flex-1 py-1 px-3 border rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (currentAchievement.trim()) {
                          setAchievements([
                            ...achievements,
                            currentAchievement.trim(),
                          ]);
                          setCurrentAchievement("");
                        }
                      }}
                      className="py-1 px-3 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>

                  {/* Achievement List */}
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{achievement}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setAchievements(
                              achievements.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Alert_Modal
        isOpen={alertModal}
        title="Alert"
        message="Changing profile require you to re-login after changing. Are you sure to update your profile?"
        onCancel={() => setAlertModal(false)}
        onProceed={() => {
          setAlertModal(false);
          setIsModalOpen(true);
        }}
        cancelText="Cancel"
        proceedText="Proceed"
      />
      {successModal && (
        <SuccessModal
          title="Success"
          message="Successfully updated your profile, kindly relogin again!"
          onClose={() => setSuccessModal(false)}
        />
      )}
    </main>
  );
}
