// Category model
export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: Media;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}

// Post model
export interface Post {
    id: number;
    title: string;
    slug: string;
    shortContent: string;
    content: string;
    creationDate: Date;
    photos: Media[];
    categories: Category[];
    eventDate: Date;
    attachments: Media[];
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}

// Media interface for icon, photos, and attachments
export interface Media {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider_metadata?: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface MediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path?: string;
    url: string;
}

// Interfejs dla obiektu kompatybilnego z PrimeReact Galleria
export interface GalleriaImage {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
    title: string;
}

export interface HistoryData {
    title: string;
    subtitle: string;
    content: string;
    pictures: Media[];
}

export interface Priest {
    name: string;
    surname: string;
    title: string;
    description?: string;
    photo: Media;
    ordinationDate?: Date;
    education?: string;
    specialization?: string;
    languages?: string;
    quotations?: string;
    hobbies?: string;
    active: boolean;
    email?: string;
    phoneNumber?: string;
    birthDate?: string;
}