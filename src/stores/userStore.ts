import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  id: string;
  name: string;
}

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserStore, any>(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }, false, "useUserStore/setUser"),
  })),
);

export default useUserStore;
