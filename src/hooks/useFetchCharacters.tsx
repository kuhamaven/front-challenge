import { useState, useEffect } from 'react';
import {ReducedDigimon} from "../types/Digimon";
import {fetchCharacters} from "../services/api";

const useFetchCharacters = () => {
    const [characters, setCharacters] = useState<ReducedDigimon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const characters = await fetchCharacters(currentPage);
                setCharacters(characters);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { characters, loading, error };
};

export default useFetchCharacters;
