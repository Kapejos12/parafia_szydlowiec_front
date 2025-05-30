import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MarkdownComponent from '../../../components/Markdown.component/Markdown.component';
import { fetchPreMarriageCourse } from '../../../utils/api';
import { PreMarriageCourse } from '../../../utils/types';

import './PreMarriageCourseStyle.css';

const PreMarriageCourseComponent: React.FC = () => {
    const { data: preMarriageCourseData, isLoading, error } = useQuery<PreMarriageCourse>({
        queryKey: ['preMarriageCourse'],
        queryFn: fetchPreMarriageCourse,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className="pre-marriage-loading">
                <div className="pre-marriage-loading__content">
                    <i className="pi pi-spin pi-spinner pre-marriage-loading__spinner"></i>
                    <p className="pre-marriage-loading__text">Ładowanie...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pre-marriage-error">
                <div className="pre-marriage-error__content">
                    <i className="pi pi-exclamation-triangle pre-marriage-error__icon"></i>
                    <p className="pre-marriage-error__text">
                        Wystąpił błąd podczas pobierania informacji o kursie przedmałżeńskim.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="pre-marriage-page">
            <div className="pre-marriage-container">
                {/* Tytuł sekcji z ikoną */}
                <div className="pre-marriage-header">
                    <div className="pre-marriage-header__icon">
                        <i className="pi pi-heart"></i>
                    </div>
                    <div className="pre-marriage-header__title-section">
                        <h2 className="pre-marriage-header__title">
                            {preMarriageCourseData?.title}
                        </h2>
                        {preMarriageCourseData?.subtitle && (
                            <p className="pre-marriage-header__subtitle">
                                {preMarriageCourseData.subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* Informacja o datach kursu */}
                {preMarriageCourseData?.dates && (
                    <div className="pre-marriage-dates">
                        <div className="pre-marriage-dates__header">
                            <i className="pi pi-calendar"></i>
                            <span className="pre-marriage-dates__title">Terminy spotkań</span>
                        </div>
                        <div className="pre-marriage-dates__content">
                            <MarkdownComponent markdown={preMarriageCourseData.dates} />
                        </div>
                    </div>
                )}

                {/* Informacja o prowadzącym */}
                {preMarriageCourseData?.leader && (
                    <div className="pre-marriage-leader">
                        <div className="pre-marriage-leader__header">
                            <i className="pi pi-user"></i>
                            <span className="pre-marriage-leader__title">Prowadzący kurs</span>
                        </div>
                        <p className="pre-marriage-leader__name">
                            {preMarriageCourseData.leader}
                        </p>
                    </div>
                )}

                {/* Zawartość kursu */}
                {preMarriageCourseData?.content && (
                    <div className="pre-marriage-content">
                        <div className="pre-marriage-content__markdown">
                            <MarkdownComponent markdown={preMarriageCourseData.content} />
                        </div>
                    </div>
                )}

                {/* Stopka kontaktowa */}
                <div className="pre-marriage-footer">
                    <div className="pre-marriage-footer-header">
                        <i className="pi pi-info-circle"></i>
                        <span className="pre-marriage-footer-title">Informacje i zapisy</span>
                    </div>
                    <p className="pre-marriage-footer-text">
                        W celu zapisania się na kurs lub uzyskania dodatkowych informacji,
                        prosimy o kontakt.
                    </p>
                    <div className="pre-marriage-buttons">
                        {preMarriageCourseData?.contactPhone && (
                            <button
                                className="pre-marriage-button primary"
                                onClick={() => window.location.href = `tel:${preMarriageCourseData.contactPhone}`}
                            >
                                <i className="pi pi-phone"></i>
                                Zadzwoń
                            </button>
                        )}
                        {preMarriageCourseData?.contactEmail && (
                            <button
                                className="pre-marriage-button secondary"
                                onClick={() => window.location.href = `mailto:${preMarriageCourseData.contactEmail}`}
                            >
                                <i className="pi pi-envelope"></i>
                                Napisz email
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreMarriageCourseComponent;