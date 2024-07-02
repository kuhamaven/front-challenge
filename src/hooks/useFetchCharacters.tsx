import {useState, useEffect} from 'react';
import {fetchCharacters, fetchCharactersWithFilters} from '../services/api';
import {ReducedDigimon} from '../types/Digimon';

type FilterContextType = {
    digimonName: string;
    digimonLevel: string;
    xAntibody: string;
    digimonAttribute: string;
};

const useFetchCharacters = () => {
    const [characters, setCharacters] = useState<ReducedDigimon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentFilters, setCurrentFilters] = useState<FilterContextType | null>(null);
    const [reachedEnd, setReachedEnd] = useState(false);
    const resetFilters = (filters: FilterContextType | null) => {
        setCurrentPage(0);
        setCurrentFilters(filters);
        setLoading(false);
        setReachedEnd(false);
    }

    const fetchNextPage = async () => {
        if (loading || reachedEnd) return;
        setLoading(true);

        try {
            let newCharacters: ReducedDigimon[];

            if (currentFilters) {
                newCharacters = await fetchCharactersWithFilters(currentPage, currentFilters);
            } else {
                newCharacters = await fetchCharacters(currentPage);
            }

            if (newCharacters === undefined) {
                newCharacters = []
                setReachedEnd(true)
            }
            else if (newCharacters.length < 10) setReachedEnd(true);

            if (currentPage === 0) {
                setCharacters(newCharacters);
            } else {
                setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
            }

            setCurrentPage(currentPage + 2);
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
                setCurrentFilters(null);
                const initialPage = 0;
                const initialCharacters = await fetchCharacters(initialPage);
                setCharacters(initialCharacters);
                setCurrentPage(initialPage + 1);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Only run once on mount

    return {characters, loading, error, fetchNextPage, resetFilters};
};

export default useFetchCharacters;
