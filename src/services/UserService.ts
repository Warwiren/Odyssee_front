import { API } from "@/services/AxiosApi";

export const fetchUserService = async () => {
  let response;
  try {
    response = await API.get("/user");
  } catch (e) {
    console.warn(e);
    response = { data: null };
  }
  return response.data;
};
