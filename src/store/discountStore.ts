import { create } from "zustand";

// Define the store
interface BooleanStore {
  clickedAdd: boolean;
  toggle: () => void;
  setValue: (newValue: boolean) => void;
}

const useDiscountStore = create<BooleanStore>((set) => ({
  clickedAdd: false,
  toggle: () => set((state) => ({ clickedAdd: !state.clickedAdd })),
  setValue: (newValue: boolean) => set(() => ({ clickedAdd: newValue })),
}));

export default useDiscountStore;
