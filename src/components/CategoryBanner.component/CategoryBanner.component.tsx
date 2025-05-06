// components/CategoryBanner.tsx
import { Category } from "../../utils/types";
import { useEffect, useState } from "react";

interface CategoryBannerProps {
    categories: Category[];
    selectedCategories: Category[];
}

const CategoryBanner = ({ categories, selectedCategories }: CategoryBannerProps) => {
    const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});

    // Generowanie losowego koloru dla tła
    useEffect(() => {
        if (selectedCategories.length === 0) {
            // Domyślny gradient dla wszystkich kategorii
            setGradientStyle({
                background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-800) 100%)"
            });
            return;
        }

        // Dla wybranych kategorii generujemy unikalny gradient
        const hue1 = 210; // Bazowa wartość hue (niebieski)
        const hue2 = (hue1 + 40) % 360; // Przesunięcie o 40 stopni

        const gradient = `linear-gradient(135deg, 
            hsl(${hue1}, 70%, 50%) 0%, 
            hsl(${hue2}, 70%, 40%) 100%)`;

        setGradientStyle({ background: gradient });
    }, [selectedCategories]);

    return (
        <div
            className="category-banner surface-0 shadow-2 mb-5 border-round-xl overflow-hidden"
            style={gradientStyle}
        >
            <div className="p-4 md:p-6">
                <h1 className="text-white font-bold text-4xl mb-2">
                    {selectedCategories.length === 0
                        ? "Wszystkie aktualności"
                        : selectedCategories.length === 1
                            ? selectedCategories[0].name
                            : `Wybrane kategorie (${selectedCategories.length})`
                    }
                </h1>
                <p className="text-white text-xl font-light opacity-8 line-height-3 m-0">
                    {selectedCategories.length === 0
                        ? `Przeglądaj wszystkie aktualności z ${categories.length} kategorii`
                        : selectedCategories.length === 1
                            ? selectedCategories[0].description || "Aktualności z wybranej kategorii"
                            : selectedCategories.map(cat => cat.name).join(", ")
                    }
                </p>
            </div>
        </div>
    );
};

export default CategoryBanner;