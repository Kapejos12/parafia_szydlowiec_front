import { useQuery } from "@tanstack/react-query";
import { fetchPriests } from "../../../utils/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { useState } from "react";
import { Priest } from "../../../utils/types";
import { Tag } from "primereact/tag";
import CategoryBanner from "../../../components/CategoryBanner.component/CategoryBanner.component";
import PriestDetailDialog from "./PriestDetailDialog";

import './PriestsPageStyles.css'

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

const PriestHorizontalCard: React.FC<{ priest: Priest; onClick: () => void }> = ({ priest, onClick }) => {
    const imageData = priest.photo;
    const imageUrl = getImageUrl(
        imageData?.formats?.medium?.url ||
        imageData?.url || ''
    );

    const age = priest.birthDate ? calculateAge(priest.birthDate) : null;

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Treść karty z poziomym layoutem
    const cardContent = (
        <div className="priest-horizontal-card-content">
            {/* Sekcja zdjęcia po lewej */}
            <div className="priest-image-section">
                {imageUrl || priest.name === 'Tadeusz' ? (
                    <img
                        src={imageUrl || 'https://via.placeholder.com/140x160/8B1C1C/FFFFFF?text=KS.+' + priest.name.charAt(0) + priest.surname.charAt(0)}
                        alt={`${priest.name} ${priest.surname}`}
                        className="priest-photo"
                    />
                ) : (
                    <div className="priest-photo-placeholder">
                        <i className="pi pi-user"></i>
                    </div>
                )}

                {/* Tag na zdjęciu */}
                <div className="priest-tag-overlay">
                    <Tag
                        value={getTitleInPolish(priest.title)}
                        severity={getTitleColor(priest.title)}
                        className="priest-title-tag"
                    />
                </div>
            </div>

            {/* Pionowy divider */}
            <div className="priest-divider"></div>

            {/* Treść po prawej */}
            <div className="priest-info-section">
                {/* Imię i nazwisko */}
                <h3 className="priest-full-name">
                    {priest.name} {priest.surname}
                </h3>

                {/* Podstawowe informacje */}
                <div className="priest-basic-info">
                    <span className="priest-title">
                        <i className="pi pi-crown"></i>
                        {getTitleInPolish(priest.title)}
                    </span>

                    {age && (
                        <span className="priest-age">
                            <i className="pi pi-calendar"></i>
                            {age} lat
                        </span>
                    )}

                    {priest.ordinationDate && (
                        <span className="priest-ordination">
                            <i className="pi pi-bookmark"></i>
                            Święcenia: {new Date(priest.ordinationDate).getFullYear()}
                        </span>
                    )}
                </div>

                {/* Opis */}
                {priest.description && (
                    <p className="priest-description">
                        {truncateText(priest.description, 120)}
                    </p>
                )}

                {/* Specjalizacja */}
                {priest.specialization && (
                    <div className="priest-specialization">
                        <strong>Specjalizacja:</strong> {priest.specialization}
                    </div>
                )}

                {/* Przycisk i status */}
                <div className="priest-card-footer">
                    <Button
                        label="Zobacz więcej"
                        icon="pi pi-arrow-right"
                        size="small"
                        onClick={onClick}
                        className="priest-more-button"
                    />

                    <div className={`priest-status ${priest.active ? 'active' : 'inactive'}`}>
                        <i className={`pi ${priest.active ? 'pi-check-circle' : 'pi-minus-circle'}`}></i>
                        {priest.active ? 'Aktywny' : 'Emeryt'}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="priest-horizontal-card">
            {cardContent}
        </Card>
    );
};

const PriestCardSkeleton: React.FC = () => (
    <Card className="priest-horizontal-card">
        <div className="priest-horizontal-card-content">
            <div className="priest-image-section">
                <Skeleton width="100%" height="120px" />
            </div>
            <div className="priest-divider"></div>
            <div className="priest-info-section">
                <Skeleton height="1.5rem" width="60%" className="mb-2" />
                <Skeleton height="1rem" width="40%" className="mb-2" />
                <Skeleton height="0.8rem" width="80%" className="mb-2" />
                <Skeleton height="3rem" className="mb-2" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton height="2rem" width="8rem" />
                    <Skeleton height="1rem" width="4rem" />
                </div>
            </div>
        </div>
    </Card>
);

