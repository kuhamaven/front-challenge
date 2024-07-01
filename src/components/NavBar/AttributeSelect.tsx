import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { fetchAllAttributes } from '../../services/api';

const AttributeSelect = () => {
    const [attributes, setAttributes] = useState<string[]>([]);
    const [attribute, setAttribute] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAttributes = await fetchAllAttributes();
                setAttributes(fetchedAttributes);
            } catch (error) {
                console.error('Error fetching attributes:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setAttribute(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="attribute-select-label">Attribute</InputLabel>
            <Select
                labelId="attribute-select-label"
                id="attribute-select"
                value={attribute}
                onChange={handleChange}
                label="Attribute"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {attributes.map((attr, index) => (
                    <MenuItem key={index} value={attr}>
                        {attr}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AttributeSelect;
