import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import MarkdownComponent from '../../../components/Markdown.component/Markdown.component';
import { useQuery } from '@tanstack/react-query';
import { fetchPatron } from '../../../utils/api';

import './PatronPageStyles.css';
import patron from "../../../assets/swzygmunt2-kopia.jpg";

export interface Patron {
    name: string;
    title: string;
    feastDay: string;
    birthYear: string;
    deathYear: string;
    biography: string;
    patronOf: string[];
    prayer: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    imageUrl?: string;
}

const PatronPage: React.FC = () => {

    // Używamy hooka React Query do pobierania danych o patronie
    const { data: patronData, isLoading, error } = useQuery({
        queryKey: ['patron'],
        queryFn: () => fetchPatron(),
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000
    });

    // Renderowanie komponentu ładowania podczas pobierania danych
    if (isLoading) {
        return (
            <div className="patron-page">
                <div className="container">
                    <div className="loading-container">
                        <ProgressSpinner />
                        <p>Ładowanie informacji o patronie parafii...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Renderowanie komunikatu o błędzie, jeśli wystąpił
    if (error) {
        return (
            <div className="patron-page">
                <div className="container">
                    <Message
                        severity="error"
                        text="Wystąpił błąd podczas pobierania informacji o patronie parafii. Prosimy spróbować później."
                    />
                </div>
            </div>
        );
    }

    // Jeśli dane nie zostały znalezione
    if (!patronData) {
        return (
            <div className="patron-page">
                <div className="container">
                    <Message
                        severity="info"
                        text="Brak informacji o patronie parafii. Prosimy sprawdzić później."
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="patron-page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        <i className="pi pi-user"></i> {patronData.title}
                    </h1>
                </div>

                <div className="patron-content">
                    <div className="patron-main-info">
                        {/* Główna karta z informacjami o patronie */}
                        <Card className="patron-card">
                            <div className="patron-hero">
                                <div className="patron-image-container">
                                    <img
                                        src={patron}
                                        alt={`Święty ${patronData.title}`}
                                        className="patron-image"
                                    />
                                </div>
                                <div className="patron-details">
                                    <h2>Informacje o świętym</h2>
                                    <div className="patron-fact-row">
                                        <i className="pi pi-calendar"></i>
                                        <div>
                                            <strong>Wspomnienie:</strong> {patronData.feastDay}
                                        </div>
                                    </div>
                                    <div className="patron-fact-row">
                                        <i className="pi pi-star"></i>
                                        <div>
                                            <strong>Lata życia:</strong> {patronData.birthYear} - {patronData.deathYear}
                                        </div>
                                    </div>
                                    <div className="patron-fact-row">
                                        <i className="pi pi-shield"></i>
                                        <div>
                                            <strong>Patron:</strong>
                                            <ul className="patron-list">
                                                {patronData.patronOf.map((item: string, index: number) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Divider className="section-divider" />

                    {/* Biografia */}
                    <section className="patron-section">
                        <h2 className="section-title">
                            <i className="pi pi-book"></i> Życiorys
                        </h2>
                        <Card className="biography-card">
                            <div className="markdown-wrapper">
                                <MarkdownComponent markdown={patronData.biography} />
                            </div>
                        </Card>
                    </section>

                    <Divider className="section-divider" />

                    {/* Modlitwa */}
                    <section className="patron-section">
                        <h2 className="section-title">
                            <i className="pi pi-heart"></i> Modlitwa do św. {patronData.name}
                        </h2>
                        <Card className="prayer-card">
                            <div className="prayer-content">
                                <MarkdownComponent markdown={patronData.prayer} />
                            </div>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PatronPage;