import useAuthStore from "./authStore";
import useUserStore from "./userStore";

const useRootStore = () => ({
  authStore: useAuthStore,
  userStore: useUserStore,
});

export default useRootStore;
