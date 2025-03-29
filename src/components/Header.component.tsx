import { MegaMenu } from 'primereact/megamenu';
import { MenuItem } from 'primereact/menuitem';
import { useEffect, useState } from 'react';

const HeaderComponent: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            if (currentScrollPosition > prevScrollPosition) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setPrevScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);

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
            label: "Aktualności",
            url: '/aktualnosci'
        },
        {
            label: "Ogłoszenia",
            url: '/ogloszenia'
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
    ];

    return (
        <header>
            {isVisible && (
                <div className="flex items-center space-x-4">
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