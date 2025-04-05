import { Outlet } from "react-router-dom"
import HeaderComponent from "./Header.component"
import HeroComponent from "./Hero.component"

import kosciol from '../assets/kosciol.jpeg';
import React, { useEffect, useMemo, useState } from "react";

const LayoutComponent: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [markerTop, setMarkerTop] = useState<number>(0);
    const asideRef = React.useRef<HTMLDivElement>(null);
    const markerHeight = 30; // stała wysokość markera

    // Nasłuchiwanie zmian rozmiaru okna
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ustalenie czy urządzenie jest mobilne
    const isMobile = windowWidth < 960;

    // Wyliczenie szerokości sidebaru
    const sidebarWidth = useMemo(() => {
        if (showSidebar) {
            return isMobile ? windowWidth : windowWidth * 0.25;
        } else {
            return 30;
        }
    }, [showSidebar, windowWidth, isMobile]);

    // Ustalenie paddingu sidebaru
    const sidebarPadding = showSidebar ? (isMobile ? 10 : 20) : 0;

    // Obliczenie pozycji markera na osi X
    const markerLeft = useMemo(() => {
        if (isMobile) {
            return showSidebar ? 10 : windowWidth - 30 - 30;
        } else {
            return showSidebar ? windowWidth * 0.75 - 30 : windowWidth - 30 - 30;
        }
    }, [showSidebar, windowWidth, isMobile]);

    // Dla urządzeń mobilnych obliczamy dynamiczną pozycję markera względem sidebaru
    useEffect(() => {
        if (isMobile && asideRef.current) {
            const rect = asideRef.current.getBoundingClientRect();
            let newMarkerTop = rect.top + rect.height / 2;
            // Klamrujemy wartość newMarkerTop, aby nie wychodziła poza widok
            if (newMarkerTop < markerHeight / 2) {
                newMarkerTop = markerHeight / 2;
            } else if (newMarkerTop > window.innerHeight - markerHeight / 2) {
                newMarkerTop = window.innerHeight - markerHeight / 2;
            }
            setMarkerTop(newMarkerTop);
        }
    }, [isMobile, showSidebar, windowWidth]);

    // Handler dla urządzeń mobilnych
    const toggleSidebar = () => {
        if (isMobile) {
            setShowSidebar(prev => !prev);
        }
    };

    return (
        <div>
            <HeaderComponent />
            <HeroComponent backgroundImage={kosciol} title="Parafia Św Zygmunta w Szydłowcu" />
            <div style={{ display: "flex", minHeight: 'calc(100vh - 200px)' }}>
                <div style={{ flex: 1, padding: '20px' }}>
                    <Outlet />
                </div>

                <aside
                    ref={asideRef}
                    style={{
                        position: 'relative',
                        width: typeof sidebarWidth === 'number' ? `${sidebarWidth}px` : sidebarWidth,
                        backgroundColor: '#f0f0f0',
                        padding: `${sidebarPadding}px`,
                        overflow: 'hidden',
                        transition: 'width 0.3s ease, padding 0.3s ease'
                    }}
                    onMouseEnter={!isMobile ? () => setShowSidebar(true) : undefined}
                    onMouseLeave={!isMobile ? () => setShowSidebar(false) : undefined}
                    onClick={isMobile ? toggleSidebar : undefined}
                >
                    {/* Marker pozycjonowany fixed, by opierać się na wymiarach okna */}
                    <div
                        style={{
                            position: 'fixed',
                            top: isMobile ? `${markerTop}px` : '50%', // desktop: 50%, mobile: dynamic
                            left: `${markerLeft}px`,
                            transform: 'translateY(-50%)',
                            width: `${markerHeight}px`,
                            height: `${markerHeight}px`,
                            backgroundColor: '#ccc',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            userSelect: 'none',
                            zIndex: 1000,
                            transition: 'left 0.3s ease, top 0.3s ease',
                            fontSize: '20px',
                        }}
                    >
                        {showSidebar ? '>' : '<'}
                    </div>
                    {showSidebar && (
                        <>
                            <h2>Sidebar</h2>
                            <p>Tu będą najwajniejsze informacje</p>
                        </>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default LayoutComponent