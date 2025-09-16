import { create } from "zustand";

interface UserInfo {
  userName?: string;
  id?: string;
  company?: string;
}

interface SupervisorStore {
  userInfo: UserInfo;
  isLoading: boolean;
  lastFetchedUserId: string | null;

  fetchUserData: (userId: string) => Promise<void>;
}

export const useSupervisorStore = create<SupervisorStore>((set, get) => ({
    userInfo: {},
    isLoading: false,
    lastFetchedUserId: null,

    fetchUserData: async (userId: string) => {
        const state = get();
        
        console.log('fetchUserData called for userId:', userId);
        console.log('Current state:', {
            lastFetchedUserId: state.lastFetchedUserId,
            isLoading: state.isLoading
        });
        
        // Skip if already loading or already fetched this user
        if (state.isLoading) {
            console.log('Already loading, skipping...');
            return;
        }
        
        if (state.lastFetchedUserId === userId) {
            console.log('Already have data for this user, skipping...');
            return;
        }
        
        console.log('Making API call...');
        try {
            set({ isLoading: true });
            const response = await fetch(`/api/request/supervisor?id=${userId}`);
            const textData = await response.text();
            const data = textData ? JSON.parse(textData) : {};
            set({ 
                userInfo: data, 
                isLoading: false, 
                lastFetchedUserId: userId 
            });
            console.log('API call completed, data saved');
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ isLoading: false });
        }
    },
    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    }
}));