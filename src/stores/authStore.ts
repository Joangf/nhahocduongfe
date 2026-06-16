import { api } from "@/api/api";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import jwt_decode from "jwt-decode";

type AuthStore = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const checkAuthStatus = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
};

const setAuthStatus = (isAuthenticated: boolean, accessToken?: string) => {
  useAuthStore.setState({ isAuthenticated });

  if (isAuthenticated && accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
};

const useAuthStore = create<AuthStore, any>(
  devtools((set) => ({
    isAuthenticated: checkAuthStatus(),
    login: async (username: string, password: string) => {
      try {
        const response = await api.post("/api/auth/login", {
          username,
          password,
        });
        const token = response.data?.token;
        const decode: any = jwt_decode(token);
        const { username: userName } = decode || {};
        set({ isAuthenticated: true }, false, "useAuthStore/login");
        setAuthStatus(true, token);

        localStorage.setItem("username", userName);
      } catch (error) {
        throw new Error("Error");
      }
    },
    logout: () => {
      set({ isAuthenticated: false }, false, "useAuthStore/logout");
      setAuthStatus(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
    },
  })),
);

setAuthStatus(checkAuthStatus());

export default useAuthStore;
