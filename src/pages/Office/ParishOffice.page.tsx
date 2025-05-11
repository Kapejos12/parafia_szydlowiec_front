import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';
import MarkdownComponent from '../../components/Markdown.component/Markdown.component';
import './ParishOfficePage.css';
import { fetchSacraments } from '../../utils/api';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useQuery } from '@tanstack/react-query';

// Definicja typu dla sakramentu z dodanym polem markdownContent
export interface Sacrament {
    id: number;
    name: string;
    icon: string;
    content: string;
}

const ParishOfficePage: React.FC = () => {
    // Dane o godzinach otwarcia kancelarii
    const officeHours = [
        { day: 'Poniedziałek', hours: '09:00 - 10:00 oraz 16:00 - 17:00' },
        { day: 'Wtorek', hours: '09:00 - 10:00 oraz 16:00 - 17:00' },
        { day: 'Środa', hours: '09:00 - 10:00 oraz 16:00 - 17:00' },
        { day: 'Czwartek', hours: '09:00 - 10:00 oraz 16:00 - 17:00' },
        { day: 'Piątek', hours: '09:00 - 10:00 oraz 16:00 - 17:00' },
        { day: 'Sobota', hours: '9:00 - 10:00' },
        { day: 'Niedziela', hours: 'Nieczynne' }
    ];

    // Pobieranie aktualności
    const {
        data,
        isLoading,
        error
    } = useQuery<Sacrament[]>({
        queryKey: ['posts'],
        queryFn: fetchSacraments,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000
    });

    // Funkcja do renderowania nagłówka AccordionTab z ikoną
    const sacramentHeader = (sacrament: Sacrament) => {
        return (
            <div className="sacrament-header">
                <span>{sacrament.name}</span>
            </div>
        );
    };

    // Renderowanie komponentu ładowania podczas pobierania danych
    const renderLoading = () => (
        <div className="loading-container">
            <ProgressSpinner />
            <p>Ładowanie informacji o sakramentach...</p>
        </div>
    );

    // Renderowanie komunikatu o błędzie, jeśli wystąpił
    const renderError = () => (
        <Message severity="error" text="Wystąpił błąd podczas pobierania informacji o sakramentach. Prosimy spróbować później." />
    );

    // Renderowanie akordeonów z sakramentami
    const renderSacraments = () => {
        if (!data || data.length === 0) {
            return (
                <Message severity="info" text="Brak informacji o sakramentach. Prosimy sprawdzić później." />
            );
        }

        return (
            <Accordion className="sacraments-accordion" activeIndex={0}>
                {data.map((sacrament: Sacrament) => (
                    <AccordionTab
                        key={sacrament.id}
                        header={sacramentHeader(sacrament)}
                        className="sacrament-tab"
                    >
                        <div className="sacrament-content markdown-wrapper">
                            <MarkdownComponent markdown={sacrament.content} />
                        </div>
                    </AccordionTab>
                ))}
            </Accordion>
        );
    };

    return (
        <div className="parish-office-page">
            <div className="container">
                <div className="page-header">
                    <h1>
                        <i className="pi pi-home"></i> Kancelaria Parafialna
                    </h1>
                </div>

                <div className="office-hours-section">
                    <h2>
                        <i className="pi pi-clock"></i> Godziny otwarcia kancelarii
                    </h2>
                    <div className="office-hours-card">
                        <Card className="office-card">
                            <div className="office-hours-content">
                                <div className="office-info">
                                    <div className="office-icon">
                                        <i className="pi pi-building"></i>
                                    </div>
                                    <div className="office-contact">
                                        <p><i className="pi pi-phone"></i> <strong>Telefon:</strong><a href="tel:+48574922900">+48 574 922 900</a></p>
                                        <p><i className="pi pi-envelope"></i> <strong>Email:</strong> <a href="mailto:swzygmuntszydlowiec@interia.pl">swzygmuntszydlowiec@interia.pl</a></p>
                                        <p><i className="pi pi-map-marker"></i> <strong>Adres:</strong> <a href="https://maps.app.goo.gl/pKLYNJrhFLV9Xd9r8">ul. Zakościelna 13, 26-500 Szydłowiec</a></p>
                                    </div>
                                </div>
                                <div className="hours-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th><i className="pi pi-calendar"></i> Dzień</th>
                                                <th><i className="pi pi-clock"></i> Godziny</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {officeHours.map((item, index) => (
                                                <tr key={index} className={item.hours === 'Nieczynne' ? 'closed-day' : ''}>
                                                    <td>{item.day}</td>
                                                    <td>
                                                        {item.hours === 'Nieczynne' ? (
                                                            <><i className="pi pi-times-circle"></i> {item.hours}</>
                                                        ) : (
                                                            <><i className="pi pi-check-circle"></i> {item.hours}</>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="sacraments-section">
                    <h2>
                        <i className="pi pi-book"></i> Sakramenty i wymagane dokumenty
                    </h2>
                    <p className="section-intro">
                        Poniżej znajdą Państwo informacje dotyczące sakramentów udzielanych w naszej parafii
                        oraz dokumenty wymagane do ich przyjęcia.
                    </p>

                    {isLoading ? renderLoading() : error ? renderError() : renderSacraments()}
                </div>

                <div className="notice-section">
                    <Card className="notice-card">
                        <div className="notice-icon">
                            <i className="pi pi-exclamation-circle"></i>
                        </div>
                        <h3><i className="pi pi-bell"></i> Ważne informacje</h3>
                        <p>
                            <i className="pi pi-phone"></i> W sprawach pilnych prosimy o kontakt telefoniczny. W kancelarii można także zamówić
                            intencje mszalne, odebrać zaświadczenia i załatwić inne sprawy kancelaryjne.
                        </p>
                        <p>
                            <i className="pi pi-clock"></i> Prosimy o punktualne przybycie w godzinach pracy kancelarii. W przypadku potrzeby
                            spotkania poza wyznaczonymi godzinami, prosimy o wcześniejszy kontakt telefoniczny.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ParishOfficePage;