import { Outlet } from "react-router-dom"
import HeaderComponent from "../Header.component/Header.component"
import HeroComponent from "../Hero.component/Hero.component"
import kosciol from '../../assets/kosciol.jpeg';
import logo from '../../assets/header.png';
import React, { useEffect, useRef, useState } from "react";
import SidebarContent from "../SidebarContent.component/SidebarContent.component";
import { Button } from 'primereact/button';

import './layout-styles.css';

const LayoutComponent: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const vaticanIframeRef = useRef<HTMLIFrameElement>(null);

    const isMobile = windowWidth < 768;

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
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
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Obsługa dynamicznej wysokości iFrame Vatican News
    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (!e.data || e.data.source !== 'vn-embed') return;
            if (vaticanIframeRef.current) {
                vaticanIframeRef.current.style.height = e.data.height + 'px';
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div>
            <HeaderComponent />
            <HeroComponent backgroundImage={kosciol} imageUrl={logo} />

            {isMobile && (
                <div translate="no" className="sidebar-toggle-container">
                    <Button
                        icon={showSidebar ? "pi pi-times" : "pi pi-bars"}
                        onClick={toggleSidebar}
                        className="p-button-rounded p-button-primary sidebar-toggle-button"
                        aria-label={showSidebar ? "Zamknij panel boczny" : "Otwórz panel boczny"}
                    />
                </div>
            )}

            <div translate="no" className="layout-container">
                <div className={`main-content ${isMobile && showSidebar ? 'shifted' : ''}`}>
                    <Outlet />
                </div>

                <aside
                    translate="no"
                    className={`sidebar ${isMobile ? 'mobile' : 'desktop'} ${showSidebar ? 'show' : ''}`}
                >
                    <SidebarContent onClose={isMobile ? toggleSidebar : undefined} />
                </aside>
            </div>

            {/* Widget Vatican News */}
            <section className="vatican-news-section">
                <iframe
                    ref={vaticanIframeRef}
                    id="VaticanNews"
                    src="https://vaticannews.pl/news?lang=pl&template=full&count=8&fs=16&link=%23235787&date=%23828282&video=1&brand=1&cols=full"
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Vatican News"
                />
            </section>

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