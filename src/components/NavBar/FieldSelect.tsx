import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { fetchAllFields } from '../../services/api';

const FieldSelect = () => {
    const [fields, setFields] = useState<string[]>([]);
    const [field, setField] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedFields = await fetchAllFields();
                setFields(fetchedFields);
            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setField(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="field-select-label">Field</InputLabel>
            <Select
                labelId="field-select-label"
                id="field-select"
                value={field}
                onChange={handleChange}
                label="Field"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {fields.map((fld, index) => (
                    <MenuItem key={index} value={fld}>
                        {fld}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FieldSelect;
