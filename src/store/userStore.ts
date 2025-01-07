import { create } from "zustand";

interface UserState {
  userName: string;
  setUserName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "Lamsat Al Bharat",
  setUserName: (name) => set({ userName: name }),
}));
