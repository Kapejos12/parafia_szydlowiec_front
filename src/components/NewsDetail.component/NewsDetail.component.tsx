import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostImage, PostItem } from '../../utils/types';
import { fetchActualBySlug } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';
import { BreadCrumb } from 'primereact/breadcrumb';
// import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import MarkdownComponent from '../Markdown.component/Markdown.component';

const NewsDetailComponent: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [news, setNews] = useState<PostItem | null>(null);

    const { data, isLoading, error } = useQuery<PostItem>({
        queryKey: ['aktualnosci', slug],
        queryFn: () => fetchActualBySlug(slug || '')
    });

    useEffect(() => {
        console.log('data: ', data);
        if (data) {
            setNews(data);
        }
    }, [data, slug])

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Ścieżka nawigacji (breadcrumb)
    const home = { icon: 'pi pi-home', url: '/' };
    const breadcrumbItems = [
        { label: 'Aktualności', url: '/aktualnosci' },
        { label: news?.title || 'Szczegóły aktualności' }
    ];

    // Renderowanie szablonu zdjęcia dla galerii
    const itemGalleriaTemplate = (item: PostImage) => {
        return <img src={item.url} alt={item.alt || ''} style={{ width: '100%', display: 'block' }} />;
    };

    const thumbnailGalleriaTemplate = (item: PostImage) => {
        return <img src={item.url} alt={item.alt || ''} style={{ width: '100%', display: 'block' }} />;
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
                                <span>{formatDate(news.creationDate)}</span>
                            </div>
                            <Tag value={news.category} severity="info" />
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
                        {news.images && news.images.length > 1 && (
                            <div style={{ marginTop: '30px' }}>
                                <h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Galeria zdjęć</h3>
                                <Galleria
                                    value={news.images}
                                    responsiveOptions={[
                                        {
                                            breakpoint: '991px',
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

                        {/* Przyciski akcji */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                            <Button
                                label="Powrót do aktualności"
                                icon="pi pi-arrow-left"
                                className="p-button-outlined"
                                onClick={() => navigate('/aktualnosci')}
                            />
                            <Button
                                label="Udostępnij"
                                icon="pi pi-share-alt"
                                className="p-button-outlined p-button-success"
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