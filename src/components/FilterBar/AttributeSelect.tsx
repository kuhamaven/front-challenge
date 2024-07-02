import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { fetchAllAttributes } from '../../services/api';

type AttributeSelectProps = {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}

const AttributeSelect = ({ value, onChange }: AttributeSelectProps) => {
    const [attributes, setAttributes] = useState<string[]>([]);

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

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="attribute-select-label">Attribute</InputLabel>
            <Select
                labelId="attribute-select-label"
                id="attribute-select"
                value={value}
                onChange={onChange}
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
