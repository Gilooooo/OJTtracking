import { Clock, Edit, Mail, Phone, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading_Page from "@/_Component/Loading";

interface Data {
  id?: string;
  hours_required?: number;
}

interface Total {
  total_hours?: number;
  total_logs?: number;
}

export default function Nonstudent_Profile() {
  const [initialName, setInitialName] = useState<string>("");
  const { data: session } = useSession();
  const [personData, setPersonData] = useState<Data | null>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [logtotals, setLogTotal] = useState<Total>({});
  const [isLoading, setIsLoading] = useState(true);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const InitialNaming = () => {
      const name = session?.user?.name?.trim();
      const t = name?.split(" ");
      setInitialName((t?.[0]?.[0] || "") + (t?.[1]?.[0] || ""));
    };
    InitialNaming();
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/request/non_student/info?id=${session?.user.id}`
        );
        const responseTotal = await fetch(`/api/request/non_student/log_totals?email=${session?.user?.email}`)
        const dataTotal = await responseTotal.json();
        const data = await response.json();
        if (response.ok || responseTotal.ok) {
          setPersonData({
            id: data?.id,
            hours_required: data?.hours_required ,
          });
          setLogTotal(dataTotal);
        } else {
          console.error("There is an error", data.error);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    
    if (session?.user?.id) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return <Loading_Page />;
  }

  return (
    <main className="text-black space-y-3.5">
      <div className="flex items-center justify-between">
        <h1 className="flex flex-col sm:text-2xl text-lg font-semibold">
          My Profile
          <span className="sm:text-sm text-xs font-light">
            Manage your personal information and OJT details
          </span>
        </h1>
        <button className="flex items-center gap-2 xs:py-2 xs:px-3 p-2 bg-blue-500 rounded-lg text-white xs:text-sm text-[10px]" onClick={handleModal}>
          <Edit size={12} /> Edit profile
        </button>
      </div>
      <div className="flex gap-4 lg:flex-row flex-col">
        <div className="flex flex-col flex-1/3 gap-4">
          <div className="flex flex-col items-center p-5 px-6 bg-white shadow-lg rounded-2xl gap-1">
            {/* Profile Picture */}
            <div className="h-20 w-20 rounded-full bg-amber-400 flex items-center justify-center">
              {initialName}
            </div>
            {/* Full Name */}
            <h1 className="text-center mt-4 font-semibold text-lg">
              {session?.user?.name}
            </h1>
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
                    +63 {session?.user.phone}
                  </span>
                </span>
              </div>
            </div>
          </div>
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
                <p className="xs:text-sm text-xs">{logtotals.total_hours} of {personData?.hours_required} required hours</p>
              </div>
              {/* Progress in percentage */}
              <div className="text-end">
                <p className="xs:text-2xl text-lg font-semibold text-blue-600">
                  {logtotals.total_hours}%
                </p>
                <p className="xs:text-sm text-xs">{personData?.hours_required} hours remaining</p>
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-4 my-2">
              <div
                className="bg-black h-4 rounded-full"
                style={{
              width: `${(
                ((logtotals.total_hours || 0) /
                  (personData?.hours_required || 0)) *
                100
              ).toFixed(2)}%`}}
              ></div>
            </div>
            <div className="w-full flex sm:flex-row  flex-col items-center gap-3 mt-2">
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                {((personData?.hours_required || 0) - (logtotals.total_hours || 0))/8} <span className="text-sm font-extralight" >Days Left</span>
              </h1>
              <h1 className="flex flex-col flex-1 p-3 rounded-lg bg-[#f3f3f5] items-center font-semibold text-xl self-stretch">
                {logtotals.total_logs} <span className="text-sm font-extralight">Total Logs</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
       {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
            <form className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={session?.user?.name || ""}
                  className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue={session?.user?.phone || ""}
                  className="w-full py-1 px-3 border rounded-lg focus:outline-none"
                />
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
    </main>
  );
}
