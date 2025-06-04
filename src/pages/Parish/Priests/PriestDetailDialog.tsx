import React, { JSX, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Priest } from '../../../utils/types';

import './PriestDetailStyles.css'

const STRAPI_URL = import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
    : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;

const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
};

const getTitleInPolish = (title: string) => {
    const titles: { [key: string]: string } = {
        'Parish Priest': 'Proboszcz',
        'Vicar': 'Wikariusz',
        'Resident': 'Rezydent',
        'Pastor': 'Proboszcz',
        'Associate Pastor': 'Wikariusz',
        'Retired': 'Emeryt'
    };
    return titles[title] || title;
};

const getTitleColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('parish priest') || lowerTitle.includes('pastor')) {
        return 'success';
    }
    if (lowerTitle.includes('vicar')) {
        return 'info';
    }
    if (lowerTitle.includes('resident')) {
        return 'warning';
    }
    return 'secondary';
};

const calculateAge = (birthDate: string | Date | undefined) => {
    try {
        if (!birthDate) return null;
        const birth = birthDate instanceof Date ? birthDate : new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
};

const formatDate = (dateString: string | Date | undefined) => {
    try {
        if (!dateString) return '';
        const date = dateString instanceof Date ? dateString : new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return String(dateString);
    }
};

const renderListField = (field: string | string[] | null | undefined): JSX.Element | string => {
    if (!field) return '';

    try {
        let items: string[] = [];

        // Jeśli to już jest array
        if (Array.isArray(field)) {
            items = field;
        } else if (typeof field === 'string') {
            // Sprawdź czy to JSON array
            if (field.startsWith('[') && field.endsWith(']')) {
                const parsed = JSON.parse(field);
                if (Array.isArray(parsed)) {
                    items = parsed;
                }
            } else {
                // Jeśli to zwykły string, zwróć go
                return field;
            }
        }

        // Jeśli mamy więcej niż 1 element, renderuj jako listę
        if (items.length > 1) {
            return (
                <div className="priest-list-items">
                    {items.map((item, index) => (
                        <span key={index} className="priest-list-item">
                            {item}
                        </span>
                    ))}
                </div>
            );
        } else if (items.length === 1) {
            return items[0];
        }

        return String(field);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // Jeśli parsing się nie uda, zwróć oryginalny string
        return String(field);
    }
};

interface PriestDetailDialogProps {
    priest: Priest | null;
    visible: boolean;
    onHide: () => void;
}

const PriestDetailDialog: React.FC<PriestDetailDialogProps> = ({ priest, visible, onHide }) => {
    // Zapobiegaj scrollowaniu body gdy dialog jest otwarty na mobile
    useEffect(() => {
        if (visible && window.innerWidth <= 960) {
            // Zapisz aktualną pozycję scroll
            const scrollY = window.scrollY;

            // Zablokuj scroll na body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // Przywróć scroll na body
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';

                // Przywróć pozycję scroll
                window.scrollTo(0, scrollY);
            };
        }
    }, [visible]);

    if (!priest) return null;

    const imageData = priest.photo;
    const imageUrl = getImageUrl(
        imageData?.formats?.large?.url ||
        imageData?.formats?.medium?.url ||
        imageData?.url || ''
    );

    const age = priest.birthDate ? calculateAge(priest.birthDate) : null;

    const dialogHeader = (
        <div className="priest-dialog-header">
            <div className="priest-dialog-header-content">
                <h2>Szczegóły kapłana</h2>
            </div>
        </div>
    );

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header={dialogHeader}
            className="priest-detail-dialog"
            modal
            dismissableMask
            blockScroll={true} // Zablokuj scroll na body
            style={{
                width: window.innerWidth <= 768 ? '95vw' : '90vw',
                maxWidth: window.innerWidth <= 768 ? 'none' : '900px',
                height: window.innerWidth <= 768 ? '95vh' : 'auto',
                maxHeight: window.innerWidth <= 768 ? '95vh' : '90vh'
            }}
            contentStyle={{
                padding: 0,
                // Usuń height i maxHeight - pozwól CSS na obsługę
                overflow: window.innerWidth <= 768 ? 'auto' : 'visible'
            }}
        >
            <div className="priest-dialog-content">
                {/* Sekcja zdjęcia po lewej */}
                <div className="priest-dialog-image-section">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={`${priest.name} ${priest.surname}`}
                            className="priest-dialog-photo"
                        />
                    ) : (
                        <div className="priest-dialog-photo-placeholder">
                            <i className="pi pi-user"></i>
                        </div>
                    )}

                    {/* Tag z tytułem na zdjęciu */}
                    <div className="priest-dialog-tag-overlay">
                        <Tag
                            value={getTitleInPolish(priest.title)}
                            severity={getTitleColor(priest.title)}
                            className="priest-dialog-title-tag"
                        />
                        {!priest.active && (
                            <Tag value="Emeryt" severity="secondary" className="priest-dialog-status-tag" />
                        )}
                    </div>
                </div>

                {/* Pionowy divider */}
                <div className="priest-dialog-divider"></div>

                {/* Sekcja informacji po prawej */}
                <div className="priest-dialog-info-section">
                    {/* Imię i nazwisko */}
                    <div className="priest-dialog-name-section">
                        <h1 className="priest-dialog-full-name">
                            {priest.name} {priest.surname}
                        </h1>
                        <div className="priest-dialog-title">
                            <i className="pi pi-crown"></i>
                            {getTitleInPolish(priest.title)}
                        </div>
                    </div>

                    {/* Szczegółowe informacje */}
                    <div className="priest-dialog-details">

                        {/* Sekcja podstawowych informacji */}
                        <div className="priest-info-block">
                            <h3 className="priest-info-block-title">
                                <i className="pi pi-info-circle"></i>
                                Informacje podstawowe
                            </h3>
                            <div className="priest-info-grid">
                                {age && (
                                    <div className="priest-info-item">
                                        <span className="priest-info-label">
                                            <i className="pi pi-calendar"></i>
                                            Wiek
                                        </span>
                                        <span className="priest-info-value">{age} lat</span>
                                    </div>
                                )}

                                {priest.birthDate && (
                                    <div className="priest-info-item">
                                        <span className="priest-info-label">
                                            <i className="pi pi-calendar"></i>
                                            Data urodzenia
                                        </span>
                                        <span className="priest-info-value">{formatDate(priest.birthDate)}</span>
                                    </div>
                                )}

                                {priest.ordinationDate && (
                                    <div className="priest-info-item">
                                        <span className="priest-info-label">
                                            <i className="pi pi-bookmark"></i>
                                            Święcenia kapłańskie
                                        </span>
                                        <span className="priest-info-value">{formatDate(priest.ordinationDate)}</span>
                                    </div>
                                )}

                                <div className="priest-info-item">
                                    <span className="priest-info-label">
                                        <i className="pi pi-briefcase"></i>
                                        Funkcja w parafii
                                    </span>
                                    <span className="priest-info-value">{getTitleInPolish(priest.title)}</span>
                                </div>

                                <div className="priest-info-item">
                                    <span className="priest-info-label">
                                        <i className="pi pi-check-circle"></i>
                                        Status
                                    </span>
                                    <span className={`priest-info-value ${priest.active ? 'active' : 'inactive'}`}>
                                        {priest.active ? 'Aktywny' : 'Emeryt'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Opis */}
                        {priest.description && (
                            <div className="priest-info-block">
                                <h3 className="priest-info-block-title">
                                    <i className="pi pi-file-text"></i>
                                    O kapłanie
                                </h3>
                                <p className="priest-description-full">{priest.description}</p>
                            </div>
                        )}

                        {/* Wykształcenie i specjalizacje */}
                        {(priest.education || priest.specialization || priest.languages) && (
                            <div className="priest-info-block">
                                <h3 className="priest-info-block-title">
                                    <i className="pi pi-graduation-cap"></i>
                                    Wykształcenie i specjalizacje
                                </h3>
                                <div className="priest-info-grid">
                                    {priest.education && (
                                        <div className="priest-info-item">
                                            <span className="priest-info-label">
                                                <i className="pi pi-graduation-cap"></i>
                                                Wykształcenie
                                            </span>
                                            <span className="priest-info-value">{priest.education}</span>
                                        </div>
                                    )}

                                    {priest.specialization && (
                                        <div className="priest-info-item">
                                            <span className="priest-info-label">
                                                <i className="pi pi-star"></i>
                                                Specjalizacje
                                            </span>
                                            <span className="priest-info-value">
                                                {renderListField(priest.specialization)}
                                            </span>
                                        </div>
                                    )}

                                    {priest.languages && (
                                        <div className="priest-info-item">
                                            <span className="priest-info-label">
                                                <i className="pi pi-globe"></i>
                                                Znajomość języków
                                            </span>
                                            <span className="priest-info-value">
                                                {renderListField(priest.languages)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Cytat */}
                        {priest.quotations && (
                            <div className="priest-info-block">
                                <h3 className="priest-info-block-title">
                                    <i className="pi pi-comment"></i>
                                    Cytat
                                </h3>
                                <blockquote className="priest-quote">
                                    <p>"{priest.quotations}"</p>
                                </blockquote>
                            </div>
                        )}

                        {/* Hobby i zainteresowania */}
                        {priest.hobbies && (
                            <div className="priest-info-block">
                                <h3 className="priest-info-block-title">
                                    <i className="pi pi-heart"></i>
                                    Zainteresowania i hobby
                                </h3>
                                <div className="priest-hobbies-content">
                                    {renderListField(priest.hobbies)}
                                </div>
                            </div>
                        )}

                        {/* Kontakt */}
                        {(priest.email || priest.phoneNumber) && (
                            <div className="priest-info-block">
                                <h3 className="priest-info-block-title">
                                    <i className="pi pi-phone"></i>
                                    Kontakt
                                </h3>
                                <div className="priest-contact-grid">
                                    {priest.email && (
                                        <div className="priest-contact-item">
                                            <i className="pi pi-envelope"></i>
                                            <div>
                                                <span className="priest-contact-label">Email</span>
                                                <a href={`mailto:${priest.email}`} className="priest-contact-link">
                                                    {priest.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {priest.phoneNumber && (
                                        <div className="priest-contact-item">
                                            <i className="pi pi-phone"></i>
                                            <div>
                                                <span className="priest-contact-label">Telefon</span>
                                                <a href={`tel:${priest.phoneNumber}`} className="priest-contact-link">
                                                    {priest.phoneNumber}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default PriestDetailDialog;