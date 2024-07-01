import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom"
import './NavBar.css'
import {TextField} from "@mui/material";
import AttributeSelect from "./AttributeSelect";
import FieldSelect from "./FieldSelect";
import TypeSelect from "./TypeSelect";
import LevelSelect from "./LevelSelect";
var logo = require('../../assets/Ver1.png');
var dotSprite = require('../../assets/Agumon_vpet_dmc.gif');

function NavBar() {
    const navigate = useNavigate()
    const [name, setName] = useState('');

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <AppBar classes={'navbar'} className={'navbar'} sx={{backgroundColor:'#376eff'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <img
                            src={dotSprite}
                            alt="Logo"
                            className={'navbar-logo'}
                            onClick={handleLogoClick}
                        />
                        Digi-API
                    </Typography>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange} />
                    <LevelSelect></LevelSelect>
                    <TypeSelect></TypeSelect>
                    <FieldSelect></FieldSelect>
                    <AttributeSelect></AttributeSelect>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                        <img src={logo} alt="Logo" className={'navbar-logo-main'}/>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;