export const PriestsPage: React.FC = () => {
    const [showOnlyActive, setShowOnlyActive] = useState(true);
    const [selectedPriest, setSelectedPriest] = useState<Priest | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const { data: priestsData, isLoading, error } = useQuery({
        queryKey: ['priests'],
        queryFn: fetchPriests,
        staleTime: 5 * 60 * 1000,
    });

    const priests = priestsData || [];
    const activePriests = priests.filter(priest => priest.active);
    const displayPriests = showOnlyActive ? activePriests : priests;

    const handlePriestClick = (priest: Priest) => {
        setSelectedPriest(priest);
        setDialogVisible(true);
    };

    if (isLoading) {
        return (
            <div className="priests-page">
                <div className="priests-main-container">
                    <div className="priests-content">
                        <div className="priests-intro-section">
                            <Skeleton height="2rem" className="mb-2" />
                            <Skeleton height="1rem" width="70%" />
                        </div>

                        <div className="priests-filters-section">
                            <div className="priests-filters">
                                <Skeleton height="2rem" width="8rem" />
                                <Skeleton height="2rem" width="8rem" />
                            </div>
                        </div>

                        <div className="priests-cards-grid">
                            {[...Array(4)].map((_, i) => (
                                <PriestCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>

                    <div className="priests-sidebar">
                        <Skeleton height="200px" />
                        <Skeleton height="150px" />
                        <Skeleton height="180px" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="priests-page">
                <div className="priests-main-container">
                    <div className="priests-content">
                        <div className="priests-intro-section">
                            <h1>Nasi Kapłani</h1>
                            <p>Nie udało się załadować informacji o kapłanach. Spróbuj ponownie później.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="priests-page">
            <div className="priests-main-container">
                {/* Główna treść */}
                <div className="priests-content">
                    {/* Banner z dynamicznymi kolorami liturgicznymi */}
                    <CategoryBanner
                        title="Nasi Kapłani"
                        description="Poznaj kapłanów parafii Św. Zygmunta w Szydłowcu, którzy każdego dnia służą wspólnocie wierzących swoją modlitwą, posługą duszpasterską i świadectwem życia chrześcijańskiego."
                        subtitle="Parafia Św. Zygmunta w Szydłowcu"
                        icon="pi pi-users"
                        showLiturgicalInfo={true}
                    />

                    {/* Filtry */}
                    <div className="priests-filters-section">
                        <div className="priests-filters-top">
                            <div className="priests-filters-left">
                                <span className="priests-results-info">
                                    Wyświetlane {displayPriests.length} z {priests.length} kapłanów
                                </span>
                            </div>
                            <div className="priests-filters">
                                <Button
                                    label={`Aktywni (${activePriests.length})`}
                                    icon="pi pi-check-circle"
                                    onClick={() => setShowOnlyActive(true)}
                                    severity={showOnlyActive ? undefined : 'secondary'}
                                    outlined={!showOnlyActive}
                                    size="small"
                                />
                                <Button
                                    label={`Wszyscy (${priests.length})`}
                                    icon="pi pi-list"
                                    onClick={() => setShowOnlyActive(false)}
                                    severity={!showOnlyActive ? undefined : 'secondary'}
                                    outlined={showOnlyActive}
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Siatka poziomych kart kapłanów */}
                    <div className="priests-cards-grid">
                        {displayPriests.map((priest, index) => (
                            <PriestHorizontalCard
                                key={`${priest.name}-${priest.surname}-${index}`}
                                priest={priest}
                                onClick={() => handlePriestClick(priest)}
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {displayPriests.length === 0 && (
                        <div className="priests-empty">
                            <i className="pi pi-info-circle"></i>
                            <h3>Brak kapłanów</h3>
                            <p>W wybranej kategorii nie ma kapłanów do wyświetlenia.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="priests-sidebar">
                    {/* Statystyki kapłanów */}
                    <div className="priests-sidebar-widget">
                        <div className="priests-sidebar-widget-header">
                            Statystyki
                        </div>
                        <div className="priests-sidebar-widget-content">
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                                <strong>Łączna liczba kapłanów:</strong> {priests.length}<br />
                                <strong>Aktywni kapłani:</strong> {activePriests.length}<br />
                                <strong>Emeryci:</strong> {priests.length - activePriests.length}<br /><br />

                                <strong>Funkcje:</strong><br />
                                • Proboszczowie: {priests.filter(p => p.title.toLowerCase().includes('parish priest') || p.title.toLowerCase().includes('pastor')).length}<br />
                                • Wikariusze: {priests.filter(p => p.title.toLowerCase().includes('vicar')).length}<br />
                                • Rezydenci: {priests.filter(p => p.title.toLowerCase().includes('resident')).length}
                            </p>
                        </div>
                    </div>

                    {/* Informacje o kapłanach */}
                    <div className="priests-sidebar-widget">
                        <div className="priests-sidebar-widget-header">
                            O naszych kapłanach
                        </div>
                        <div className="priests-sidebar-widget-content">
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                                Kapłani naszej parafii to doświadczeni duszpasterze,
                                którzy z oddaniem służą wspólnocie wierzących.<br /><br />

                                Każdy z nich wnosi swoje unikalne dary i doświadczenie
                                w codzienne życie parafii - od celebracji liturgii,
                                przez katechezę, aż po pracę charytatywną.
                            </p>
                        </div>
                    </div>

                    {/* Kontakt z kapłanami */}
                    <div className="priests-sidebar-widget">
                        <div className="priests-sidebar-widget-header">
                            Jak skontaktować się z kapłanem?
                        </div>
                        <div className="priests-sidebar-widget-content">
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                                <strong>Bezpośrednio:</strong><br />
                                Kliknij "Zobacz więcej" przy wybranym kapłanie,
                                aby zobaczyć jego dane kontaktowe.<br /><br />

                                <strong>Przez kancelarię:</strong><br />
                                Możesz również umówić się na spotkanie
                                przez kancelarię parafialną.<br /><br />

                                <strong>Po Mszy Świętej:</strong><br />
                                Kapłani są dostępni dla parafian
                                po zakończeniu nabożeństw.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog szczegółów kapłana */}
            <PriestDetailDialog
                priest={selectedPriest}
                visible={dialogVisible}
                onHide={() => {
                    setDialogVisible(false);
                    setSelectedPriest(null);
                }}
            />
        </div>
    );
};