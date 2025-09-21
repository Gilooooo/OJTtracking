import { create } from 'zustand'

interface UserInfo{
    student_id?:string;
    course?: string;
    school?: string;
    year_level?: string;
    hours_required?: number;
}


interface Room{
    company:string;
    room_code: string;
    room_name: string;
    room_description: string;
    company_location: string;
    supervisor_email: string;
    supervisor_username: string;
    supervisor_name: string;
}

interface EnrolledDate{
    start_date?: string;
    end_date?: string;
}

interface StudentStore {
    userInfo: UserInfo;
    rooms: Room[];
    enrolledDate: EnrolledDate;
    isLoading: boolean;
    fetchUserData: (userId: string) => Promise<void>;
    setLoading: (loading: boolean) => void;
    fetchEnrolledRooms: (studentid: string, username:string) => Promise<void>;
}

export const useStudentStore = create<StudentStore>((set) => ({
    userInfo: {},
    rooms: [],
    enrolledDate: {}, 
    isLoading: false,

    fetchUserData: async (userId: string) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`/api/request/student/info?&id=${userId}`);
            const data = await response.json();
            set({ userInfo: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ isLoading: false });
        }
    },
    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },

    fetchEnrolledRooms: async (studentid: string, username:string) => {
        try {
            set({ isLoading: true });
            const response = await fetch(`/api/request/Room/Enrolled?student_id=${studentid}&user_name=${username}`);
            const data = await response.json();
            set({ enrolledDate: { start_date: data.startdate, end_date: data.enddate }, rooms: data.rooms || [], isLoading: false });
            console.log(data.start_date);
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ rooms: [], isLoading: false });
        }
    }
}))
