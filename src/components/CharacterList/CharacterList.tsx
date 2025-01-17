import React, {useState, useEffect, useRef} from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import useFetchCharacters from '../../hooks/useFetchCharacters';
import './CharacterList.css';
import {useOutletContext} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {MdFormatListBulleted, MdGridView} from "react-icons/md";
import { useWindowSize } from "@uidotdev/usehooks";


type FilterContextType = {
    digimonName: string;
    digimonLevel: string;
    xAntibody: string;
    digimonField: string;
    digimonAttribute: string;
};

const CharacterList: React.FC = () => {
    const {characters, loading, error, fetchNextPage, resetFilters, reachedEnd} = useFetchCharacters();
    const [isFetching, setIsFetching] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const filters = useOutletContext<FilterContextType>();
    const [viewMode, setViewMode] = useState('grid'); // Example state for view mode

    const toggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
    };

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
        if(characters.length<=10 && !reachedEnd){
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
        <div className={viewMode === 'grid' ? 'container-grid' : 'container-list'} ref={containerRef}>
            {characters.map((character) => (
                <CharacterCard key={character.name} digimon={character} view={viewMode}/>
            ))}
            <button className="floating-button" onClick={toggleViewMode}>
                {viewMode === 'grid' ? <MdFormatListBulleted /> : <MdGridView />}
            </button>
            {loading && (
                <div className="loading">
                    <CircularProgress style={{
                        position: 'fixed',
                        top: '15%',
                        left: '50%',
                        transform: 'translate(-15%, -50%)',
                        zIndex: '1000',
                        scale: '2',
                        color: '#00FFD8'
                    }}
                    />
                </div>
            )}
        </div>
    );
};

export default CharacterList;
