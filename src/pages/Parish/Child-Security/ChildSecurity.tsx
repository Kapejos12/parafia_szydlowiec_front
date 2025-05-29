import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MarkdownComponent from '../../../components/Markdown.component/Markdown.component';
import { fetchChildProtectionStandards } from '../../../utils/api';
import { ChildProtectionData } from '../../../utils/types';
import './ChildSecurityStyles.css';

const ChildProtectionStandards: React.FC = () => {
    const { data: childProtectionData, isLoading, error } = useQuery<ChildProtectionData>({
        queryKey: ['childProtection'],
        queryFn: fetchChildProtectionStandards,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className="child-protection-loading">
                <div className="child-protection-loading-content">
                    <i className="pi pi-spin pi-spinner child-protection-loading-spinner"></i>
                    <p className="child-protection-loading-text">Ładowanie...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="child-protection-error">
                <div className="child-protection-error-content">
                    <i className="pi pi-exclamation-triangle child-protection-error-icon"></i>
                    <p className="child-protection-error-text">
                        Wystąpił błąd podczas pobierania informacji.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="child-protection-page">
            <div className="child-protection-container">
                {/* Tytuł sekcji z ikoną */}
                <div className="child-protection-header">
                    <div className="child-protection-icon">
                        <i className="pi pi-shield"></i>
                    </div>
                    <h2 className="child-protection-title">
                        {childProtectionData?.title}
                    </h2>
                </div>

                {/* Zawartość sekcji */}
                {childProtectionData?.content && (
                    <div className="child-protection-content">
                        <div className="child-protection-markdown">
                            <MarkdownComponent markdown={childProtectionData.content} />
                        </div>
                    </div>
                )}

                {/* Stopka kontaktowa */}
                {/* <div className="child-protection-footer">
                    <div className="child-protection-footer-header">
                        <i className="pi pi-info-circle"></i>
                        <span className="child-protection-footer-title">Informacje kontaktowe</span>
                    </div>
                    <p className="child-protection-footer-text">
                        W przypadku pytań lub potrzeby zgłoszenia niepokojących sytuacji, 
                        prosimy o kontakt z proboszczem lub koordynatorem ds. ochrony dzieci.
                    </p>
                    <div className="child-protection-buttons">
                        <button 
                            className="child-protection-button primary"
                            onClick={() => window.location.href = 'tel:574922800'}
                        >
                            <i className="pi pi-phone"></i>
                            Zadzwoń
                        </button>
                        <button 
                            className="child-protection-button secondary"
                            onClick={() => window.location.href = 'mailto:swzygmuntszydlowiec@diecezja.pl'}
                        >
                            <i className="pi pi-envelope"></i>
                            Napisz email
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ChildProtectionStandards;