import { create } from "zustand";

interface UserInfo {
  userName?: string;
  id?: string;
  company?: string;
}

interface Room {
  room_code: string;
  room_name: string;
  room_description: string;
  company: string;
  company_location: string;
  supervisor_email: string;
  supervisor_username: string;
  supervisor_name: string;
  date: string;
}

interface SupervisorStore {
  userInfo: UserInfo;
  rooms: Room[];
  isLoading: boolean;
  isLoadingRooms: boolean;
  lastFetchedUserId: string | null;

  fetchUserData: (userId: string) => Promise<void>;
  fetchRooms: (email: string, username: string) => Promise<void>;
}

export const useSupervisorStore = create<SupervisorStore>((set, get) => ({
    userInfo: {},
    rooms: [],
    isLoading: false,
    isLoadingRooms: false,
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
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ isLoading: false });
        }
    },
    setLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },

    fetchRooms: async (email: string, username: string) => {
        try {
            set({ isLoadingRooms: true });
            const response = await fetch(`/api/request/Room/Getroom?email=${email}&username=${username}`);
            const data = await response.json();
            
            if (response.ok) {
                set({ rooms: data.rooms, isLoadingRooms: false });
            } else {
                console.error('Failed to fetch rooms:', data.error);
                set({ isLoadingRooms: false });
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
            set({ isLoadingRooms: false });
        }
    }
}));