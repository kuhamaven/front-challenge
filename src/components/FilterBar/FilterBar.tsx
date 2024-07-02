import React from 'react';
import { SelectChangeEvent, TextField } from "@mui/material";
import AttributeSelect from "../FilterBar/AttributeSelect";
import LevelSelect from "../FilterBar/LevelSelect";
import XAntibodySelect from "./XantibodySelect";

type FilterBarProps = {
    name: string;
    setName: (value: string) => void;
    level: string;
    setLevel: (value: string) => void;
    xAntibody: string;
    setXAntibody: (value: string) => void;
    attribute: string;
    setAttribute: (value: string) => void;
};

function FilterBar({
                       name, setName,
                       level, setLevel,
                       xAntibody, setXAntibody,
                       attribute, setAttribute
                   }: FilterBarProps) {

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleLevelChange = (event: SelectChangeEvent<string>) => {
        setLevel(event.target.value as string);
    };

    const handleXAntibodyChange = (event: SelectChangeEvent<string>) => {
        setXAntibody(event.target.value as string);
    };

    const handleAttributeChange = (event: SelectChangeEvent<string>) => {
        setAttribute(event.target.value as string);
    };

    return (
        <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange} sx={{ m: 1, minWidth: 200 }} />
            <XAntibodySelect value={xAntibody} onChange={handleXAntibodyChange} />
            <LevelSelect value={level} onChange={handleLevelChange} />
            <AttributeSelect value={attribute} onChange={handleAttributeChange} />
        </div>
    );
}

export default FilterBar;
