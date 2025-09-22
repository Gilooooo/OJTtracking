import { create } from "zustand";

interface UserInfo {
  student_id?: string;
  course?: string;
  school?: string;
  year_level?: string;
  hours_required?: number;
}

interface FileAttachment {
  name: string;
  type: string;
  data: string;
}

interface Room {
  company: string;
  room_code: string;
  room_name: string;
  room_description: string;
  company_location: string;
  supervisor_email: string;
  supervisor_username: string;
  supervisor_name: string;
}

interface EnrolledDate {
  start_date?: string;
  end_date?: string;
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

interface LogTotal{
    total?: number;
    total_logs?: number;
}

interface StudentStore {
  userInfo: UserInfo;
  rooms: Room[];
  progressData: ProgressData[];
  logTotals: LogTotal;
  enrolledDate: EnrolledDate;
  isLoading: boolean;
  fetchUserData: (userId: string, email:string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  fetchEnrolledRooms: (studentid: string, username: string) => Promise<void>;
  fetchProgressData:(email_add: string) => Promise<void>;
}

export const useStudentStore = create<StudentStore>((set) => ({
  userInfo: {},
  rooms: [],
  progressData: [],
  logTotals: {},
  enrolledDate: {},
  isLoading: false,

  fetchUserData: async (userId: string, email:string) => {
    try {
      set({ isLoading: true });

      const [userResponse, totalsResponse] = await Promise.all([
        fetch(`/api/request/student/info?&id=${userId}`),
        fetch(`/api/request/LogBookRequest/log_totals?email=${email}`)
      ]);
      const totalData = await totalsResponse.json();
      const userdata = await userResponse.json();
      set({ userInfo: userdata, logTotals:totalData ,isLoading: false });
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ isLoading: false });
    }
  },
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  fetchEnrolledRooms: async (studentid: string, username: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `/api/request/Room/Enrolled?student_id=${studentid}&user_name=${username}`
      );
      const data = await response.json();
      set({
        enrolledDate: { start_date: data.startdate, end_date: data.enddate },
        rooms: data.rooms || [],
        isLoading: false,
      });
      console.log(data.start_date);
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ rooms: [], isLoading: false });
    }
  },
  fetchProgressData: async (email_add: string) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `/api/request/LogBookRequest/log_book_request?email_add=${email_add}`
      );
      const data = await response.json();
      set({
        progressData: data.progress || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching progress data:", error);
      set({ progressData: [] });
    }
  },
}));
