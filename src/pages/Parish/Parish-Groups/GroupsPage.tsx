import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../../utils/api";
import { useState } from "react";
import { Group } from "../../../utils/types";
import CategoryBanner from "../../../components/CategoryBanner.component/CategoryBanner.component";
import GroupDetailDialog from "./GroupDetailDialog";

import './GroupsPageStyles.css'

const GroupHorizontalCard: React.FC<{ group: Group; onClick: () => void }> = ({ group, onClick }) => {
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="group-card">
            <div className="group-card__content">
                {/* Treść po prawej */}
                <div className="group-card__info">
                    {/* Nazwa grupy */}
                    <h3 className="group-card__name">
                        {group.name}
                    </h3>

                    {/* Podstawowe informacje */}
                    <div className="group-card__basic-info">

                        {group.memberCount && (
                            <div className="group-card__info-item">
                                <i className="pi pi-users"></i>
                                <span>{group.memberCount} członków</span>
                            </div>
                        )}

                        {group.meetingDay && (
                            <div className="group-card__info-item">
                                <i className="pi pi-calendar"></i>
                                <span>{group.meetingDay}</span>
                            </div>
                        )}
                    </div>

                    {/* Opis */}
                    {group.description && (
                        <p className="group-card__description">
                            {truncateText(group.description, 120)}
                        </p>
                    )}

                    {/* Lider grupy */}
                    {group.leader && (
                        <div className="group-card__leader">
                            <strong>Lider:</strong> {group.leader}
                        </div>
                    )}

                    {/* Footer karty */}
                    <div className="group-card__footer">
                        <button
                            className="group-card__button"
                            onClick={onClick}
                        >
                            <span>Zobacz więcej</span>
                            <i className="pi pi-arrow-right"></i>
                        </button>

                        <div className={`group-card__status group-card__status--${group.active ? 'active' : 'inactive'}`}>
                            <i className={`pi ${group.active ? 'pi-check-circle' : 'pi-pause-circle'}`}></i>
                            <span>{group.active ? 'Aktywna' : 'Zawieszona'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GroupCardSkeleton: React.FC = () => (
    <div className="group-card group-card--skeleton">
        <div className="group-card__content">
            <div className="group-card__icon-section">
                <div className="group-card__skeleton group-card__skeleton--icon"></div>
                <div className="group-card__skeleton group-card__skeleton--tag"></div>
            </div>
            <div className="group-card__info">
                <div className="group-card__skeleton group-card__skeleton--title"></div>
                <div className="group-card__basic-info">
                    <div className="group-card__skeleton group-card__skeleton--info"></div>
                    <div className="group-card__skeleton group-card__skeleton--info"></div>
                    <div className="group-card__skeleton group-card__skeleton--info"></div>
                </div>
                <div className="group-card__skeleton group-card__skeleton--description"></div>
                <div className="group-card__skeleton group-card__skeleton--leader"></div>
                <div className="group-card__footer">
                    <div className="group-card__skeleton group-card__skeleton--button"></div>
                    <div className="group-card__skeleton group-card__skeleton--status"></div>
                </div>
            </div>
        </div>
    </div>
);

export const GroupsPage: React.FC = () => {
    const [showOnlyActive, setShowOnlyActive] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const { data: groupsData, isLoading, error } = useQuery({
        queryKey: ['groups'],
        queryFn: fetchGroups,
        staleTime: 5 * 60 * 1000,
    });

    const allGroups = Array.isArray(groupsData)
        ? [...groupsData].sort((g1, g2) => g1.name.localeCompare(g2.name))
        : [];

    const activeGroups = allGroups.filter(group => group.active);

    const handleGroupClick = (group: Group) => {
        setSelectedGroup(group);
        setDialogVisible(true);
    };

    if (isLoading) {
        return (
            <div className="groups-page">
                <div className="groups-page__container">
                    <div className="groups-page__content">
                        <div className="groups-page__banner-skeleton">
                            <div className="groups-page__skeleton groups-page__skeleton--title"></div>
                            <div className="groups-page__skeleton groups-page__skeleton--subtitle"></div>
                        </div>

                        <div className="groups-filters">
                            <div className="groups-filters__top">
                                <div className="groups-page__skeleton groups-page__skeleton--info"></div>
                                <div className="groups-filters__buttons">
                                    <div className="groups-page__skeleton groups-page__skeleton--button"></div>
                                    <div className="groups-page__skeleton groups-page__skeleton--button"></div>
                                </div>
                            </div>
                        </div>

                        <div className="groups-grid">
                            {[...Array(4)].map((_, i) => (
                                <GroupCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>

                    <div className="groups-page__sidebar">
                        <div className="groups-page__skeleton groups-page__skeleton--widget"></div>
                        <div className="groups-page__skeleton groups-page__skeleton--widget"></div>
                        <div className="groups-page__skeleton groups-page__skeleton--widget"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="groups-page">
                <div className="groups-page__container">
                    <div className="groups-page__content">
                        <div className="groups-empty">
                            <div className="groups-empty__icon">
                                <i className="pi pi-exclamation-triangle"></i>
                            </div>
                            <h2 className="groups-empty__title">Błąd ładowania</h2>
                            <p className="groups-empty__description">
                                Nie udało się załadować informacji o grupach parafialnych. Spróbuj ponownie później.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="groups-page">
            <div className="groups-page__container">
                {/* Główna treść */}
                <div className="groups-page__content">
                    {/* Banner */}
                    <CategoryBanner
                        title="Grupy Parafialne"
                        description="Poznaj aktywne grupy i wspólnoty działające w naszej parafii. Każda z nich oferuje możliwość duchowego rozwoju, wspólnej modlitwy i służby bliźniemu w różnych formach."
                        icon="pi pi-sitemap"
                        showLiturgicalInfo={true}
                    />

                    {/* Filtry */}
                    <div className="groups-filters">
                        <div className="groups-filters__top">
                            <div className="groups-filters__info">
                                Wyświetlane {allGroups.length} grup
                            </div>
                            <div className="groups-filters__buttons">
                                <button
                                    className={`groups-filters__button ${showOnlyActive ? 'groups-filters__button--active' : ''}`}
                                    onClick={() => setShowOnlyActive(true)}
                                >
                                    <i className="pi pi-check-circle"></i>
                                    <span>Aktywne ({activeGroups.length})</span>
                                </button>
                                <button
                                    className={`groups-filters__button ${!showOnlyActive ? 'groups-filters__button--active' : ''}`}
                                    onClick={() => setShowOnlyActive(false)}
                                >
                                    <i className="pi pi-list"></i>
                                    <span>Wszystkie ({allGroups.length})</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Siatka kart grup */}
                    <div className="groups-grid">
                        {activeGroups.map((group, index) => (
                            <GroupHorizontalCard
                                key={`${group.name}-${index}`}
                                group={group}
                                onClick={() => handleGroupClick(group)}
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {activeGroups.length === 0 && (
                        <div className="groups-empty">
                            <div className="groups-empty__icon">
                                <i className="pi pi-info-circle"></i>
                            </div>
                            <h3 className="groups-empty__title">Brak grup</h3>
                            <p className="groups-empty__description">
                                W wybranej kategorii nie ma grup do wyświetlenia.
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="groups-page__sidebar">
                    {/* Informacje o grupach */}
                    <div className="sidebar-widget">
                        <div className="sidebar-widget__header">
                            O naszych grupach
                        </div>
                        <div className="sidebar-widget__content">
                            <p className="sidebar-widget__text">
                                Grupy parafialne to żywe wspólnoty wierzących,
                                które spotykają się regularnie w celu pogłębienia
                                swojej wiary i służby Bogu oraz bliźniemu.<br /><br />

                                Każda grupa ma swój charakter i misję - od modlitwy
                                przez działalność charytatywną, aż po formację
                                duchową różnych grup wiekowych.
                            </p>
                        </div>
                    </div>

                    {/* Jak dołączyć */}
                    <div className="sidebar-widget">
                        <div className="sidebar-widget__header">
                            Jak dołączyć do grupy?
                        </div>
                        <div className="sidebar-widget__content">
                            <p className="sidebar-widget__text">
                                <strong>Bezpośredni kontakt:</strong><br />
                                Skontaktuj się z liderem grupy lub
                                przyjdź na jedno ze spotkań.<br /><br />

                                <strong>Przez kancelarię:</strong><br />
                                Możesz również zgłosić się do kancelarii
                                parafialnej, która pomoże w kontakcie
                                z odpowiednią grupą.
                            </p>
                        </div>
                    </div>

                    Statystyki
                    <div className="sidebar-widget">
                        <div className="sidebar-widget__header">
                            Nasze wspólnoty w liczbach
                        </div>
                        <div className="sidebar-widget__content">
                            <div className="stats">
                                <div className="stats__item">
                                    <div className="stats__number">{activeGroups.length}</div>
                                    <div className="stats__label">Aktywnych grup</div>
                                </div>
                                {/* <div className="stats__item">
                                    <div className="stats__number">
                                        {activeGroups.reduce((sum, group) => sum + (group.memberCount || 0), 0)}
                                    </div>
                                    <div className="stats__label">Członków</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog szczegółów grupy */}
            <GroupDetailDialog
                group={selectedGroup}
                visible={dialogVisible}
                onHide={() => {
                    setDialogVisible(false);
                    setSelectedGroup(null);
                }}
            />
        </div>
    );
};