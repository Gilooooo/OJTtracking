import { create } from 'zustand'

interface UserInfo{
    student_id?:string;
    course?: string;
    school?: string;
    year_level?: string;
    hours_required?: number;
}


interface StudentStore {
    userInfo: UserInfo
    isLoading: boolean;
    fetchUserData: (userId: string) => Promise<void>;
    setLoading: (loading: boolean) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
    userInfo: {},
    isLoading: false,

    fetchUserData: async (userId: string) => {
        try {
            const response = await fetch(`/api/request/student/info?&id=${userId}`);
            const data = await response.json();
            set({ userInfo: data });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    },
    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },

}))
