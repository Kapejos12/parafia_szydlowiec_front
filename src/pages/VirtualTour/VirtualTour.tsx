import { useEffect, useRef, useState } from 'react';
import './VirtualTourStyles.css';

// Importuj swoje zdjęcia sferyczne
import panorama1 from '../../assets/entrance.jpg';
import panorama2 from '../../assets/middle.jpg';
import panorama3 from '../../assets/altar.jpg';
import panorama4 from '../../assets/altar2.jpg';
import { Scene } from '../../utils/types';

// Konfiguracja scen
const scenes: Scene[] = [
    {
        id: 1,
        name: 'Wejście',
        description: 'Główne wejście do budynku',
        panorama: panorama1
    },
    {
        id: 2,
        name: 'Środek',
        description: 'Centralna część budynku',
        panorama: panorama2
    },
    {
        id: 3,
        name: 'Ołtarz',
        description: 'Główny ołtarz',
        panorama: panorama3
    },
    {
        id: 4,
        name: 'Ołtarz - widok 2',
        description: 'Drugi widok na ołtarz',
        panorama: panorama4
    }
];

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        AFRAME: any;
    }
}

export default function VirtualTour360() {
    const aframeContainerRef = useRef<HTMLDivElement>(null);
    const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [aframeLoaded, setAframeLoaded] = useState(false);

    // Ładowanie A-Frame
    useEffect(() => {
        if (window.AFRAME) {
            setAframeLoaded(true);
            setIsLoading(false);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        script.onload = () => {
            console.log('✅ A-Frame załadowany pomyślnie');
            setAframeLoaded(true);

            setTimeout(() => {
                setIsLoading(false);
                initializeScene();
            }, 500);
        };
        script.onerror = () => {
            console.error('❌ Nie udało się załadować A-Frame');
            setIsLoading(false);
        };
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Inicjalizacja sceny A-Frame
    const initializeScene = () => {
        if (!aframeContainerRef.current || !window.AFRAME) return;

        // Wyczyść kontener
        aframeContainerRef.current.innerHTML = '';

        // Utwórz scenę A-Frame
        const aScene = document.createElement('a-scene');
        aScene.setAttribute('embedded', '');
        aScene.setAttribute('style', 'width: 100%; height: 100%;');
        aScene.setAttribute('vr-mode-ui', 'enabled: false');
        aScene.setAttribute('device-orientation-permission-ui', 'enabled: false');

        // Dodaj assets
        const assets = document.createElement('a-assets');
        scenes.forEach((scene) => {
            const img = document.createElement('img');
            img.id = `panorama${scene.id}`;
            img.src = scene.panorama;
            img.crossOrigin = 'anonymous';
            assets.appendChild(img);
        });
        aScene.appendChild(assets);

        // Dodaj sky (panorama)
        const sky = document.createElement('a-sky');
        sky.id = 'panorama-sky';
        sky.setAttribute('src', `#panorama${currentScene.id}`);
        sky.setAttribute('rotation', '0 -130 0');
        aScene.appendChild(sky);

        // Dodaj kamerę z kontrolkami - ulepszone dla mobile
        const cameraRig = document.createElement('a-entity');
        cameraRig.id = 'cameraRig';

        const camera = document.createElement('a-camera');
        camera.setAttribute('look-controls', 'enabled: true; touchEnabled: true; magicWindowTrackingEnabled: true; pointerLockEnabled: false');
        camera.setAttribute('wasd-controls', 'enabled: false');
        camera.setAttribute('position', '0 0 0');
        camera.setAttribute('fov', '80');

        // Dodaj responsywne ustawienia FOV
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            camera.setAttribute('fov', '90');
            camera.setAttribute('look-controls', 'enabled: true; touchEnabled: true; magicWindowTrackingEnabled: true; pointerLockEnabled: false; reverseDragDirection: false');
        }

        cameraRig.appendChild(camera);
        aScene.appendChild(cameraRig);

        aframeContainerRef.current.appendChild(aScene);
        console.log('🎬 Scena A-Frame zainicjalizowana dla:', currentScene.name);
    };

    // Zmiana sceny
    const changeScene = (newScene: Scene) => {
        setIsLoading(true);
        console.log('🔄 Zmiana sceny na:', newScene.name);

        setTimeout(() => {
            setCurrentScene(newScene);
            setIsLoading(false);
            initializeScene();
        }, 500);
    };

    const handleSceneChange = (sceneId: number) => {
        const newScene = scenes.find(s => s.id === sceneId);
        if (newScene) {
            changeScene(newScene);
        }
    };

    // Reinicjalizuj scenę po zmianie currentScene
    useEffect(() => {
        if (aframeLoaded && !isLoading) {
            initializeScene();
        }
    }, [currentScene, aframeLoaded]);

    if (!aframeLoaded) {
        return (
            <div className="virtual-tour-container">
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="text-primary font-semibold">
                            Ładowanie A-Frame VR...
                        </p>
                        <p className="text-secondary text-small mt-4">
                            Framework do panoram 360°
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="virtual-tour-container">
            <div className="tour-grid">

                {/* 1. Instrukcja obsługi - lewy górny */}
                <div className="glass-panel instruction-panel">
                    <h2 className="panel-title">
                        📚 Instrukcja obsługi
                    </h2>

                    <div className="instruction-content">
                        <div>
                            <h3 className="section-title">
                                🖱️ Sterowanie na komputerze
                            </h3>
                            <ul className="instruction-list">
                                <li>• <strong>Przeciągnij myszą</strong> - rozglądaj się w panoramie 360°</li>
                                <li>• <strong>Kółko myszy</strong> - przybliż/oddal obraz (zoom)</li>
                                <li>• <strong>Menu nawigacji</strong> - wybierz lokalizację z prawej strony</li>
                                <li>• <strong>Pełny ekran</strong> - naciśnij F11 dla lepszych wrażeń</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="section-title">
                                📱 Sterowanie na telefonie/tablecie
                            </h3>
                            <ul className="instruction-list">
                                <li>• <strong>Przeciągnij palcem</strong> - rozglądaj się wokół</li>
                                <li>• <strong>Pinch to zoom</strong> - przybliż/oddal dwoma palcami</li>
                                <li>• <strong>Obrót urządzenia</strong> - automatyczny ruch kamery</li>
                                <li>• <strong>Dotknij lokalizację</strong> - przejdź do wybranego miejsca</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="section-title">
                                🧭 Jak nawigować
                            </h3>
                            <ul className="instruction-list">
                                <li>• <strong>Lista lokalizacji</strong> - po prawej stronie ekranu</li>
                                <li>• <strong>Kliknij nazwę</strong> - aby przejść do wybranego miejsca</li>
                                <li>• <strong>Aktywna lokalizacja</strong> - oznaczona symbolem 📍</li>
                                <li>• <strong>Animacja ładowania</strong> - podczas przejścia między scenami</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="section-title">
                                ⚡ Wskazówki i porady
                            </h3>
                            <ul className="instruction-list">
                                <li>• <strong>Szybki internet</strong> - dla płynnego ładowania panoram</li>
                                <li>• <strong>Gogle VR</strong> - kompatybilne z headsetami WebXR</li>
                                <li>• <strong>Słuchawki</strong> - przygotowanie na dźwięk przestrzenny</li>
                                <li>• <strong>Eksploracja</strong> - poświęć czas na oglądanie detali</li>
                            </ul>
                        </div>

                        <div className="status-section">
                            <h3 className="section-title">
                                🔧 Informacje techniczne
                            </h3>
                            <div className="text-xs text-secondary">
                                <p><strong>Format:</strong> Panoramy equirectangular 360°</p>
                                <p><strong>Technologia:</strong> A-Frame WebXR + React</p>
                                <p><strong>Kompatybilność:</strong> Wszystkie nowoczesne przeglądarki</p>
                                <p><strong>Rozdzielczość:</strong> Najlepiej 4K+ dla optymalnej jakości</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Nawigacja - prawy górny */}
                <div className="glass-panel navigation-panel">
                    <h2 className="panel-title">
                        📍 Nawigacja między scenami
                    </h2>

                    <div className="navigation-content">
                        <div>
                            {scenes.map((scene) => (
                                <button
                                    key={scene.id}
                                    onClick={() => handleSceneChange(scene.id)}
                                    className={`nav-button ${scene.id === currentScene.id ? 'active' : ''}`}
                                    disabled={isLoading}
                                >
                                    <div className="nav-button-content">
                                        <div className="nav-button-title">{scene.name}</div>
                                        <div className="nav-button-description">{scene.description}</div>
                                        {isLoading && scene.id === currentScene.id && (
                                            <div className="status-indicator text-small">
                                                <div className="loading-spinner" style={{ width: '16px', height: '16px', border: '2px solid transparent', borderBottom: '2px solid var(--color-accent)' }}></div>
                                                <span className="text-secondary">Ładowanie...</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="nav-button-icon">
                                        {scene.id === currentScene.id ? '📍' : '📷'}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="status-section">
                            <h3 className="section-title">
                                ℹ️ Aktualny status
                            </h3>
                            <div className="text-small">
                                <div className="status-item">
                                    <span className="text-secondary">Aktywna scena:</span>
                                    <span className="text-primary font-semibold">
                                        {currentScene.name}
                                    </span>
                                </div>
                                <div className="status-item">
                                    <span className="text-secondary">Status:</span>
                                    <div className="status-indicator">
                                        <div className={`status-dot ${isLoading ? 'loading' : 'ready'}`}></div>
                                        <span className="text-primary font-semibold">
                                            {isLoading ? 'Ładowanie' : 'Gotowe'}
                                        </span>
                                    </div>
                                </div>
                                <div className="status-item">
                                    <span className="text-secondary">Dostępne sceny:</span>
                                    <span className="text-primary font-semibold">
                                        {scenes.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Wirtualny spacer - dolny rząd (pełna szerokość) */}
                <div className="glass-panel panorama-panel">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="panel-title">
                            🏛️ Wirtualny Spacer - {currentScene.name}
                        </h2>
                        <div className="text-small text-secondary">
                            {currentScene.description}
                        </div>
                    </div>

                    <div className="panorama-container">
                        <div
                            ref={aframeContainerRef}
                            style={{ width: '100%', height: '100%' }}
                        />

                        {/* Loading Overlay */}
                        {isLoading && (
                            <div className="loading-overlay">
                                <div className="loading-content">
                                    <div className="loading-spinner"></div>
                                    <p className="text-primary font-semibold">
                                        Ładowanie panoramy...
                                    </p>
                                    <p className="text-secondary text-small mt-4">
                                        {currentScene.name}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}