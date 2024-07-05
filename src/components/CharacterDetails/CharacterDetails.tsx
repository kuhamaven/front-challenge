import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../services/api';
import './CharacterDetails.css';
import {
    DigimonData
} from '../../types/Digimon';

const CharacterDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<DigimonData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setLoading(true);
                if (!id) {
                    throw new Error('Character ID not provided');
                }
                const data = await fetchCharacterById(parseInt(id, 10));
                setCharacter(data);
            } catch (error: any) {
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
        <div className="character-details">
            <div className="main-card">
                <div className="left-column">
                    <h1>{character.name}</h1>
                    <img src={character.images[0].href} alt={character.name} />
                    <div className="level">{character.levels[0].level}</div>
                </div>
                <div className="right-column">
                    <p>{character.descriptions[1].description}</p>
                </div>
            </div>
            <div className="info-cards">
                <div className="info-card">
                    <h2>Type</h2>
                    <p>{character.types.map(t => t.type).join(', ')}</p>
                </div>
                <div className="info-card">
                    <h2>Attribute</h2>
                    <p>{character.attributes.map(a => a.attribute).join(', ')}</p>
                </div>
                <div className="info-card">
                    <h2>Fields</h2>
                    <div className="fields">
                        {character.fields.map(field => (
                            <img key={field.field} src={field.image} alt="field" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
