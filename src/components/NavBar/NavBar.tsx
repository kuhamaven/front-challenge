import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom"
import './NavBar.css'
var logo = require('../../assets/Ver1.png');
var dotSprite = require('../../assets/Agumon_vpet_dmc.gif');

type NavBarProps = {
    filterBar?: React.ReactNode;
}

function NavBar({ filterBar }: NavBarProps) {
    const navigate = useNavigate()
    const handleLogoClick = () => {
        navigate('/');
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
                    <div className={'navbar-child'}>
                        {filterBar}
                    </div>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                        <img src={logo} alt="Logo" className={'navbar-logo-main'}/>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;