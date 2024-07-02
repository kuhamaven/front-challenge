import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { fetchAllLevels } from '../../services/api';

type LevelSelectProps = {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}

const LevelSelect = ({ value, onChange }: LevelSelectProps) => {
    const [levels, setLevels] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedLevels = await fetchAllLevels();
                setLevels(fetchedLevels);
            } catch (error) {
                console.error('Error fetching levels:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="level-select-label">Level</InputLabel>
            <Select
                labelId="level-select-label"
                id="level-select"
                value={value}
                onChange={onChange}
                label="level"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {levels.map((lv, index) => (
                    <MenuItem key={index} value={lv}>
                        {lv}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LevelSelect;

