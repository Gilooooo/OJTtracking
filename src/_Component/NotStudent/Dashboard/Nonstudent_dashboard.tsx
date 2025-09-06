import {
  BookOpen,
  ChevronRight,
  CircleCheckBig,
  Clock,
  TrendingUp,
  User2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading_Page from "@/_Component/Loading";

interface Info {
  id?: string;
  hours_required?: number;
}
interface Total {
  total_hours?: number;
  total_logs?: number;
}
interface NonStudentDashboardProps {
  setActiveSection: (section: string) => void;
}
interface ActivitiesProps {
  date?: string;
  time?: string;
  title?: string;
  description?: string;
}

export default function NonStudent_dashboard({
  setActiveSection,
}: NonStudentDashboardProps) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<Info>({});
  const [logtotals, setLogTotals] = useState<Total>({});
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<ActivitiesProps>({});
  const [lapseTime, setLapseTime] = useState<string>("");
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/request/non_student/info?&id=${session?.user?.id}`
        );
        const responseTotal = await fetch(
          `/api/request/non_student/log_totals?email=${session?.user?.email}`
        );
        const recentActivities = await fetch(
          `/api/request/non_student/logbook_dashboard?email=${session?.user?.email}`
        );
        const recentText = await recentActivities.text();
        const responseText = await response.text();
        const totalText = await responseTotal.text();
        
        const recentActivitiesData = recentText ? JSON.parse(recentText) : {};
        const data = responseText ? JSON.parse(responseText) : {};
        const dataTotal = totalText ? JSON.parse(totalText) : { total_hours: 0, total_logs: 0 };
        if (response.ok || responseTotal.ok) {
          setRecentActivities(recentActivitiesData);
          setUserInfo(data);
          setLogTotals(dataTotal);
        } else {
          console.error("Problem Fetching data", data.error);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    if (recentActivities.date && recentActivities.time) {
      setLapseTime(
        getTimeElapsed(recentActivities.date, recentActivities.time)
      );
    }
  }, [recentActivities.date, recentActivities.time]);

  if (isLoading) {
    return <Loading_Page />;
  }

  return (
    <main className="text-black space-y-3.5">
      {/* Ojt Progress Preview */}
      <div className="w-full bg-white p-4 rounded-2xl shadow-lg ">
        <h1 className="flex text-lg font-extralight items-center gap-2">
          <span
            className="p-2 bg-[#dff2fe] rounded-xl text-[#0084d1]"
            onClick={() => console.log(logtotals)}
          >
            <TrendingUp size={18} />
          </span>
          Ojt Progess Preview
        </h1>
        <p className="pt-2 pb-5 text-sm text-[#787a7e]">
          Track your internship hours and milestone
        </p>
        <div className="flex justify-between items-center">
          {/* Total hours required */}
          <div className="flex flex-col self-end">
            <p className="xs:text-md text-sm">Total Hours Completed</p>
            <p className="xs:text-sm text-xs">
              {logtotals.total_hours} of {userInfo?.hours_required || 0}{" "}
              required hours
            </p>
          </div>
          {/* Progress in percentage */}
          <div className="text-end">
            <p className="xs:text-2xl text-lg font-semibold text-blue-600">
              {(
                ((logtotals.total_hours || 0) /
                  (userInfo?.hours_required || 0)) *
                100
              ).toFixed(2)}
              %
            </p>
            <p className="xs:text-sm text-xs">
              {(userInfo?.hours_required || 0) - (logtotals.total_hours || 0)}{" "}
              remaining
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2 my-2">
          <div
            className="bg-black h-2 rounded-full"
            style={{
              width: `${(
                ((logtotals.total_hours || 0) /
                  (userInfo?.hours_required || 0)) *
                100
              ).toFixed(2)}%`,
            }}
          ></div>
        </div>
        {/* <div className="flex xs:flex-row flex-col xs:gap-0 gap-3 items-center border-t border-gray-200 py-4 mt-4 ">
           Company Name 
          <div className="flex items-center gap-2 flex-1/2 w-full">
            <span className="p-3 bg-gray-300 rounded-2xl text-[#787a7e]">
              <Building size={18} />
            </span>
            <div className="flex flex-col">
              <span className="sm:text-sm text-xs">Company</span>
              <span className="sm:text-lg text-md">Tech Corporation</span>
            </div>
          </div>
           Supervisor 
          <div className="flex items-center gap-2 flex-1/2 w-full">
            <span className="p-3 bg-gray-300 rounded-2xl text-[#787a7e]">
              <User2 size={18} />
            </span>
            <div className="flex flex-col">
              <span className="sm:text-sm text-xs">Supervisor</span>
              <span className="sm:text-lg text-md">Cruz Valdez</span>
            </div>
          </div>
        </div> */}
      </div>
      {/* Status */}
      <div className="flex xs:flex-row flex-col items-center gap-3 w-full bg-[#f8fafc] self-stretch">
        {/* Hours Week */}
        <div className="xs:flex-1/2 flex flex-col justify-between bg-[white] shadow-lg py-4 px-6 rounded-2xl self-stretch">
          <div className="flex items-center justify-between w-full">
            <span className="p-3 bg-[#dbeafe] text-[#3a77fc] rounded-2xl">
              <Clock size={18} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-[#787a7e]">Weekly Goal</span>
              <div className="w-full bg-gray-300 rounded-full h-1 ">
                <div
                  className="bg-black h-1 rounded-full"
                  style={{
                    width: `${(
                      ((logtotals.total_hours || 0) /
                        (userInfo?.hours_required || 0)) *
                      100
                    ).toFixed(2)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          {/* Hours for this week */}
          <div className="flex flex-col py-2 text-[#787a7e] ">
            <span className="text-black text-sm">Hours This Week</span>
            <h1 className="flex items-end gap-1">
              <span className="text-2xl text-black">
                {logtotals.total_hours || 0}
              </span>
              <span className="text-xs">/ 40</span>
            </h1>
            <span className="text-[10px]">
              {(userInfo?.hours_required || 0) - (logtotals.total_hours || 0)}{" "}
              Hours remaining
            </span>
          </div>
        </div>
        {/* Logs */}
        <div className="xs:flex-1/2 bg-[white] flex flex-col justify-between shadow-lg py-4 px-6 rounded-2xl self-stretch">
          <div className="flex w-full">
            <span className="p-3 bg-[#dbfce7] text-[#2ab65e] rounded-2xl">
              <BookOpen size={18} />
            </span>
          </div>
          {/* Log from logbook */}
          <div className="flex flex-col py-2 text-[#787a7e] ">
            <span className="text-black text-sm">Recent Log</span>
            <h1 className="flex items-end gap-1">
              <span className="text-2xl text-black">
                {logtotals.total_logs}
              </span>
              <span className="text-xs">This month</span>
            </h1>
            <span className="text-[10px] text-transparent">Not Applicable</span>
          </div>
        </div>
      </div>
      {/*  */}
      <section className="flex gap-3 sm:flex-row flex-col">
        <div className="flex-1 p-5 shadow-lg rounded-2xl bg-white">
          <div className="flex flex-col gap-3">
            <span className="text-sm">Recent Activities</span>
            <p className="text-[#787a7e] text-sm">
              Your latest OJT updates and milestones
            </p>
          </div>
          {/* Activites  */}
          <div className="flex flex-col mt-4 space-y-3">
            {/* Recent Update for log */}
            {recentActivities.title && (
              <div className="flex items-center gap-2 py-4 px-3 bg-[#f8fafc] rounded-2xl shadow-md hover:shadow-lg" onClick={() => setActiveSection("logbook")}>
                <span className="p-2 bg-[#fef9c2] text-[#e2b44d] rounded-lg self-start">
                  <BookOpen size={18} />
                </span>
                <div className="flex flex-col gap-1 text-[#787a7e]">
                  <h1 className=" text-md text-black">
                    {recentActivities.title}
                  </h1>
                  {/* Task Description */}
                  <span className="text-xs -my-1 py-2">
                    {recentActivities.description}
                  </span>
                  {/* Hours */}
                  <span className="text-xs">{lapseTime}</span>
                </div>
              </div>
            )}
            {logtotals && (
              <div className="flex items-center gap-2 py-4 px-3 bg-[#f8fafc] rounded-2xl shadow-md">
                <span className="p-2 bg-[#dbfce7] text-[#2ab65e] rounded-lg self-start">
                  <CircleCheckBig size={18} />
                </span>
                <div className="flex flex-col gap-1 text-[#787a7e]">
                  <h1 className=" text-md text-black">
                    {logtotals.total_hours} hours completed
                  </h1>
                  <span className="text-xs -my-1 py-2">
                    You&apos;re making excellent progress!
                  </span>
                  {/* Hours */}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-5 shadow-lg rounded-2xl bg-white">
          <div className="flex flex-col gap-3">
            <span className="text-sm">Quick Actions</span>
            <p className="text-[#787a7e] text-sm">Common tasks and shortcut</p>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            {/* Log Book */}
            <button
              className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] px-4 py-2 shadow-md hover:shadow-lg"
              onClick={() => setActiveSection("logbook")}
            >
              <span>
                <BookOpen size={18} />
              </span>
              <p className="flex flex-col flex-1 text-start text-sm">
                Add New Log Entry
                <span className="text-xs">Record your daily activities</span>
              </p>
              <span>
                <ChevronRight size={18} />
              </span>
            </button>
            {/* Log Book */}
            <button
              className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] px-4 py-2 shadow-md hover:shadow-lg"
              onClick={() => setActiveSection("profile")}
            >
              <span>
                <User2 size={18} />
              </span>
              <p className="flex flex-col flex-1 text-start text-sm">
                Profile <span className="text-xs">Update information</span>
              </p>
              <span>
                <ChevronRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
