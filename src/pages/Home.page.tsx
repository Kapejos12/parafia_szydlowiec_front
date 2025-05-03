import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../utils/api";
import { Post } from "../utils/types";
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

const HomePage = () => {
    const navigate = useNavigate();

    // Pobieranie danych za pomocą React Query
    const {
        data = [],  // Domyślna wartość to pusta tablica
        isLoading,
        error,
        refetch
    } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 5 * 60 * 1000,  // Dane są świeże przez 5 minut
        gcTime: 30 * 60 * 1000     // Dane są przechowywane w cache przez 30 minut (w v5)
        // Alternatywnie dla wersji v4:
        // cacheTime: 30 * 60 * 1000
    });

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const truncateText = (text: string, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength
            ? text.slice(0, maxLength) + '...'
            : text;
    }

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
                                {news.creationDate ? formatDate(news.creationDate) : "Brak daty"}
                            </span>
                            <Button
                                label="Czytaj więcej"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                className="p-button-text"
                                onClick={() => navigate(`/aktualnosci/${news.slug}`)}
                            />
                        </div>
                    )}
                    style={{ height: '100%' }}
                >
                    {truncateText(news.shortContent)}
                </Card>
            </div>
        );
    };

    // Obsługa stanów ładowania i błędów
    if (isLoading) {
        return (
            <div className="flex justify-content-center align-items-center min-h-screen">
                <i className="pi pi-spin pi-spinner text-5xl"></i>
                <span className="ml-2">Ładowanie aktualności...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-column align-items-center justify-content-center min-h-screen">
                <i className="pi pi-exclamation-triangle text-5xl text-red-500 mb-3"></i>
                <h3>Wystąpił błąd podczas ładowania aktualności</h3>
                <p className="mb-3">{(error as Error).message}</p>
                <Button
                    label="Spróbuj ponownie"
                    icon="pi pi-refresh"
                    onClick={() => refetch()}
                />
            </div>
        );
    }

    return (
        <div className="grid">
            {/* Sekcja z aktualnościami */}
            <div className="col-12 lg:col-8">
                <div className="card">
                    <h2 className="text-3xl font-bold mb-4">Aktualności</h2>

                    {/* Lista aktualności */}
                    {data.length > 0 ? (
                        <DataView value={data} layout="grid" itemTemplate={itemTemplate} />
                    ) : (
                        <div className="flex justify-content-center align-items-center p-5">
                            <div className="text-center">
                                <i className="pi pi-exclamation-circle text-5xl text-500 mb-3"></i>
                                <h3>Brak aktualności w tej kategorii</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage