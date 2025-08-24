import { BookOpen, Building, Clock, TrendingUp, User2 } from "lucide-react";

export default function DashboardSection() {
  return (
    <section className="max-w-4xl bg-[#f8fafc] m-auto h-full py-4 px-3">
      <section className="text-black space-y-3.5">
        {/* Ojt Progress Preview */}
        <div className="w-full bg-white p-4 rounded-2xl shadow-lg ">
          <h1 className="flex text-lg font-extralight items-center gap-2">
            <span className="p-2 bg-[#dff2fe] rounded-xl text-[#0084d1]">
              <TrendingUp size={18} />
            </span>
            Ojt Progess Preview
          </h1>
          <p className="pt-2 pb-5 text-sm text-[#787a7e]">
            Track your internship hours and milestone
          </p>
          <div className="flex justify-between items-center">
            {/* Total hours required */}
            <div>
              <p className="text-md">Total Hours Completed</p>
              <p className="text-sm">350 of 600 required hours</p>
            </div>
            {/* Progress in percentage */}
            <div className="text-end">
              <p className="text-2xl font-semibold text-blue-600">58%</p>
              <p className="text-sm">250 hours remaining</p>
            </div>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 my-2">
            <div
              className="bg-black h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <div className="flex items-center border-t border-gray-200 py-4 mt-4 ">
            {/* Company Name */}
            <div className="flex items-center gap-2 flex-1/2">
              <span className="p-3 bg-gray-300 rounded-2xl text-[#787a7e]">
                <Building size={18} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm">Company</span>
                <span className="text-lg">Tech Corporation</span>
              </div>
            </div>
            {/* Supervisor */}
            <div className="flex items-center gap-2 flex-1/2">
              <span className="p-3 bg-gray-300 rounded-2xl text-[#787a7e]">
                <User2 size={18} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm">Supervisor</span>
                <span className="text-lg">Cruz Valdez</span>
              </div>
            </div>
          </div>
        </div>
        {/* Status */}
        <div className="flex items-center gap-2 w-full  bg-[#f8fafc] self-stretch">
          {/* Hours Week */}
          <div className="flex-1/2 flex flex-col justify-between bg-[white] shadow-lg py-4 px-6 rounded-2xl">
            <div className="flex items-center justify-between w-full">
              <span className="p-3 bg-blue-600 text-white rounded-2xl">
                <Clock size={18} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm text-[#787a7e]">Weekly Goal</span>
                <div className="w-full bg-gray-300 rounded-full h-1 ">
                  <div
                    className="bg-black h-1 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
            {/* Hours for this week */}
            <div className="flex flex-col py-2 text-[#787a7e] ">
                <span className="text-black text-sm">Hours This Week</span>
                <h1 className="flex items-end gap-1"><span className="text-2xl text-black">30</span><span className="text-xs">/ 40</span></h1>
                <span className="text-[10px]">10 Hours remaining</span>
            </div>
          </div>
          {/* Logs */}
          <div className="flex-1/2 bg-[white] flex flex-col justify-between shadow-lg py-4 px-6 rounded-2xl self-stretch">
            <div className="flex w-full">
              <span className="p-3 bg-green-500 text-white rounded-2xl">
                <BookOpen size={18} />
              </span>
            </div>
            {/* Log from logbook */}
            <div className="flex flex-col py-2 text-[#787a7e] ">
                <span className="text-black text-sm">Recent Log</span>
                <h1 className="flex items-end gap-1"><span className="text-2xl text-black">8</span><span className="text-xs">This month</span></h1>
                <span className="text-[10px]">2 pending approval</span>
            </div>
          </div>
        </div>
        {/*  */}
        <div>

        </div>
      </section>
    </section>
  );
}
