import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type LevelSelectProps = {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}

const XAntibodySelect = ({ value, onChange }: LevelSelectProps) => {

    return (
        <FormControl sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="xantibody-select-label">X-Antibody</InputLabel>
            <Select
                labelId="xantibody-select-label"
                id="xantibody-select"
                value={value}
                onChange={onChange}
                label="xantibody"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>,
                <MenuItem value="false">
                    <em>Non X</em>
                </MenuItem>
                <MenuItem value="true">
                    <em>X Antibody</em>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default XAntibodySelect;

