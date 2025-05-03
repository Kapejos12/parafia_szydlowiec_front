export interface Post {
    slug: string;
    title: string;
    content: string;
    shortContent: string;
    creationDate: string;
}

export interface PostImage {
    id: number;
    url: string;
    alt: string;
    title: string;
}

export interface PostItem {
    slug: string;
    title: string;
    content: string;
    images?: PostImage[];
    category: string;
    creationDate: string;
}