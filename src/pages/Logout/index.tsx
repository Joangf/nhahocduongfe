import useAuthStore from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const Logout = (props: Props) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return <div>Đang đăng xuất ...</div>;
};
export default Logout;
