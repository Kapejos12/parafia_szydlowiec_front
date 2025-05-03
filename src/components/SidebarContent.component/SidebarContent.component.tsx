// SidebarContent.tsx
import React from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';

const SidebarContent: React.FC = () => {
    const navigate = useNavigate();

    // const formatDate = (dateString: string): string => {
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString('pl-PL', {
    //         day: 'numeric',
    //         month: 'long',
    //         year: 'numeric'
    //     });
    // };

    // Custom panel header template with styled headers
    const customHeader = (title: string) => {
        return (
            <div className="flex align-items-center justify-content-center">
                <span className="text-xl font-semibold text-primary">{title}</span>
            </div>
        );
    };

    return (
        <div className="parish-sidebar bg-white shadow-2 p-3 border-round" style={{ backgroundColor: '#f0f0f0' }}>
            <h2 className="text-2xl font-bold mb-4 text-center text-primary border-bottom-1 border-primary pb-2">
                Informacje parafialne
            </h2>

            {/* Godziny Mszy Świętych */}
            <Panel
                headerTemplate={() => customHeader("Godziny Mszy Świętych")}
                className="mb-4 border-1 border-200"
                toggleable
            >
                <div className="flex flex-column gap-3 ">
                    <div className="p-2 surface-100 border-round">
                        <h4 className="font-bold mb-2 text-primary">Niedziele i święta:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
                            7:00, 9:00, 10:30, 12:00, 18:00
                        </p>
                    </div>
                    <Divider />
                    <div className="p-2 surface-100 border-round align-items-center">
                        <h4 className="font-bold mb-2 text-primary">Dni powszednie:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
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
                <div className="flex flex-column gap-3">
                    <div className="p-2 surface-100 border-round justify-content-center">
                        <h4 className="font-bold mb-2 text-primary">M.B. Nieustającej Pomocy:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
                            Środa po Mszy o godzinie 18:00
                        </p>
                    </div>
                    <Divider />
                    <div className="p-2 surface-100 border-round align-items-center">
                        <h4 className="font-bold mb-2 text-primary">Koronka do Miłosierdzia Bożego:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
                            Piątek: 17:15
                        </p>
                    </div>
                    <Divider />
                    <div className="p-2 surface-100 border-round align-items-center">
                        <h4 className="font-bold mb-2 text-primary">Nabożeństwo różańcowe - październik:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
                            Dni powszednie: 17:00 | Niedziela: 16:30
                        </p>
                    </div>
                    <Divider />
                    <div className="p-2 surface-100 border-round align-items-center">
                        <h4 className="font-bold mb-2 text-primary">Nabożeństwa majowe, czerwcowe:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
                            Dni powszednie: 17:00 | Sobota: 17:30 | Niedziela: 16:30
                        </p>
                    </div>
                    <Divider />
                    <div className="p-2 surface-100 border-round align-items-center">
                        <h4 className="font-bold mb-2 text-primary">Gorzkie Żale - Wielki Post:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
                            Niedziela: 16:30
                        </p>
                    </div>
                    <Divider />
                    <div className="p-2 surface-100 border-round align-items-center">
                        <h4 className="font-bold mb-2 text-primary align-items-center">Droga Krzyżowa - Wielki Post:</h4>
                        <p className="text-lg font-medium text-center bg-white p-2 border-round shadow-1">
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
                <div className="flex flex-column gap-3">
                    <div className="flex align-items-start p-2 surface-100 border-round">
                        <i className="pi pi-clock text-primary text-2xl mr-3 mt-1"></i>
                        <div>
                            <h4 className="font-bold mb-2 text-primary">Godziny otwarcia:</h4>
                            <div className="bg-white p-2 border-round shadow-1">
                                <p className="mb-2">Poniedziałek - Piątek: <span className="font-medium">16:00-17:30</span></p>
                                <p>Sobota: <span className="font-medium">9:00-10:30</span></p>
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
                <div className="flex flex-column align-items-center">
                    <Calendar
                        inline
                        style={{ width: '100%' }}
                        className="border-1 border-200 shadow-1 p-2 border-round"
                    />
                    <div className="flex justify-content-center mt-3">
                        <Button
                            label="Zobacz wydarzenia"
                            icon="pi pi-calendar"
                            className="p-button-raised p-button-primary"
                            onClick={() => navigate('/wydarzenia')}
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
                <div className="p-2 surface-100 border-round">
                    <div className="bg-white p-3 border-round shadow-1">
                        <p className="flex align-items-center mb-3">
                            <i className="pi pi-map-marker text-primary text-xl mr-3"></i>
                            <span className="font-medium">ul. Zakościelna 13, 26-500 Szydłowiec</span>
                        </p>
                        <p className="flex align-items-center mb-3">
                            <i className="pi pi-phone text-primary text-xl mr-3"></i>
                            <span className="font-medium">Telefon: 574 922 900</span>
                        </p>
                        <p className="flex align-items-center">
                            <i className="pi pi-envelope text-primary text-xl mr-3"></i>
                            <span className="font-medium">Email: swzygmuntszydlowiec@interia.pl</span>
                        </p>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default SidebarContent;