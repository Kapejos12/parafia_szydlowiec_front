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
// import { Image } from 'primereact/image';
// import { Tag } from 'primereact/tag';
import MarkdownComponent from '../Markdown.component/Markdown.component';

const NewsDetailComponent: React.FC = () => {
    const STRAPI_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_PRODUCTION_API_BASE_URL : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;
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
            // Convert single post to array if needed
            const posts = Array.isArray(data) ? data : [data];

            return posts.map(post => {
                // Get the media array from the specified field
                const mediaItems = post[imageFieldName] as Media[];

                // Skip if no media items
                if (!mediaItems || !Array.isArray(mediaItems) || mediaItems.length === 0) {
                    return [];
                }

                return mediaItems.map(photo => {
                    if (!photo) return null;

                    // Create Galleria-compatible object
                    return {
                        itemImageSrc: `${STRAPI_URL}${photo.url}`,
                        thumbnailImageSrc: photo.formats && photo.formats.thumbnail
                            ? `${STRAPI_URL}${photo.formats.thumbnail.url}`
                            : `${STRAPI_URL}${photo.url}`,
                        alt: post.title || 'Image',
                        title: post.title || '',
                    };
                }).filter(Boolean) as GalleriaImage[]; // Remove any null entries
            }).flat(); // Flatten array if we have multiple images per post
        };

        if (data) {
            setNews(data);
            setPhotos(processPhotosForGalleria(data, "photos"));
        }
    }, [STRAPI_URL, data, slug])

    const formatDate = (date: Date | string): string => {
        // Handle both Date objects and date strings
        const dateObject = date instanceof Date ? date : new Date(date);

        // Check if date is valid before formatting
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
            // Fallback format in case toLocaleDateString fails
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            return `${day}.${month}.${year}`;
        }
    };

    // Ścieżka nawigacji (breadcrumb)
    const home = { icon: 'pi pi-home', url: '/' };
    const breadcrumbItems = [
        { label: news?.title || 'Szczegóły aktualności' }
    ];

    // Renderowanie szablonu zdjęcia dla galerii
    const itemGalleriaTemplate = (item: GalleriaImage) => {
        return <img src={item.itemImageSrc} alt={item.alt || ''} style={{ width: '100%', display: 'block' }} />;
    };

    const thumbnailGalleriaTemplate = (item: GalleriaImage) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt || ''} style={{ width: '100%', display: 'block' }} />;
    };

    // // Komponent do wyświetlania obrazków wewnątrz Markdown
    // const MarkdownImage = ({ src, alt }: { src: string; alt?: string }) => {
    //     return (
    //         <div style={{ marginBottom: '20px', marginTop: '20px' }}>
    //             <Image src={src} alt={alt || ''} width="100%" preview />
    //         </div>
    //     );
    // };

    // Obsługa stanu ładowania
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
                <span style={{ marginLeft: '10px' }}>Wczytywanie aktualności...</span>
            </div>
        );
    }

    // Obsługa błędu
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
                <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                <h2>Wystąpił błąd podczas wczytywania aktualności</h2>
                <p>{error?.message || 'Spróbuj ponownie później'}</p>
                <Button
                    label="Wróć do listy aktualności"
                    icon="pi pi-arrow-left"
                    onClick={() => navigate('/aktualnosci')}
                    style={{ marginTop: '20px' }}
                />
            </div>
        );
    }

    // Jeśli nie ma danych (np. nie znaleziono aktualności)
    if (!news) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="pi pi-info-circle" style={{ fontSize: '3rem', marginBottom: '20px', color: '#3498db' }}></i>
                <h2>Nie znaleziono aktualności</h2>
                <p>Aktualność o podanej nazwie nie istnieje lub została usunięta.</p>
                <Button
                    label="Wróć do listy aktualności"
                    icon="pi pi-arrow-left"
                    onClick={() => navigate('/aktualnosci')}
                    style={{ marginTop: '20px' }}
                />
            </div>
        );
    }

    return (
        <div className="news-detail-page">
            {/* Breadcrumb - ścieżka nawigacji */}
            <div style={{ marginBottom: '20px' }}>
                <BreadCrumb model={breadcrumbItems} home={home} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-0.5rem' }}>
                {/* Główna kolumna z treścią aktualności */}
                <div style={{ flex: '0 0 100%', padding: '0.5rem' }}>
                    <Card>
                        {/* Nagłówek z datą i kategorią */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <i className="pi pi-calendar" style={{ marginRight: '8px' }}></i>
                                <span>{formatDate(news.createdAt)}</span>
                            </div>
                            {/* {news.category.map((category, index) => {
                                return (
                                    <Tag key={index} value={category.name} severity="info" />
                                );
                            })} */}
                        </div>
                        {/* Przyciski akcji */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginBottom: '20px' }}>
                            <Button
                                label="Powrót do aktualności"
                                icon="pi pi-arrow-left"
                                className="p-button-outlined"
                                onClick={() => navigate('/')}
                            />
                        </div>
                        {/* Tytuł */}
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>{news.title}</h1>

                        {/* Autor */}
                        {/* {news && (
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                <i className="pi pi-user" style={{ marginRight: '8px' }}></i>
                                <span>{news.author}</span>
                            </div>
                        )} */}

                        {/* Treść w formacie Markdown */}
                        <div className="markdown-body" style={{ marginBottom: '20px' }}>
                            <MarkdownComponent markdown={news.content} />
                        </div>

                        {/* Galeria zdjęć - jeśli jest więcej niż jedno zdjęcie i nie są już wyświetlane w treści Markdown */}
                        {photos && photos.length > 1 && (
                            <div>
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
                        <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
                            <Button
                                icon="pi pi-facebook"
                                className="p-button-rounded p-button-outlined p-button-info mr-2"
                                tooltip="Udostępnij na Facebook"
                            />
                            <Button
                                icon="pi pi-envelope"
                                className="p-button-rounded p-button-outlined p-button-secondary mr-2"
                                tooltip="Wyślij mailem"
                            />
                            <Button
                                icon="pi pi-print"
                                className="p-button-rounded p-button-outlined p-button-help"
                                tooltip="Drukuj"
                                onClick={() => window.print()}
                            />
                        </div>
                    </Card>

                    {/* Powiązane aktualności
          {relatedNewsItems && relatedNewsItems.length > 0 && (
            <Card title="Powiązane aktualności" style={{ marginTop: '20px' }}>
              {isRelatedLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" />
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-0.5rem' }}>
                  {relatedNewsItems.map(item => (
                    <div key={item.slug} style={{ flex: '0 0 50%', padding: '0.5rem' }}>
                      <Button 
                        className="p-button-text"
                        style={{
                          display: 'block',
                          textAlign: 'left',
                          padding: '15px',
                          width: '100%',
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px'
                        }}
                        onClick={() => navigate(`/aktualnosci/${item.id}`)}
                      >
                        <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                        <div style={{ color: '#6c757d', fontSize: '0.875rem' }}>{formatDate(item.creationDate)}</div>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )} */}
                </div>
            </div>
        </div>
    )
}

export default NewsDetailComponent
