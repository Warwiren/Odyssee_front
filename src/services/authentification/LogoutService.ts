import { API } from "@/services/AxiosApi";

export const logoutService = async () => {
  await API.post("/logout");
};
