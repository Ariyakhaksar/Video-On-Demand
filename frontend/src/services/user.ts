import api from "@/configs/api";

const getProfile = () => api.get("accounts/profile/user/").then(res => res || false);

export { getProfile };
