import { create } from 'zustand'

interface UserInfo {
  userName?: string;
  id?: string;
  hours_required?: number;
}

interface LogTotals {
  total_hours?: number;
  total_logs?: number;
}

interface RecentActivities {
  date?: string;
  time?: string;
  title?: string;
  description?: string;
}

interface FileAttachment {
  name: string;
  type: string;
  data: string;
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

interface NonStudentStore {
  // State
  userInfo: UserInfo;
  logTotals: LogTotals;
  recentActivities: RecentActivities;
  progressData: ProgressData[];
  isLoading: boolean;
  
  // Actions
  fetchUserData: (userId: string, email: string) => Promise<void>;
  fetchLogTotals: (email: string) => Promise<void>;
  fetchProgressData: (email: string) => Promise<void>;
  refreshAfterLogChange: (email: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useNonStudentStore = create<NonStudentStore>((set, get) => ({
  // Initial state
  userInfo: {},
  logTotals: {},
  recentActivities: {},
  progressData: [],
  isLoading: false,
  
  // Actions
  fetchUserData: async (userId: string, email: string) => {
    try {
      set({ isLoading: true })
      const [userResponse, totalsResponse, recentResponse] = await Promise.all([
        fetch(`/api/request/non_student/info?&id=${userId}`),
        fetch(`/api/request/LogBookRequest/log_totals?email=${email}`),
        fetch(`/api/request/LogBookRequest/logbook_dashboard?email=${email}`)
      ]);

      const userText = await userResponse.text();
      const totalsText = await totalsResponse.text();
      const recentText = await recentResponse.text();

      const userData = userText ? JSON.parse(userText) : {};
      const totalsData = totalsText ? JSON.parse(totalsText) : { total_hours: 0, total_logs: 0 };
      const recentData = recentText ? JSON.parse(recentText) : {};

      set({
        userInfo: userData,
        logTotals: totalsData,
        recentActivities: recentData,
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ isLoading: false });
    }
  },

  fetchLogTotals: async (email: string) => {
    try {
      const response = await fetch(`/api/request/LogBookRequest/log_totals?email=${email}`);
      const text = await response.text();
      const data = text ? JSON.parse(text) : { total_hours: 0, total_logs: 0 };
      set({ logTotals: data });
    } catch (error) {
      console.error('Error fetching log totals:', error);
    }
  },

  fetchProgressData: async (email: string) => {
    try {
      const response = await fetch(`/api/request/LogBookRequest/log_book_request?email_add=${email}`);
      const text = await response.text();
      
      if (!text || !response.ok) {
        set({ progressData: [] });
        return;
      }
      
      // Check if response is HTML (error page) instead of JSON
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        console.error('API returned HTML instead of JSON - likely a 404 or server error');
        set({ progressData: [] });
        return;
      }
      
      const data = JSON.parse(text);
      set({ progressData: data.progress || [] });
    } catch (error) {
      console.error('Error fetching progress data:', error);
      set({ progressData: [] });
    }
  },

  refreshAfterLogChange: async (email: string) => {
    const { fetchLogTotals, fetchProgressData } = get();
    await Promise.all([
      fetchLogTotals(email),
      fetchProgressData(email)
    ]);
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  }
}));