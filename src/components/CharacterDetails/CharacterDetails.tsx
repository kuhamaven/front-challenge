import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../services/api';
import {
    DigimonAttribute,
    DigimonData, DigimonDescription, DigimonEvolution,
    DigimonField,
    DigimonImage,
    DigimonLevel, DigimonSkill,
    DigimonType
} from '../../types/Digimon';

const CharacterDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<DigimonData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Specify error as string

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setLoading(true);
                if (!id) {
                    throw new Error('Character ID not provided');
                }
                const data = await fetchCharacterById(parseInt(id, 10));
                setCharacter(data);
            } catch (error: any) { // Use type assertion to any
                setError(error.response?.data?.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!character) {
        return <div>Character not found.</div>;
    }

    return (
        <div>
            <h2>{character.name}</h2>
            <img src={character.images[0].href} alt={character.name}/>
            <p>Description: {character.descriptions.length > 1 ? character.descriptions[1].description : character.descriptions[0].description}</p>
            <p>Level: {character.levels[0].level}</p>
            <p>Attribute: {character.attributes[0].attribute}</p>
            <p>Field: {character.fields[0].field}</p>
            <img src={character.fields[0].image}/>
        </div>
    );
};

export default CharacterDetails;