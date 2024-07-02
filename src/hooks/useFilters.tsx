import { useState } from 'react';

export const useFilters = () => {
    const [digimonName, setName] = useState('');
    const [digimonLevel, setLevel] = useState('');
    const [xAntibody, setXAntibody] = useState('');
    const [digimonField, setField] = useState('');
    const [digimonAttribute, setAttribute] = useState('');

    return {
        digimonName, setName,
        digimonLevel, setLevel,
        xAntibody, setXAntibody,
        digimonField, setField,
        digimonAttribute, setAttribute
    };
};
