import useAuthStore from "@/stores/authStore";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";

interface Props {}
const AppRoutes = (props: Props) => {
  const auth = useAuthStore((state) => state.isAuthenticated);

  return auth ? <ProtectedRoutes /> : <PublicRoutes />;
};
export { AppRoutes };
