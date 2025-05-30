// components/CategoryBanner.tsx
import { Category } from "../../utils/types";
import { useEffect, useState } from "react";
import {
    getCurrentLiturgicalGradient,
    shouldUseDarkText,
    getCurrentLiturgicalSeasonName,
    getCurrentLiturgicalSeasonDateRange,
    getDaysUntilSeasonEnd,
    // Nowe funkcje świąt
    getFeastsForDate,
    getPrimaryFeastForDate,
    isLiturgicalFeast,
    getFeastGradient,
    getFeastRankGradient,
    getFeastTextColor,
    getFeastRankTextColor,
    getNextFeast,
    type LiturgicalFeast
} from "../../utils/liturgicalHelper";

import './category-banner-styles.css';

interface CategoryBannerProps {
    // Dla kategorii (tryb oryginalny)
    categories?: Category[];
    selectedCategories?: Category[];

    // Dla stron statycznych (nowy tryb)
    title?: string;
    description?: string;
    showLiturgicalInfo?: boolean;

    // Opcjonalne nadpisanie kolorów
    customGradient?: string;
    customTextColor?: string;

    // Dodatkowe opcje
    icon?: string;
    subtitle?: string;

    // Nowe opcje świąt
    preferFeastColors?: boolean; // Czy preferować kolory świąt nad okresem liturgicznym
    showFeastInfo?: boolean; // Czy pokazać informacje o świętach
}

