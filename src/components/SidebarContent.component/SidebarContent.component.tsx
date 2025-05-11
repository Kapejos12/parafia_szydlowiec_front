import React from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';

import './sidebar-styles.css';

interface SidebarContentProps {
    onClose?: () => void; // Opcjonalna funkcja do zamykania sidebara na urządzeniach mobilnych
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onClose }) => {
    const navigate = useNavigate();

    // Custom panel header template with styled headers
    const customHeader = (title: string) => {
        return (
            <div className="panel-header-wrapper">
                <span>{title}</span>
            </div>
        );
    };

    // Funkcja nawigacji która zamyka sidebar na urządzeniach mobilnych
    const handleNavigate = (path: string) => {
        navigate(path);
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="parish-sidebar shadow-2 p-3 border-round">
            <div className="sidebar-header">
                <h2 className="border-bottom-1 border-primary pb-2">
                    Informacje parafialne
                </h2>

                {/* Przycisk zamykania - tylko w wersji mobilnej */}
                {onClose && (
                    <Button
                        icon="pi pi-times"
                        className="p-button-rounded p-button-text close-button"
                        onClick={onClose}
                        aria-label="Zamknij panel boczny"
                    />
                )}
            </div>

            {/* Godziny Mszy Świętych */}
            <Panel
                headerTemplate={() => customHeader("Godziny Mszy Świętych")}
                className="mb-4 border-1 border-200"
                toggleable
            >
                <div className="flex-column gap-3">
                    <div className="surface-100">
                        <h4>Niedziele i święta:</h4>
                        <p className="text-lg text-center shadow-1">
                            7:00, 9:00, 10:30, 12:00, 18:00
                        </p>
                    </div>
                    <Divider />
                    <div className="surface-100">
                        <h4>Dni powszednie:</h4>
                        <p className="text-lg text-center shadow-1">
                            7:00, 7:30, 17:30, 18:00
                        </p>
                    </div>
                </div>
            </Panel>

            {/* Nabożeństwa */}
            <Panel
                headerTemplate={() => customHeader("Nabożeństwa")}
                className="mb-4 border-1 border-200"
                toggleable
            >
                <div className="flex-column gap-3">
                    <div className="surface-100">
                        <h4>M.B. Nieustającej Pomocy:</h4>
                        <p className="text-lg text-center shadow-1">
                            Środa po Mszy o godzinie 18:00
                        </p>
                    </div>
                    <Divider />
                    <div className="surface-100">
                        <h4>Koronka do Miłosierdzia Bożego:</h4>
                        <p className="text-lg text-center shadow-1">
                            Piątek: 17:15
                        </p>
                    </div>
                    <Divider />
                    <div className="surface-100">
                        <h4>Nabożeństwo różańcowe - październik:</h4>
                        <p className="text-lg text-center shadow-1">
                            Dni powszednie: 17:00 | Niedziela: 16:30
                        </p>
                    </div>
                    <Divider />
                    <div className="surface-100">
                        <h4>Nabożeństwa majowe, czerwcowe:</h4>
                        <p className="text-lg text-center shadow-1">
                            Dni powszednie: 17:00 | Sobota: 17:30 | Niedziela: 16:30
                        </p>
                    </div>
                    <Divider />
                    <div className="surface-100">
                        <h4>Gorzkie Żale - Wielki Post:</h4>
                        <p className="text-lg text-center shadow-1">
                            Niedziela: 16:30
                        </p>
                    </div>
                    <Divider />
                    <div className="surface-100">
                        <h4>Droga Krzyżowa - Wielki Post:</h4>
                        <p className="text-lg text-center shadow-1">
                            Dla dzieci: 16:00 | Dla dorosłych: 17:00
                        </p>
                    </div>
                </div>
            </Panel>

            {/* Kancelaria */}
            <Panel
                headerTemplate={() => customHeader("Kancelaria parafialna")}
                className="mb-4 border-1 border-200"
                toggleable
            >
                <div className="flex-column gap-3">
                    <div className="flex align-items-start surface-100">
                        <i className="pi pi-clock icon"></i>
                        <div>
                            <h4>Godziny otwarcia:</h4>
                            <div className="shadow-1">
                                <p className="mb-2"><b>Poniedziałek - Piątek: </b><span className="font-medium">09:00-10:00 <br /> oraz <br /> 16:00-17:30</span></p>
                                <p><b>Sobota: </b><span className="font-medium"><br />9:00-10:30</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>

            {/* Kalendarz wydarzeń */}
            <Panel
                headerTemplate={() => customHeader("Kalendarz wydarzeń")}
                className="mb-4 border-1 border-200"
                toggleable
            >
                <div className="flex-column align-items-center">
                    <Calendar
                        inline
                        style={{ width: '100%' }}
                        className="border-1 border-200 shadow-1 p-2 border-round"
                    />
                    <div className="event-button-container">
                        <Button
                            label="Zobacz wydarzenia"
                            icon="pi pi-calendar"
                            className="p-button-raised p-button-primary"
                            onClick={() => handleNavigate('/wydarzenia')}
                        />
                    </div>
                </div>
            </Panel>

            {/* Dane kontaktowe */}
            <Panel
                headerTemplate={() => customHeader("Kontakt")}
                className="mb-4 border-1 border-200"
                toggleable
            >
                <div className="surface-100">
                    <div className="contact-container">
                        <p className="contact-item">
                            <i className="pi pi-map-marker contact-icon"></i>
                            <a href="https://maps.app.goo.gl/pKLYNJrhFLV9Xd9r8">ul. Zakościelna 13, 26-500 Szydłowiec</a>
                        </p>
                        <p className="contact-item">
                            <i className="pi pi-phone contact-icon"></i>
                            <a href="tel:+48574922900"><span className="font-medium">Telefon: 574 922 900</span></a>
                        </p>
                        <p className="contact-item">
                            <i className="pi pi-envelope contact-icon"></i>
                            <a href="mailto:swzygmuntszydlowiec@interia.pl"><span className="font-medium">Email: swzygmuntszydlowiec<br />@interia.pl</span></a>
                        </p>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default SidebarContent;