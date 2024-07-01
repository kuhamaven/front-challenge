import React, {useState, useEffect, useRef} from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import useFetchCharacters from '../../hooks/useFetchCharacters';
import './CharacterList.css';

const CharacterList: React.FC = () => {
    const {characters, loading, error, fetchNextPage} = useFetchCharacters();
    const [isFetching, setIsFetching] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isFirstLoad = useRef(true); // Track first load

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (characters.length > 0 && isFetching) {
            fetchNextPage().then(r => {
                if (characters.length <= 10) window.scrollTo({top: 0, behavior: 'smooth'});
            });
            setIsFetching(false);
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
            {loading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default CharacterList;
