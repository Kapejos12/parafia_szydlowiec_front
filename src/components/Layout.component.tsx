import { Outlet } from "react-router-dom"
import HeaderComponent from "./Header.component"
import HeroComponent from "./Hero.component"

import kosciol from '../assets/kosciol.jpeg';
import React, { useState } from "react";

const LayoutComponent: React.FC = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    return (
        <div>
            <HeaderComponent />
            <HeroComponent backgroundImage={kosciol} title="Parafia Św Zygmunta w Szydłowcu" />
            <div style={{ display: "flex", minHeight: 'calc(100vh - 200px)' }}>
                <div style={{ flex: 1, padding: '20px' }}>
                    <Outlet />
                </div>

                <aside
                    style={{
                        width: showSidebar ? '25%' : '30px',
                        backgroundColor: '#f0f0f0',
                        padding: showSidebar ? '20px' : '0',
                        overflow: 'hidden',
                        transition: 'width 0.3s ease, padding 0.3s ease'
                    }}
                    onMouseEnter={() => setShowSidebar(true)}
                    onMouseLeave={() => setShowSidebar(false)}
                >
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