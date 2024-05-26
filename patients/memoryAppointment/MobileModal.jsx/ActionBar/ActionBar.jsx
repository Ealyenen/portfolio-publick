import React from 'react';
import { AppBar, Toolbar, IconButton } from "@mui/material"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import MenuIcon from '@mui/icons-material/Menu';
import MemoryAppointmentStore from '../../store/MemoryAppointmentStore.store';

const ActionBar = observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)

    const handleOpenMenu = () => {
        memoryAppointmentStore.switchOpenMobileMenu() 
    }

    return (
        <AppBar position="static" sx={{ bgcolor: "primary.light", position: "sticky", top: 50, zIndex: 9999 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleOpenMenu}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )

})

export default ActionBar