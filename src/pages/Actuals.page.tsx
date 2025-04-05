import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchActuals } from '../utils/api';
import { Actuals } from '../utils/types';

const ActualsPage: React.FC = () => {

    const { data, isLoading, error } = useQuery<Actuals[]>({
        queryKey: ['aktualnosci'],
        queryFn: fetchActuals
    });

    if (isLoading) return <p>Ładowanie danych...</p>;
    if (error) return <p>Ups! Coś poszło nie tak... {error.message}</p>;

    return (
        <div>
            <h1>Aktualności</h1>
            {data?.map((actual: Actuals) => (
                <li key={actual.Slug}>{actual.Tresc}</li>
            ))}
        </div>
    )
}

export default ActualsPage