const CategoryBanner = ({
    categories = [],
    selectedCategories = [],
    title,
    description,
    showLiturgicalInfo = false,
    customGradient,
    customTextColor,
    icon,
    subtitle,
    preferFeastColors = true,
    showFeastInfo = true
}: CategoryBannerProps) => {
    const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});
    const [textColor, setTextColor] = useState<string>('white');
    const [currentSeason, setCurrentSeason] = useState<string>('');
    const [seasonDateRange, setSeasonDateRange] = useState<string>('');
    const [daysLeft, setDaysLeft] = useState<number>(0);

    // Nowe stany dla świąt
    const [todayFeasts, setTodayFeasts] = useState<LiturgicalFeast[]>([]);
    const [primaryFeast, setPrimaryFeast] = useState<LiturgicalFeast | null>(null);
    const [nextFeast, setNextFeast] = useState<LiturgicalFeast | null>(null);
    const [isFeastDay, setIsFeastDay] = useState<boolean>(false);

    // Określ czy to tryb kategorii czy statyczny
    const isCategoryMode = categories.length > 0 || selectedCategories.length > 0;
    const isStaticMode = Boolean(title);

    // Załaduj dane liturgiczne raz przy montowaniu
    useEffect(() => {
        const today = new Date();

        // Dane podstawowe
        const liturgicalGradient = getCurrentLiturgicalGradient();
        const useDarkText = shouldUseDarkText();
        const seasonName = getCurrentLiturgicalSeasonName();
        const dateRange = getCurrentLiturgicalSeasonDateRange();
        const daysUntilEnd = getDaysUntilSeasonEnd();

        // Dane świąt
        const feastsToday = getFeastsForDate(today);
        const mainFeast = getPrimaryFeastForDate(today);
        const upcomingFeast = getNextFeast(today);
        const isTodayFeast = isLiturgicalFeast(today);

        // Ustaw dane liturgiczne
        setCurrentSeason(seasonName);
        setSeasonDateRange(dateRange);
        setDaysLeft(daysUntilEnd);

        // Ustaw dane świąt
        setTodayFeasts(feastsToday);
        setPrimaryFeast(mainFeast);
        setNextFeast(upcomingFeast);
        setIsFeastDay(isTodayFeast);

        // Ustaw style tylko jeśli nie ma custom
        if (!customGradient) {
            let finalGradient: string;
            let finalTextColor: string;

            if (preferFeastColors && isTodayFeast && mainFeast) {
                // Użyj kolorów święta
                if (mainFeast.rank === 'solemnity') {
                    finalGradient = getFeastRankGradient(mainFeast);
                    finalTextColor = getFeastRankTextColor(mainFeast) === 'dark' ? '#333333' : 'white';
                } else {
                    finalGradient = getFeastGradient(mainFeast);
                    finalTextColor = getFeastTextColor(mainFeast) === 'dark' ? '#333333' : 'white';
                }
            } else {
                // Użyj kolorów okresu liturgicznego
                finalGradient = liturgicalGradient;
                finalTextColor = useDarkText ? '#333333' : 'white';
            }

            setGradientStyle({ background: finalGradient });
            if (!customTextColor) {
                setTextColor(finalTextColor);
            }
        } else if (!customTextColor) {
            setTextColor(useDarkText ? '#333333' : 'white');
        }
    }, []); // Wykonaj tylko raz

    // Reaguj na zmiany custom styles
    useEffect(() => {
        if (customGradient) {
            setGradientStyle({ background: customGradient });
        }
        if (customTextColor) {
            setTextColor(customTextColor);
        }
    }, [customGradient, customTextColor]);

    // Funkcja do generowania tytułu
    const getTitle = () => {
        if (title) return title;

        if (selectedCategories.length === 0) {
            return "Wszystkie aktualności";
        } else if (selectedCategories.length === 1) {
            return selectedCategories[0].name;
        } else {
            return `Wybrane kategorie (${selectedCategories.length})`;
        }
    };

    // Funkcja do generowania opisu
    const getDescription = () => {
        if (description) return description;

        if (selectedCategories.length === 0) {
            return `Przeglądaj wszystkie aktualności z ${categories.length} kategorii`;
        } else if (selectedCategories.length === 1) {
            return selectedCategories[0].description || "Aktualności z wybranej kategorii";
        } else {
            return selectedCategories.map(cat => cat.name).join(", ");
        }
    };

    // Określ czy pokazać informacje liturgiczne
    const shouldShowLiturgicalInfo = showLiturgicalInfo ||
        (isCategoryMode && selectedCategories.length === 0) ||
        (isStaticMode && showLiturgicalInfo);

    // Funkcja do formatowania daty święta
    const formatFeastDate = (date: Date): string => {
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long'
        });
    };

    // Funkcja do získania ikony dla kategorii święta
    const getFeastCategoryIcon = (category: string): string => {
        switch (category) {
            case 'marian': return '🌟';
            case 'triduum': return '✝️';
            case 'solemnity': return '👑';
            case 'feast': return '🎉';
            case 'memorial': return '📿';
            case 'optional-memorial': return '🕊️';
            case 'special': return '🔔';
            default: return '📅';
        }
    };

    // Funkcja do získania ikony dla rangi święta
    const getFeastRankIcon = (rank: string): string => {
        switch (rank) {
            case 'solemnity': return '👑';
            case 'feast': return '🎊';
            case 'memorial': return '📿';
            case 'optional-memorial': return '🕊️';
            case 'special': return '🔔';
            default: return '📅';
        }
    };

    return (
        <div
            className="category-banner surface-0 shadow-2 mb-5 border-round-xl overflow-hidden"
            style={gradientStyle}
        >
            <div className="p-4 md:p-6">
                {/* Tytuł z opcjonalną ikoną */}
                <h1
                    className="font-bold text-4xl mb-2 flex align-items-center gap-3"
                    style={{ color: textColor }}
                >
                    {icon && (
                        <i
                            className={icon}
                            style={{
                                fontSize: '2.5rem',
                                opacity: 0.9
                            }}
                        ></i>
                    )}
                    {getTitle()}
                </h1>

                {/* Podtytuł (opcjonalny) */}
                {subtitle && (
                    <div
                        className="text-lg font-medium mb-2 opacity-9"
                        style={{ color: textColor }}
                    >
                        {subtitle}
                    </div>
                )}

                {/* Główny opis */}
                <p
                    className="text-xl font-light opacity-8 line-height-3 m-0"
                    style={{ color: textColor }}
                >
                    {getDescription()}
                </p>

                {/* Informacje o świętach na dziś */}
                {showFeastInfo && isFeastDay && todayFeasts.length > 0 && (
                    <div
                        className="mb-3 p-3 border-round-lg"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: textColor
                        }}
                    >
                        {primaryFeast && (
                            <div className="font-semibold text-lg mb-1 flex align-items-center gap-2">
                                <span>{getFeastRankIcon(primaryFeast.rank)}</span>
                                <span>{primaryFeast.name}</span>
                            </div>
                        )}

                        {todayFeasts.length > 1 && (
                            <div className="text-sm opacity-8">
                                {todayFeasts.filter(f => f !== primaryFeast).map((feast, index) => (
                                    <div key={index} className="flex align-items-center gap-2 mt-1">
                                        <span>{getFeastCategoryIcon(feast.category)}</span>
                                        <span>{feast.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {primaryFeast?.description && (
                            <div
                                className="text-sm opacity-7 mt-2 italic"
                                style={{ color: textColor }}
                            >
                                {primaryFeast.description}
                            </div>
                        )}
                    </div>
                )}

                {/* Informacje o okresie liturgicznym */}
                {shouldShowLiturgicalInfo && currentSeason && (
                    <div
                        className="mt-3 opacity-8"
                        style={{ color: textColor }}
                    >
                        <div
                            className="font-medium mb-1"
                            style={{ fontSize: '0.9rem' }}
                        >
                            📅 Okres liturgiczny: {currentSeason}
                        </div>
                        <div
                            className="opacity-7"
                            style={{ fontSize: '0.75rem' }}
                        >
                            {seasonDateRange}
                        </div>
                        {daysLeft > 0 && (
                            <div
                                className="opacity-7 mt-1"
                                style={{ fontSize: '0.75rem' }}
                            >
                                ⏳ Pozostało {daysLeft} {daysLeft === 1 ? 'dzień' : daysLeft < 5 ? 'dni' : 'dni'}
                            </div>
                        )}
                    </div>
                )}

                {/* Informacje o następnym święcie */}
                {showFeastInfo && !isFeastDay && nextFeast && (
                    <div
                        className="mt-3 opacity-7"
                        style={{ color: textColor }}
                    >
                        <div
                            className="text-sm flex align-items-center gap-2"
                        >
                            <span>{getFeastRankIcon(nextFeast.rank)}</span>
                            <span>
                                Następne święto: <strong>{nextFeast.name}</strong>
                            </span>
                        </div>
                        <div
                            className="text-xs opacity-6 mt-1"
                        >
                            {formatFeastDate(nextFeast.date)}
                        </div>
                    </div>
                )}

                {/* Dodatkowe informacje dla stron statycznych */}
                {isStaticMode && (
                    <div
                        className="mt-3 pt-3 border-top-1 opacity-6"
                        style={{
                            borderColor: textColor,
                            color: textColor
                        }}
                    >
                        <div className="text-sm">
                            {/* Można dodać dodatkowe informacje specyficzne dla strony */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryBanner;