import axios from "axios";
import { Category, ChildProtectionData, Group, HistoryData, Panorama, Parishioner, Post, PreMarriageCourse, Priest } from "./types";
import { Sacrament } from "../pages/Office/ParishOffice.page";
import { Patron } from "../pages/Parish/Patron/PatronPage";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_PRODUCTION_API_BASE_URL : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL,
});

interface FetchPostsParams {
    page?: number;
    pageSize?: number;
    categories?: string;
}

interface StrapiPaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface FetchPostsResponse {
    data: Post[];
    meta: {
        pagination: StrapiPaginationMeta;
    };
}

export const fetchPosts = async (params?: FetchPostsParams): Promise<FetchPostsResponse> => {
    const { page = 1, pageSize = 25, categories = '' } = params || {};

    const queryParams: Record<string, string> = {
        'pagination[page]': page.toString(),
        'pagination[pageSize]': Math.min(pageSize, 25).toString(), // Max 25
        'populate': '*',
        'sort[0]': 'createdAt:desc'
    };

    // Filtrowanie po kategoriach jeśli są wybrane
    if (categories) {
        queryParams['filters[categories][slug][$in]'] = categories;
    }

    const response = await apiClient.get("/api/posts", { params: queryParams });

    return {
        data: response.data.data,
        meta: response.data.meta
    };
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