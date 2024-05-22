import api from "@/configs/api";

const getCategories = () => api.get("content/categorys/");

export { getCategories };
