import { Outlet } from "react-router-dom"
import HeaderComponent from "./Header.component"
import HeroComponent from "./Hero.component"

import kosciol from '../assets/kosciol.jpeg';

const LayoutComponent = () => {
    return (
        <div>
            <HeaderComponent />
            <HeroComponent backgroundImage={kosciol} title="Parafia Św Zygmunta w Szydłowcu" />
            <div style={{ display: "flex", minHeight: 'calc(100vh - 200px)' }}>
                <div style={{ flex: 1, padding: '20px' }}>
                    <Outlet />
                </div>

                <aside style={{ width: '250px', backgroundColor: '#f0f0f0', padding: '20px' }}>
                    <h2>Sidebar</h2>
                    <p>Tu będą najwajniejsze informacje</p>
                </aside>
            </div>
        </div>
    )
}

export default LayoutComponent