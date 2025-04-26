import axios from "axios";
import { Actuals } from "./types";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_PRODUCTION_API_BASE_URL : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL,
});

export const fetchActuals = async (): Promise<Actuals[]> => {
    const response = await apiClient.get("/api/aktualnoscis");
    return response.data.data;
}