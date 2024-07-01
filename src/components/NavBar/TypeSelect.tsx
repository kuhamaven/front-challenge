import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { fetchAllTypes } from '../../services/api';

const TypeSelect = () => {
    const [types, setTypes] = useState<string[]>([]);
    const [type, setType] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTypes = await fetchAllTypes();
                setTypes(fetchedTypes);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setType(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                onChange={handleChange}
                label="type"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {types.map((t, index) => (
                    <MenuItem key={index} value={t}>
                        {t}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TypeSelect;
