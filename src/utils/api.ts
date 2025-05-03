import axios from "axios";
import { Post, PostItem } from "./types";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_PRODUCTION_API_BASE_URL : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL,
});

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await apiClient.get("/api/posts");
    return response.data.data;
}

export const fetchActualBySlug = async (slug: string): Promise<PostItem> => {
    const response = await apiClient.get(`/api/posts/slug/${slug}`);
    return response.data;
}