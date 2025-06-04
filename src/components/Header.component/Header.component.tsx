import { MegaMenu } from 'primereact/megamenu';
import { MenuItem } from 'primereact/menuitem';
import { useEffect, useState } from 'react';

const HeaderComponent: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            if (currentScrollPosition === 0) {
                setIsVisible(true); // pokaż menu tylko gdy jesteśmy na samej górze
            } else {
                setIsVisible(false); // ukryj menu
            }

            setPrevScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);

        // Wywołanie od razu na starcie, jeśli komponent ładuje się już ze scrolla
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPosition]);

    const menuItems: MenuItem[] = [
        {
            label: "Strona główna",
            url: '/'
        },
        {
            label: "Galerie zdjęć",
            url: "https://www.facebook.com/swzygmunt/photos?tab=albums",
            target: "_blank"
        },
        {
            label: "Parafia",
            items: [
                [
                    {
                        items: [
                            { label: "Patron Św. Zygmunt", url: '/patron' },
                            { label: "Historia parafii", url: '/historia' },
                            { label: "Ochrona dzieci", url: '/ochrona-dzieci' },
                        ]
                    },
                ],
                [
                    {
                        items: [
                            { label: "Duszpasterze", url: '/duszpasterze' },
                            { label: "Grupy parafialne", url: "/grupy-parafialne" },
                            { label: "Kurs przedmałżeński", url: '/kurs-przedmalzenski' },

                        ]
                    }
                ]
            ]
        },
        { label: "Kancelaria", url: '/kancelaria' },
        { label: "Kontakt", url: '/kontakt' },
        {
            label: "Cmentarz",
            url: "https://szydlowiec.grobonet.com/grobonet/start.php",
            target: "_blank"
        },
        { label: "Wirtualny spacer", url: '/wirtualny-spacer' },
    ];

    return (
        <header>
            {isVisible && (
                <div className="flex items-center space-x-4" style={{ backgroundColor: "var(--color-accent)" }}>
                    <MegaMenu
                        model={menuItems}
                        className="custom-megamenu"
                        breakpoint="960px"
                    />
                </div>
            )}
        </header>
    )
}

export default HeaderComponent;