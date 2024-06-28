import React from 'react';
import {CircularProgress, Grid} from '@mui/material';
import './CharacterList.module.css';
import useFetchCharacters from '../../hooks/useFetchCharacters';
import CharacterCard from '../CharacterCard/CharacterCard';

const CharacterList: React.FC = () => {
    const { characters, loading, error } = useFetchCharacters();

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={'characterList'}>
            <Grid container spacing={2}>
                {characters.map((character) => (
                    <CharacterCard key={character.id} digimon={character} />
                ))}
            </Grid>
        </div>
    );
};

export default CharacterList;
