import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Galleria } from 'primereact/galleria';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoryData } from '../../../utils/api';

import './HistoryPageStyles.css';
import { Media } from '../../../utils/types';
import MarkdownComponent from '../../../components/Markdown.component/Markdown.component';


const HistoryPage: React.FC = () => {
    const STRAPI_URL = import.meta.env.VITE_NODE_ENV === "production"
        ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
        : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;
    const [selectedImage, setSelectedImage] = useState<Media | null>(null);

    // Funkcja do budowania pełnego URL obrazu
    const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url; // Już pełny URL
        return `${STRAPI_URL}${url}`; // Dodaj bazowy URL
    };

    // Używamy hooka React Query do pobierania danych o historii
    const { data: historyData, isLoading, error } = useQuery({
        queryKey: ['history'],
        queryFn: () => fetchHistoryData(),
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000
    });

    // Template dla głównego widoku obrazu w galerii
    const itemTemplate = (item: Media) => {
        const imageUrl = getImageUrl(
            item.formats?.large?.url ||
            item.formats?.medium?.url ||
            item.url
        );
        return (
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => openLightbox(item)}>
                <img
                    src={imageUrl}
                    alt={item.alternativeText || item.name}
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '600px',
                        objectFit: 'contain',
                        display: 'block'
                    }}
                    loading="lazy"
                />
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <i className="pi pi-search-plus"></i>
                    Powiększ
                </div>
            </div>
        );
    };

    // Template dla miniaturek w galerii
    const thumbnailTemplate = (item: Media) => {
        const thumbnailUrl = getImageUrl(
            item.formats?.large?.url ||
            item.formats?.medium?.url ||
            item.url
        );
        return (
            <div style={{ position: 'relative' }}>
                <img
                    src={thumbnailUrl}
                    alt={item.alternativeText || item.name}
                    style={{
                        width: '80px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                    }}
                    loading="lazy"
                    onClick={() => openLightbox(item)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
        );
    };

    // Template dla podpisu pod obrazem
    const captionTemplate = (item: Media) => {
        if (!item.caption && !item.alternativeText) return null;

        return (
            <div className="gallery-caption" style={{
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0
            }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {item.caption || item.alternativeText}
                </p>
            </div>
        );
    };

    // Funkcja do otwierania lightbox
    const openLightbox = (image: Media) => {
        setSelectedImage(image);
    };

    // Funkcja do zamykania lightbox
    const closeLightbox = () => {
        setSelectedImage(null);
    };

    // Template dla nagłówka dialogu lightbox
    const lightboxHeader = () => (
        <div className="lightbox-header">
            <i className="pi pi-image"></i>
            <span>Galeria Historyczna</span>
        </div>
    );

    // Renderowanie komponentu ładowania podczas pobierania danych
    if (isLoading) {
        return (
            <div className="history-page">
                <div className="container">
                    <div className="loading-container">
                        <ProgressSpinner />
                        <p>Ładowanie historii parafii...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Renderowanie komunikatu o błędzie, jeśli wystąpił
    if (error) {
        return (
            <div className="history-page">
                <div className="container">
                    <Message
                        severity="error"
                        text="Wystąpił błąd podczas pobierania historii parafii. Prosimy spróbować później."
                    />
                </div>
            </div>
        );
    }

    // Jeśli dane nie zostały znalezione
    if (!historyData) {
        return (
            <div className="history-page">
                <div className="container">
                    <Message
                        severity="info"
                        text="Brak danych o historii parafii. Prosimy sprawdzić później."
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="history-page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        <i className="pi pi-history"></i> {historyData.title}
                    </h1>
                </div>

                <div className="history-content">
                    {/* Treść główna */}
                    <Card className="content-card">
                        <div className="markdown-wrapper">
                            <MarkdownComponent markdown={historyData.content} />
                        </div>
                    </Card>

                    <Divider className="section-divider" />

                    {/* Galeria zdjęć */}
                    {historyData.photos && historyData.photos.length > 0 && (
                        <section className="gallery-section">
                            <h2 className="section-title">
                                <i className="pi pi-images"></i> Galeria Historyczna
                            </h2>
                            <Card className="gallery-card">
                                <Galleria
                                    value={historyData.photos}
                                    item={itemTemplate}
                                    thumbnail={thumbnailTemplate}
                                    caption={captionTemplate}
                                    numVisible={5}
                                    circular
                                    autoPlay
                                    transitionInterval={3000}
                                    showThumbnails
                                    showIndicators
                                    showItemNavigators
                                    showThumbnailNavigators={false}
                                    thumbnailsPosition="bottom"
                                    style={{ maxWidth: '100%' }}
                                    className="custom-galleria"
                                />
                            </Card>
                        </section>
                    )}
                </div>

                {/* Lightbox Dialog */}
                <Dialog
                    visible={selectedImage !== null}
                    onHide={closeLightbox}
                    header={lightboxHeader}
                    modal
                    maximizable
                    style={{ width: '90vw', height: '90vh' }}
                    contentStyle={{
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                    headerStyle={{
                        backgroundColor: '#f8f9fa',
                        borderBottom: '1px solid #dee2e6'
                    }}
                >
                    {selectedImage && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            position: 'relative'
                        }}>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#000',
                                position: 'relative'
                            }}>
                                <img
                                    src={getImageUrl(selectedImage.formats?.large?.url || selectedImage.url)}
                                    alt={selectedImage.alternativeText || selectedImage.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain'
                                    }}
                                />

                                {/* Close button */}
                                <Button
                                    icon="pi pi-times"
                                    className="p-button-rounded p-button-secondary p-button-text"
                                    onClick={closeLightbox}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        color: '#000'
                                    }}
                                    tooltip="Zamknij"
                                    tooltipOptions={{ position: 'left' }}
                                />
                            </div>

                            {/* Image info */}
                            {(selectedImage.caption || selectedImage.alternativeText) && (
                                <div style={{
                                    padding: '1rem',
                                    backgroundColor: '#f8f9fa',
                                    borderTop: '1px solid #dee2e6'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <i className="pi pi-info-circle" style={{ color: '#6c757d' }}></i>
                                        <div>
                                            <p style={{
                                                margin: 0,
                                                fontWeight: 'bold',
                                                color: '#495057'
                                            }}>
                                                {selectedImage.name}
                                            </p>
                                            {selectedImage.caption && (
                                                <p style={{
                                                    margin: '5px 0 0 0',
                                                    color: '#6c757d',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {selectedImage.caption}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Dialog>
            </div>
        </div>
    );
};

export default HistoryPage;
