import React, {useState, useEffect, useRef} from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import useFetchCharacters from '../../hooks/useFetchCharacters';
import './CharacterList.css';
import {useOutletContext} from "react-router-dom";
import {CircularProgress} from "@mui/material";

type FilterContextType = {
    digimonName: string;
    digimonLevel: string;
    xAntibody: string;
    digimonField: string;
    digimonAttribute: string;
};

const CharacterList: React.FC = () => {
    const {characters, loading, error, fetchNextPage, resetFilters} = useFetchCharacters();
    const [isFetching, setIsFetching] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const filters = useOutletContext<FilterContextType>();

    useEffect(() => {
        resetFilters(filters)
        setIsFetching(true)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [filters]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isFetching) {
            fetchNextPage()
            setIsFetching(false);
        }
        if(characters.length<=10){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }, [characters, isFetching, fetchNextPage]);

    const handleScroll = () => {
        if (containerRef.current === null) return;

        // Calculate the scroll position
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        // Check if the user has scrolled to the bottom of the page
        if (scrollHeight - scrollTop - clientHeight < 0 || isFetching) {
            return;
        }

        setIsFetching(true);
    };

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="container" ref={containerRef}>
            {characters.map((character) => (
                <CharacterCard key={character.name} digimon={character}/>
            ))}
            {loading && (
                <div className="loading">
                    <CircularProgress style={{
                        position: 'fixed',
                        top: '90%',
                        left: '95%',
                        transform: 'translate(-90%, -95%)',
                        zIndex: '1000',
                        scale:'2',
                        color:'blue'}}
                    />
                </div>
            )}
        </div>
    );
};

export default CharacterList;
