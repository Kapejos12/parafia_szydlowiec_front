import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPanoramas } from '../../utils/api';
import { Scene } from '../../utils/types';
import './VirtualTourStyles.css';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        AFRAME: any;
    }
}

const STRAPI_URL = import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
    : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;

const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
};

export default function VirtualTour360() {
    const aframeContainerRef = useRef<HTMLDivElement>(null);
    const [currentScene, setCurrentScene] = useState<Scene | null>(null);
    const [isSceneLoading, setIsSceneLoading] = useState(false);
    const [aframeLoaded, setAframeLoaded] = useState(false);

    // Pobieranie danych panoram
    const { data: panoramas, isLoading: isPanoramasLoading, error } = useQuery({
        queryKey: ['panoramas'],
        queryFn: fetchPanoramas,
        staleTime: 5 * 60 * 1000,
    });

    // Tworzenie scen na podstawie danych z API
    const scenes: Scene[] = React.useMemo(() => {
        if (!panoramas || !panoramas[0]?.photos || panoramas[0].photos.length === 0) {
            return [];
        }

        return [
            {
                id: 1,
                name: 'Wejście',
                description: 'Główne wejście do budynku',
                panorama: getImageUrl(panoramas[0].photos[0].url)
            },
            {
                id: 2,
                name: 'Środek',
                description: 'Centralna część budynku',
                panorama: getImageUrl(panoramas[0].photos[1]?.url || panoramas[0].photos[0].url)
            },
            {
                id: 3,
                name: 'Ołtarz',
                description: 'Główny ołtarz',
                panorama: getImageUrl(panoramas[0].photos[2]?.url || panoramas[0].photos[0].url)
            },
            {
                id: 4,
                name: 'Ołtarz Św. Stanisława',
                description: 'Widok na ołtarz Św. Stanisława',
                panorama: getImageUrl(panoramas[0].photos[3]?.url || panoramas[0].photos[0].url)
            }
        ];
    }, [panoramas]);

    // Ustawienie domyślnej sceny po załadowaniu danych
    useEffect(() => {
        if (scenes.length > 0 && !currentScene) {
            setCurrentScene(scenes[0]);
        }
    }, [scenes, currentScene]);

    // Ładowanie A-Frame
    useEffect(() => {
        if (window.AFRAME) {
            setAframeLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        script.onload = () => {
            setAframeLoaded(true);
        };
        script.onerror = () => {
            console.error('❌ Nie udało się załadować A-Frame');
        };
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Inicjalizacja sceny A-Frame
    const initializeScene = React.useCallback(() => {
        if (!aframeContainerRef.current || !window.AFRAME || !currentScene) return;

        // Wyczyść kontener
        aframeContainerRef.current.innerHTML = '';

        // Utwórz scenę A-Frame
        const aScene = document.createElement('a-scene');
        aScene.setAttribute('embedded', '');
        aScene.setAttribute('style', 'width: 100%; height: 100%;');
        aScene.setAttribute('vr-mode-ui', 'enabled: false');
        aScene.setAttribute('device-orientation-permission-ui', 'enabled: false');

        // Event listener dla załadowania sceny
        aScene.addEventListener('loaded', () => {
            setTimeout(() => {
                setIsSceneLoading(false);
            }, 500);
        });

        // Dodaj assets
        const assets = document.createElement('a-assets');
        const img = document.createElement('img');
        img.id = `panorama${currentScene.id}`;
        img.src = currentScene.panorama;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            setIsSceneLoading(false);
        };
        img.onerror = () => {
            setIsSceneLoading(false);
        };
        assets.appendChild(img);
        aScene.appendChild(assets);

        // Dodaj sky (panorama)
        const sky = document.createElement('a-sky');
        sky.id = 'panorama-sky';
        sky.setAttribute('src', `#panorama${currentScene.id}`);
        sky.setAttribute('rotation', '3 0 2');

        // Event listener dla sky
        sky.addEventListener('materialtextureloaded', () => {
            setIsSceneLoading(false);
        });

        aScene.appendChild(sky);

        // Dodaj kamerę z kontrolkami - ulepszone dla mobile
        const cameraRig = document.createElement('a-entity');
        cameraRig.id = 'cameraRig';

        const camera = document.createElement('a-camera');

        // Responsywne ustawienia dla mobile
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            camera.setAttribute('fov', '90');
            camera.setAttribute('look-controls', 'enabled: true; touchEnabled: true; magicWindowTrackingEnabled: true; pointerLockEnabled: false; reverseDragDirection: false');
        } else {
            camera.setAttribute('fov', '80');
            camera.setAttribute('look-controls', 'enabled: true; touchEnabled: true; magicWindowTrackingEnabled: true; pointerLockEnabled: false');
        }

        camera.setAttribute('wasd-controls', 'enabled: false');
        camera.setAttribute('position', '3 0 2');

        cameraRig.appendChild(camera);
        aScene.appendChild(cameraRig);

        aframeContainerRef.current.appendChild(aScene);

        // Fallback timer - jeśli nic nie zadziała w 3 sekundy
        const fallbackTimer = setTimeout(() => {
            setIsSceneLoading(false);
        }, 3000);

        // Cleanup timer jeśli component się unmountuje
        return () => clearTimeout(fallbackTimer);
    }, [currentScene]);

    // Reinicjalizuj scenę po zmianie currentScene lub załadowaniu A-Frame
    useEffect(() => {
        if (aframeLoaded && currentScene && !isPanoramasLoading) {
            setIsSceneLoading(true);
            setTimeout(() => {
                initializeScene();
            }, 100);
        }
    }, [currentScene, aframeLoaded, isPanoramasLoading, initializeScene]);

    // Proste rozwiązanie - backup timer
    useEffect(() => {
        if (isSceneLoading && currentScene) {
            const simpleTimer = setTimeout(() => {
                setIsSceneLoading(false);
            }, 1500);

            return () => clearTimeout(simpleTimer);
        }
    }, [isSceneLoading, currentScene]);

    // Zmiana sceny
    const handleSceneChange = (sceneId: number) => {
        if (isSceneLoading) return;

        const newScene = scenes.find(s => s.id === sceneId);
        if (newScene && newScene.id !== currentScene?.id) {
            setCurrentScene(newScene);
        }
    };
    if (!aframeLoaded) {
        return (
            <div className="virtual-tour-container" translate="no">
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

    // Loading state - ładowanie panoram
    if (isPanoramasLoading) {
        return (
            <div className="virtual-tour-container" translate="no">
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="text-primary font-semibold">
                            Ładowanie panoram...
                        </p>
                        <p className="text-secondary text-small mt-4">
                            Pobieranie zdjęć sferycznych
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="virtual-tour-container" translate="no">
                <div className="error-container">
                    <div className="error-content">
                        <div className="error-icon">❌</div>
                        <h2 className="error-title">Błąd ładowania wirtualnego spaceru</h2>
                        <p className="error-message">
                            Nie udało się załadować panoram 360°. Sprawdź połączenie internetowe i spróbuj ponownie.
                        </p>
                        <button
                            className="error-retry-button"
                            onClick={() => window.location.reload()}
                        >
                            🔄 Spróbuj ponownie
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Brak danych
    if (!scenes.length) {
        return (
            <div className="virtual-tour-container" translate="no">
                <div className="error-container">
                    <div className="error-content">
                        <div className="error-icon">📷</div>
                        <h2 className="error-title">Brak dostępnych panoram</h2>
                        <p className="error-message">
                            Aktualnie nie ma dostępnych zdjęć panoramicznych do wyświetlenia.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="virtual-tour-container" translate="no">
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
                                    className={`nav-button ${scene.id === currentScene?.id ? 'active' : ''}`}
                                    disabled={isSceneLoading}
                                >
                                    <div className="nav-button-content">
                                        <div className="nav-button-title">{scene.name}</div>
                                        <div className="nav-button-description">{scene.description}</div>
                                        {isSceneLoading && scene.id === currentScene?.id && (
                                            <div className="status-indicator text-small">
                                                <div className="loading-spinner-small"></div>
                                                <span className="text-secondary">Ładowanie...</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="nav-button-icon">
                                        {scene.id === currentScene?.id ? '📍' : '📷'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Wirtualny spacer - dolny rząd (pełna szerokość) */}
                <div className="glass-panel panorama-panel">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="panel-title">
                            🏛️ Wirtualny Spacer - {currentScene?.name || 'Ładowanie...'}
                        </h2>
                        <div className="text-small text-secondary">
                            {currentScene?.description || ''}
                        </div>
                    </div>

                    <div className="panorama-container">
                        <div
                            ref={aframeContainerRef}
                            style={{ width: '100%', height: '100%' }}
                        />

                        {/* Loading Overlay */}
                        {isSceneLoading && (
                            <div className="loading-overlay">
                                <div className="loading-content">
                                    <div className="loading-spinner"></div>
                                    <p className="text-primary font-semibold">
                                        Ładowanie panoramy...
                                    </p>
                                    <p className="text-secondary text-small mt-4">
                                        {currentScene?.name || ''}
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