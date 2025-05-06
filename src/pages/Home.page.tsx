import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../utils/api";
import { Category, Post } from "../utils/types";
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Chip } from "primereact/chip";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
// import CategoryBanner from "../components/CategoryBanner.component/CategoryBanner.component";

import './styles.css';
import CategoryBanner from "../components/CategoryBanner.component/CategoryBanner.component";
import NewsFilters from "../components/NewsFilter.component/NewsFilter.component";

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    // Pobieranie aktualności
    const {
        data: posts = [],
        isLoading: postsLoading,
        error: postsError,
        refetch: refetchPosts
    } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000
    });

    // Filtrowanie postów na podstawie wybranych kategorii i wyszukiwanego terminu
    useEffect(() => {
        if (posts.length === 0) return;

        let filtered = [...posts];

        // Filtrowanie po kategoriach
        if (selectedCategories.length > 0) {
            const categorySlugs = selectedCategories.map(cat => cat.slug);
            filtered = filtered.filter(post => {
                // Bezpieczne sprawdzenie czy post.categories istnieje i nie jest puste
                if (!post.categories || post.categories.length === 0) {
                    return false;
                }
                // Teraz możemy bezpiecznie użyć some()
                return post.categories.some(cat => categorySlugs.includes(cat.slug));
            });
        }

        setFilteredPosts(filtered);
    }, [posts, selectedCategories]);

    const formatDate = (date: Date | string): string => {
        const dateObject = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObject.getTime())) {
            return 'Invalid date';
        }

        try {
            return dateObject.toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            return `${day}.${month}.${year}`;
        }
    };

    const handleCategoryClick = (category: Category) => {
        // Jeśli kategoria jest już wybrana, usuń ją
        if (selectedCategories.some(cat => cat.id === category.id)) {
            setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id));
        }
        // W przeciwnym razie dodaj ją do zaznaczonych
        else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Szablon dla kategorii w ramach elementu aktualności
    const renderCategories = (categories?: Category[]) => {
        if (!categories || categories.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-1 mt-2">
                {categories.map(cat => (
                    <Chip
                        key={cat.id}
                        label={cat.name}
                        className="bg-primary-100 text-primary-900 category-chip"
                        onClick={() => handleCategoryClick(cat)}
                    />
                ))}
            </div>
        );
    };

    // Szablon dla elementu aktualności
    const itemTemplate = (news: Post) => {
        return (
            <div className="col-12 md:col-6 lg:col-4 p-2">
                <Card
                    title={news.title}
                    footer={(
                        <div className="flex justify-content-between align-items-center">
                            <span className="flex align-items-center">
                                <i className="pi pi-calendar mr-2"></i>
                                {news.createdAt ? formatDate(news.createdAt) : "Brak daty"}
                            </span>
                            <Button
                                label="Czytaj więcej"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                className="p-button-rounded p-button-outlined"
                                onClick={() => navigate(`/aktualnosci/${news.slug}`)}
                            />
                        </div>
                    )}
                    className="news-card shadow-3 border-round-xl"
                >
                    <div className="news-content">
                        {renderCategories(news.categories)}
                        <p className="line-height-3 mt-3">{news.shortContent}</p>
                    </div>
                </Card>
            </div>
        );
    };

    // Szkielet ładowania dla elementu aktualności
    const loadingTemplate = () => {
        return Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="col-12 md:col-6 lg:col-4 p-2">
                <div className="border-round-xl overflow-hidden shadow-3 p-3">
                    <Skeleton width="60%" height="2rem" className="mb-2" />
                    <Skeleton width="100%" height="1rem" className="mb-1" />
                    <Skeleton width="100%" height="1rem" className="mb-1" />
                    <Skeleton width="75%" height="1rem" className="mb-2" />
                    <div className="flex gap-1 mb-3">
                        <Skeleton width="4rem" height="1.5rem" className="border-round-xl" />
                        <Skeleton width="4rem" height="1.5rem" className="border-round-xl" />
                    </div>
                    <div className="flex justify-content-between align-items-center">
                        <Skeleton width="30%" height="1rem" />
                        <Skeleton width="20%" height="2rem" className="border-round-xl" />
                    </div>
                </div>
            </div>
        ));
    };

    // Obsługa błędów
    const renderError = (error: Error | null) => {
        if (!error) return null;

        return (
            <div className="flex flex-column align-items-center justify-content-center p-5">
                <i className="pi pi-exclamation-triangle text-5xl text-red-500 mb-3"></i>
                <h3>Wystąpił błąd</h3>
                <p className="mb-3">{error.message}</p>
                <Button
                    label="Spróbuj ponownie"
                    icon="pi pi-refresh"
                    className="p-button-rounded"
                    onClick={() => {
                        refetchPosts();
                    }}
                />
            </div>
        );
    };

    // Główna funkcja renderująca komponent
    if (postsLoading) {
        return (
            <div className="grid">
                <div className="col-12">
                    <CategoryBanner
                        categories={[]}
                        selectedCategories={selectedCategories}
                    />
                </div>
                <div className="col-12 lg:col-10 lg:col-offset-1">
                    <div className="card shadow-3 border-round-xl p-0">
                        {/* Nowy komponent filtrów */}
                        <NewsFilters
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                        <Divider className="m-0" />
                        <div className="grid p-3">
                            {loadingTemplate()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (postsError) {
        return (
            <div className="flex flex-column align-items-center justify-content-center min-h-screen">
                {renderError(postsError as Error)}
            </div>
        );
    }

    return (
        <div className="grid">
            <div className="col-12">
                <CategoryBanner
                    categories={[]}
                    selectedCategories={selectedCategories}
                />
            </div>
            <div className="col-12 lg:col-10 lg:col-offset-1">
                <div className="card shadow-3 border-round-xl p-0">
                    {/* Nowy komponent filtrów */}
                    <NewsFilters
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    <Divider className="m-0" />

                    {/* Lista aktualności */}
                    <div className="p-3">
                        {filteredPosts.length > 0 ? (
                            <DataView value={filteredPosts} layout="grid" itemTemplate={itemTemplate} />
                        ) : (
                            <div className="flex justify-content-center align-items-center p-5">
                                <div className="text-center">
                                    <i className="pi pi-filter-slash text-5xl text-500 mb-3"></i>
                                    <h3>Brak aktualności spełniających kryteria</h3>
                                    <Button
                                        label="Wyczyść filtry"
                                        icon="pi pi-times"
                                        className="p-button-text mt-3"
                                        onClick={() => {
                                            setSelectedCategories([]);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;