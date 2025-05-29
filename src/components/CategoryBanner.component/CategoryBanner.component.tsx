// components/CategoryBanner.tsx
import { Category } from "../../utils/types";
import { useEffect, useState } from "react";
import {
    getCurrentLiturgicalGradient,
    shouldUseDarkText,
    getCurrentLiturgicalSeasonName,
    getCurrentLiturgicalSeasonDateRange,
    getDaysUntilSeasonEnd
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
    subtitle
}: CategoryBannerProps) => {
    const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});
    const [textColor, setTextColor] = useState<string>('white');
    const [currentSeason, setCurrentSeason] = useState<string>('');
    const [seasonDateRange, setSeasonDateRange] = useState<string>('');
    const [daysLeft, setDaysLeft] = useState<number>(0);

    // Określ czy to tryb kategorii czy statyczny
    const isCategoryMode = categories.length > 0 || selectedCategories.length > 0;
    const isStaticMode = Boolean(title);

    // Załaduj dane liturgiczne raz przy montowaniu
    useEffect(() => {
        const liturgicalGradient = getCurrentLiturgicalGradient();
        const useDarkText = shouldUseDarkText();
        const seasonName = getCurrentLiturgicalSeasonName();
        const dateRange = getCurrentLiturgicalSeasonDateRange();
        const daysUntilEnd = getDaysUntilSeasonEnd();

        // Ustaw dane liturgiczne
        setCurrentSeason(seasonName);
        setSeasonDateRange(dateRange);
        setDaysLeft(daysUntilEnd);

        // Ustaw domyślne style tylko jeśli nie ma custom
        if (!customGradient) {
            setGradientStyle({ background: liturgicalGradient });
        }
        if (!customTextColor) {
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