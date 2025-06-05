import axios from "axios";
import { Category, ChildProtectionData, Group, HistoryData, Panorama, Parishioner, Post, PreMarriageCourse, Priest } from "./types";
import { Sacrament } from "../pages/Office/ParishOffice.page";
import { Patron } from "../pages/Parish/Patron/PatronPage";

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

export const fetchPatron = async (): Promise<Patron> => {
    const response = await apiClient.get(`/api/patron`);
    return response.data.data;
}

export const fetchHistoryData = async (): Promise<HistoryData> => {
    const response = await apiClient.get(`/api/history?populate=photos`);
    return response.data.data;
}

export const fetchPriests = async (): Promise<Priest[]> => {
    const response = await apiClient.get("/api/priests?populate=photo");
    return response.data.data;
}

export const fetchChildProtectionStandards = async (): Promise<ChildProtectionData> => {
    const response = await apiClient.get("/api/sod");
    return response.data.data;
}

export const fetchGroups = async (): Promise<Group[]> => {
    const response = await apiClient.get("/api/groups");
    return response.data.data;
}

export const fetchPreMarriageCourse = async (): Promise<PreMarriageCourse> => {
    const response = await apiClient.get("/api/premarriage-course");
    return response.data.data;
}

export const fetchParisioners = async (): Promise<Parishioner[]> => {
    const response = await apiClient.get("/api/parishioners?populate=photo");
    return response.data.data;
}

export const fetchPanoramas = async (): Promise<Panorama[]> => {
    const response = await apiClient.get("/api/panoramas?populate=photos");
    return response.data.data;
}