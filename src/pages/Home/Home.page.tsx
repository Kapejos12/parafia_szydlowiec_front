import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../../utils/api";
import { Category, Post } from "../../utils/types";
import { DataView, DataViewPageEvent } from "primereact/dataview";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Chip } from "primereact/chip";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";

import './home-styles.css';
import CategoryBanner from "../../components/CategoryBanner.component/CategoryBanner.component";
import NewsFilters from "../../components/NewsFilter.component/NewsFilter.component";

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(9);
    const [totalRecords, setTotalRecords] = useState(0);

    const rowsPerPageOptions = [
        { label: '6 na stronie', value: 6 },
        { label: '9 na stronie', value: 9 },
        { label: '12 na stronie', value: 12 },
        { label: '18 na stronie', value: 18 },
        { label: '25 na stronie', value: 25 }
    ];

    const {
        data: postsData,
        isLoading: postsLoading,
        error: postsError,
        refetch: refetchPosts
    } = useQuery({
        queryKey: ['posts', page, rows, selectedCategories],
        queryFn: async () => {
            const categorySlugs = selectedCategories.map(cat => cat.slug).join(',');
            const response = await fetchPosts({
                page,
                pageSize: Math.min(rows, 25),
                categories: categorySlugs || undefined
            });
            return response;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        placeholderData: (previousData) => previousData
    });

    useEffect(() => {
        if (postsData?.meta?.pagination?.total !== undefined) {
            setTotalRecords(postsData.meta.pagination.total);
        }
    }, [postsData]);

    useEffect(() => {
        setPage(1);
    }, [selectedCategories]);

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
        } catch (error) {
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();
            return `${day}.${month}.${year}`;
        }
    };

    const handleCategoryClick = (category: Category) => {
        if (selectedCategories.some(cat => cat.id === category.id)) {
            setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const onPageChange = (event: DataViewPageEvent) => {
        const newPage = Math.floor(event.first / event.rows) + 1;
        setPage(newPage);
        setRows(event.rows);
    };

    const onRowsChange = (value: number) => {
        setRows(value);
        setPage(1);
    };

    const itemTemplate = (news: Post) => {
        return (
            <div translate="no" className="col-12 md:col-6 lg:col-4 p-2">
                <div
                    className="news-card"
                    onClick={() => navigate(`/aktualnosci/${news.slug}`)}
                    translate="no"
                >
                    <div className="card-link" aria-hidden="true" />

                    <div className="news-card-header">
                        <h3>{news.title}</h3>
                    </div>
                    <div className="news-card-content">
                        <p>{news.shortContent}</p>
                        <div className="card-categories">
                            {news.categories && news.categories.map(cat => (
                                <Chip
                                    key={cat.id}
                                    label={cat.name}
                                    className="category-chip"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryClick(cat);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="news-card-footer">
                        <span className="post-date">
                            <i className="pi pi-calendar"></i>
                            {news.createdAt ? formatDate(news.createdAt) : "Brak daty"}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    // Szkielet ładowania dla elementu aktualności
    const loadingTemplate = () => {
        return Array.from({ length: rows }).map((_, i) => (
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

    // Header z informacjami o wynikach i opcjami paginacji
    const renderResultsHeader = () => {
        const currentPage = page;
        const totalPages = Math.ceil(totalRecords / rows);
        const startItem = totalRecords > 0 ? (page - 1) * rows + 1 : 0;
        const endItem = Math.min(page * rows, totalRecords);

        return (
            <div translate="no" className="flex flex-column lg:flex-row justify-content-between align-items-start lg:align-items-center gap-3 mb-3 p-3 bg-gray-50 border-round">
                <div className="flex flex-column gap-1">
                    <span className="text-sm text-color-secondary">
                        Wyświetlane {startItem}-{endItem} z {totalRecords} wyników
                    </span>
                    {totalPages > 1 && (
                        <span className="text-sm text-color-secondary">
                            Strona {currentPage} z {totalPages}
                        </span>
                    )}
                </div>

                <div translate="no" className="flex align-items-center gap-2">
                    <label htmlFor="rows-dropdown" className="text-sm font-medium">
                        Wyników na stronie:
                    </label>
                    <Dropdown
                        id="rows-dropdown"
                        value={rows}
                        options={rowsPerPageOptions}
                        onChange={(e) => onRowsChange(e.value)}
                        className="w-auto"
                        style={{ minWidth: '140px' }}
                    />
                </div>
            </div>
        );
    };

    // Obsługa błędów
    const renderError = (error: Error | null) => {
        if (!error) return null;

        return (
            <div translate="no" className="flex flex-column align-items-center justify-content-center p-5">
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

    const posts = postsData?.data || [];

    // Główna funkcja renderująca komponent
    if (postsLoading && !postsData) {
        return (
            <div translate="no" className="grid">
                <div className="col-12">
                    <CategoryBanner
                        categories={[]}
                        selectedCategories={selectedCategories}
                        showLiturgicalInfo={true}
                    />
                </div>
                <div translate="no" className="col-12 lg:col-10 lg:col-offset-1">
                    <div className="card">
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
            <div translate="no" className="flex flex-column align-items-center justify-content-center min-h-screen">
                {renderError(postsError as Error)}
            </div>
        );
    }

    return (
        <div translate="no" className="news-container">
            <div translate="no" className="grid">
                <div className="col-12">
                    <CategoryBanner
                        categories={[]}
                        selectedCategories={selectedCategories}
                        showLiturgicalInfo={true}
                    />
                </div>
                <div translate="no" className="col-12 lg:col-10 lg:col-offset-1">
                    <div className="card">
                        <NewsFilters
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                        <Divider className="m-0" />

                        {/* Lista aktualności */}
                        <div>
                            {totalRecords > 0 || posts.length > 0 ? (
                                <>
                                    {renderResultsHeader()}
                                    <DataView
                                        value={posts}
                                        layout="grid"
                                        itemTemplate={itemTemplate}
                                        rows={rows}
                                        first={(page - 1) * rows}
                                        totalRecords={totalRecords}
                                        onPage={onPageChange}
                                        paginator={true}
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                                        paginatorClassName="justify-content-center mt-4"
                                        paginatorLeft={
                                            <span className="text-sm text-color-secondary">
                                                Łącznie: {totalRecords} wyników
                                            </span>
                                        }
                                        emptyMessage="Brak aktualności do wyświetlenia"
                                        lazy={true}
                                    />
                                </>
                            ) : (
                                <div className="no-results">
                                    <div>
                                        <i className="pi pi-filter-slash"></i>
                                        <h3>Brak aktualności spełniających kryteria</h3>
                                        <Button
                                            label="Wyczyść filtry"
                                            icon="pi pi-times"
                                            className="p-button-text"
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
        </div>
    );
};

export default HomePage;