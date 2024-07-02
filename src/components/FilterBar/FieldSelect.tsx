import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { fetchAllFields } from '../../services/api';

type FieldSelectProps = {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}

const FieldSelect = ({ value, onChange }: FieldSelectProps) => {
    const [fields, setFields] = useState<string[]>([]);

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

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="field-select-label">Field</InputLabel>
            <Select
                labelId="field-select-label"
                id="field-select"
                value={value}
                onChange={onChange}
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
