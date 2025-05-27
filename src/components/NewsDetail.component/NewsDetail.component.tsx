import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Post, GalleriaImage, Media } from '../../utils/types';
import { fetchPostBySlug } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';
import { BreadCrumb } from 'primereact/breadcrumb';
import MarkdownComponent from '../Markdown.component/Markdown.component';

import './news-detail.css'; // Import stylów

const NewsDetailComponent: React.FC = () => {
    const STRAPI_URL = import.meta.env.VITE_NODE_ENV === "production"
        ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
        : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;

    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [news, setNews] = useState<Post>();
    const [photos, setPhotos] = useState<GalleriaImage[]>([]);

    const { data, isLoading, error } = useQuery<Post>({
        queryKey: ['post', slug],
        queryFn: () => fetchPostBySlug(slug || '')
    });

    useEffect(() => {
        const processPhotosForGalleria = (
            data: Post | Post[],
            imageFieldName: keyof Post
        ): GalleriaImage[] => {
            const posts = Array.isArray(data) ? data : [data];

            return posts.map(post => {
                const mediaItems = post[imageFieldName] as Media[];

                if (!mediaItems || !Array.isArray(mediaItems) || mediaItems.length === 0) {
                    return [];
                }

                return mediaItems.map(photo => {
                    if (!photo) return null;

                    return {
                        itemImageSrc: `${STRAPI_URL}${photo.url}`,
                        thumbnailImageSrc: photo.formats && photo.formats.thumbnail
                            ? `${STRAPI_URL}${photo.formats.thumbnail.url}`
                            : `${STRAPI_URL}${photo.url}`,
                        alt: post.title || 'Image',
                        title: post.title || '',
                    };
                }).filter(Boolean) as GalleriaImage[];
            }).flat();
        };

        if (data) {
            setNews(data);
            setPhotos(processPhotosForGalleria(data, "photos"));
        }
    }, [STRAPI_URL, data, slug])

    const formatDate = (date: Date | string): string => {
        const dateObject = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObject.getTime())) {
            return 'Invalid date';
        }

        try {
            return dateObject.toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            return `${day}.${month}.${year}`;
        }
    };

    // Ścieżka nawigacji (breadcrumb)
    const home = {
        icon: 'pi pi-home',
        command: () => navigate('/')
    };

    const breadcrumbItems = [
        {
            label: 'Aktualności',
            command: () => navigate('/')
        },
        {
            label: news?.title || 'Szczegóły aktualności'
        }
    ];

    // Renderowanie szablonu zdjęcia dla galerii
    const itemGalleriaTemplate = (item: GalleriaImage) => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt || ''}
                style={{ width: '100%', display: 'block', borderRadius: '8px' }}
            />
        );
    };

    const thumbnailGalleriaTemplate = (item: GalleriaImage) => {
        return (
            <img
                src={item.thumbnailImageSrc}
                alt={item.alt || ''}
                style={{ width: '100%', display: 'block', borderRadius: '4px' }}
            />
        );
    };

    // Funkcje udostępniania
    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(news?.title || '');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
    };

    const shareByEmail = () => {
        const subject = encodeURIComponent(`Sprawdź tę aktualność: ${news?.title || ''}`);
        const body = encodeURIComponent(`Przeczytaj tę interesującą aktualność: ${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // Obsługa stanu ładowania
    if (isLoading) {
        return (
            <div className="news-detail-page">
                <div className="news-detail-container">
                    <div className="news-detail-loading">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
                        <span>Wczytywanie aktualności...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Obsługa błędu
    if (error) {
        return (
            <div className="news-detail-page">
                <div className="news-detail-container">
                    <div className="news-detail-error">
                        <i className="pi pi-exclamation-triangle"></i>
                        <h2>Wystąpił błąd podczas wczytywania aktualności</h2>
                        <p>{error?.message || 'Spróbuj ponownie później'}</p>
                        <Button
                            label="Wróć do listy aktualności"
                            icon="pi pi-arrow-left"
                            className="p-button-danger"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Jeśli nie ma danych
    if (!news) {
        return (
            <div className="news-detail-page">
                <div className="news-detail-container">
                    <div className="news-detail-not-found">
                        <i className="pi pi-info-circle"></i>
                        <h2>Nie znaleziono aktualności</h2>
                        <p>Aktualność o podanej nazwie nie istnieje lub została usunięta.</p>
                        <Button
                            label="Wróć do listy aktualności"
                            icon="pi pi-arrow-left"
                            className="p-button-info"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="news-detail-page">
            <div className="news-detail-container">
                {/* Breadcrumb */}
                <BreadCrumb model={breadcrumbItems} home={home} />

                {/* Przycisk powrotu */}
                <Button
                    label="Powrót do aktualności"
                    icon="pi pi-arrow-left"
                    className="back-button"
                    onClick={() => navigate('/')}
                />

                {/* Główna karta aktualności */}
                <Card className="news-detail-card">
                    {/* Nagłówek z gradientem */}
                    <div className="news-detail-header">
                        <div className="news-detail-meta">
                            <div className="news-detail-date">
                                <i className="pi pi-calendar"></i>
                                <span>{formatDate(news.createdAt)}</span>
                            </div>
                            <div className="news-detail-actions">
                                <Button
                                    icon="pi pi-share-alt"
                                    className="p-button-rounded p-button-outlined"
                                    tooltip="Udostępnij"
                                    tooltipOptions={{ position: 'bottom' }}
                                />
                                <Button
                                    icon="pi pi-bookmark"
                                    className="p-button-rounded p-button-outlined"
                                    tooltip="Dodaj do ulubionych"
                                    tooltipOptions={{ position: 'bottom' }}
                                />
                            </div>
                        </div>
                        <h1 className="news-detail-title">{news.title}</h1>
                    </div>

                    {/* Treść w formacie Markdown */}
                    <div className="news-detail-content">
                        <MarkdownComponent markdown={news.content} />
                    </div>

                    {/* Galeria zdjęć */}
                    {photos && photos.length > 1 && (
                        <div className="news-detail-gallery">
                            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>
                                Galeria zdjęć
                            </h3>
                            <Galleria
                                value={photos}
                                responsiveOptions={[
                                    {
                                        breakpoint: '960px',
                                        numVisible: 4
                                    },
                                    {
                                        breakpoint: '767px',
                                        numVisible: 3
                                    },
                                    {
                                        breakpoint: '575px',
                                        numVisible: 2
                                    }
                                ]}
                                numVisible={5}
                                style={{ maxWidth: '100%' }}
                                showItemNavigators
                                showThumbnails={true}
                                item={itemGalleriaTemplate}
                                thumbnail={thumbnailGalleriaTemplate}
                            />
                        </div>
                    )}

                    {/* Przyciski społecznościowe */}
                    <div className="news-detail-social">
                        <Button
                            icon="pi pi-facebook"
                            className="p-button-rounded p-button-info"
                            tooltip="Udostępnij na Facebook"
                            tooltipOptions={{ position: 'top' }}
                            onClick={shareOnFacebook}
                        />
                        <Button
                            icon="pi pi-envelope"
                            className="p-button-rounded p-button-secondary"
                            tooltip="Wyślij mailem"
                            tooltipOptions={{ position: 'top' }}
                            onClick={shareByEmail}
                        />
                        <Button
                            icon="pi pi-print"
                            className="p-button-rounded p-button-help"
                            tooltip="Drukuj"
                            tooltipOptions={{ position: 'top' }}
                            onClick={() => window.print()}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default NewsDetailComponent;