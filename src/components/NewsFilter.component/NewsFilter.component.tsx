import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../utils/api";
import { Category } from "../../utils/types";
import { MultiSelect } from "primereact/multiselect";

import "./filter-styles.css";

interface NewsFiltersProps {
    selectedCategories: Category[];
    setSelectedCategories: (categories: Category[]) => void;
}

const NewsFilters = ({
    selectedCategories,
    setSelectedCategories
}: NewsFiltersProps) => {
    // Pobieranie kategorii
    const {
        data: categories = [],
        isLoading: categoriesLoading
    } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000
    });

    const customChipTemplate = (item: Category) => {
        return (
            <div className="custom-chip">
                {item?.name}
            </div>
        );
    };

    return (
        <div className="filters-section p-4">
            <div className="grid">

                {/* MultiSelect do filtrowania po kategoriach */}
                <div className="col-12 md:col-6">
                    <MultiSelect
                        value={selectedCategories}
                        options={categories}
                        onChange={(e) => setSelectedCategories(e.value)}
                        optionLabel="name"
                        placeholder="Filtruj po kategorii"
                        className="w-full category-multiselect"
                        disabled={categoriesLoading}
                        display="chip"
                        itemTemplate={(option) => (
                            <div className="category-item">
                                <span>{option.name}</span>
                            </div>
                        )}
                        selectedItemTemplate={customChipTemplate}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsFilters;