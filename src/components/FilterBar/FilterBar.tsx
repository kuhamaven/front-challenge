import React, { useState } from 'react';
import { SelectChangeEvent, TextField, Button, Modal, Box } from "@mui/material";
import AttributeSelect from "../FilterBar/AttributeSelect";
import LevelSelect from "../FilterBar/LevelSelect";
import XAntibodySelect from "./XantibodySelect";
import {useWindowSize} from "@uidotdev/usehooks";
import {MdFilterList, MdFormatListBulleted, MdGridView} from "react-icons/md";
import './FilterBar.css'

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

    const size = useWindowSize();
    const isMobile = size.width != null && size.width <= 768; // Define your mobile breakpoint

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size.width!=null? size.width*0.75 : 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 6,
    };

    return (
        <div>
            {isMobile ? (
                <>
                    <button className="filters-floating-button" onClick={handleOpen}>
                        <MdFilterList/>
                    </button>
                    <Modal open={open} onClose={handleClose}>
                        <div>
                            <Box sx={modalStyle} className={'filters-box'}>
                                <TextField id="outlined-basic" label="Name" variant="outlined" value={name}
                                           onChange={handleNameChange} sx={{m: 1, minWidth: 200}}/>
                                <XAntibodySelect value={xAntibody} onChange={handleXAntibodyChange}/>
                                <LevelSelect value={level} onChange={handleLevelChange}/>
                                <AttributeSelect value={attribute} onChange={handleAttributeChange}/>
                                <div>
                                    <Button variant="contained" onClick={handleClose} sx={{mt: 2}}>Close</Button>
                                </div>
                            </Box>

                        </div>

                    </Modal>
                </>
            ) : (
                <>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name}
                               onChange={handleNameChange} sx={{ m: 1, minWidth: 200 }} />
                    <XAntibodySelect value={xAntibody} onChange={handleXAntibodyChange} />
                    <LevelSelect value={level} onChange={handleLevelChange} />
                    <AttributeSelect value={attribute} onChange={handleAttributeChange} />
                </>
            )}
        </div>
    );
}

export default FilterBar;
