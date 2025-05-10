import { Outlet } from "react-router-dom"
import HeaderComponent from "../Header.component/Header.component"
import HeroComponent from "../Hero.component/Hero.component"
import kosciol from '../../assets/kosciol.jpeg';
import React, { useEffect, useState } from "react";
import SidebarContent from "../SidebarContent.component/SidebarContent.component";
import { Button } from 'primereact/button';

import './layout-styles.css';

const LayoutComponent: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    // Sprawdza czy urządzenie jest mobilne (szerokość < 768px)
    const isMobile = windowWidth < 768;

    // Nasłuchiwanie zmian rozmiaru okna
    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
            // Ukryj sidebar automatycznie gdy przejdziemy na widok mobilny
            if (newWidth < 960) {
                setShowSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.pageYOffset > 300);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // na wypadek scrolla już przy starcie

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Funkcja przełączająca widoczność sidebara na urządzeniach mobilnych
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <HeaderComponent />
            <HeroComponent backgroundImage={kosciol} title="Parafia Św Zygmunta w Szydłowcu" />

            {/* Przycisk przełączający sidebar (widoczny tylko na urządzeniach mobilnych) */}
            {isMobile && (
                <div className="sidebar-toggle-container">
                    <Button
                        icon={showSidebar ? "pi pi-times" : "pi pi-bars"}
                        onClick={toggleSidebar}
                        className="p-button-rounded p-button-primary sidebar-toggle-button"
                        aria-label={showSidebar ? "Zamknij panel boczny" : "Otwórz panel boczny"}
                    />
                </div>
            )}

            <div className="layout-container">
                {/* Główna treść */}
                <div className={`main-content ${isMobile && showSidebar ? 'shifted' : ''}`}>
                    <Outlet />
                </div>

                {/* Sidebar - różne style dla mobilnych i desktopowych */}
                <aside
                    className={`sidebar ${isMobile ? 'mobile' : 'desktop'} ${showSidebar ? 'show' : ''}`}
                >
                    <SidebarContent onClose={isMobile ? toggleSidebar : undefined} />
                </aside>
            </div>

            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                    aria-label="Wróć na górę strony"
                >
                    ↑ Do góry
                </button>
            )}
        </div>
    )
}

export default LayoutComponent