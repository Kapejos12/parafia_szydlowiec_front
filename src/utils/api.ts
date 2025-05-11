import axios from "axios";
import { Category, Post } from "./types";
import { Sacrament } from "../pages/Office/ParishOffice.page";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_PRODUCTION_API_BASE_URL : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL,
});

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await apiClient.get("/api/posts?populate=*");
    return response.data.data;
}

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await apiClient.get("/api/categories");
    return response.data.data;
}

export const fetchPostBySlug = async (slug: string): Promise<Post> => {
    const response = await apiClient.get(`/api/posts/slug/${slug}`);
    return response.data;
}

export const fetchPostByCategory = async (category: string): Promise<Post[]> => {
    const response = await apiClient.get(`/api/posts/category/${category}`);
    return response.data;
}

export const fetchSacraments = async (): Promise<Sacrament[]> => {
    const response = await apiClient.get("/api/sacraments");
    return response.data.data;
}