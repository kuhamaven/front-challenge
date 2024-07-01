import { useState, useEffect } from 'react';
import { fetchCharacters } from '../services/api';
import { ReducedDigimon } from '../types/Digimon';

const useFetchCharacters = () => {
    const [characters, setCharacters] = useState<ReducedDigimon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetchNextPage = async () => {
        if (loading) return; // Prevent multiple fetches
        setLoading(true);

        try {
            const nextPage = currentPage + 1;
            const newCharacters = await fetchCharacters(nextPage);
            setCharacters(prevCharacters => [...prevCharacters, ...newCharacters]);
            setCurrentPage(nextPage);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const initialPage = 0;
                const secondPage = 1;
                const initialCharacters = await fetchCharacters(initialPage);
                const secondCharacters = await fetchCharacters(secondPage);
                setCharacters([...initialCharacters, ...secondCharacters]);
                setCurrentPage(secondPage);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Only run once on mount

    return { characters, loading, error, fetchNextPage };
};

export default useFetchCharacters;
