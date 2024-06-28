import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom"

var logo = require('../../assets/Ver1.png');
var dotSprite = require('../../assets/Agumon_vpet_dmc.gif');

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <img
                            src={dotSprite}
                            alt="Logo"
                            style={{maxWidth: '40px', marginRight: '8px', cursor: 'pointer'}}
                            onClick={handleLogoClick}
                        />
                        Digi-API
                    </Typography>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                        <img src={logo} alt="Logo" style={{maxWidth: '160px', marginRight: '8px'}}/>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;