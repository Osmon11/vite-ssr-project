import { useAppStore } from "@/stores/app";

export const useNotification = () => {
  const appStore = useAppStore();
  return {
    setAlert: appStore.setAlert,
    setPromp: appStore.setPromp,
  };
};
