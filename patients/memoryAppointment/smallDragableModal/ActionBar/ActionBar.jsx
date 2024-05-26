import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer } from "@mui/material"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import ChangeModeBtn from './components/ChangeModeBtn';
import MenuIcon from '@mui/icons-material/Menu';
import moment from "moment"
import { fullNameString } from '../../../../../_common/helpers/nameGenerationString';
import MemoryAppointmentStore from '../../store/MemoryAppointmentStore.store';
import MemoryAppointmentDataStore from '../../store/MemoryAppointmentDataStore.store';

const ActionBar = observer(({ appointment }) => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const dataStore = useInstance(MemoryAppointmentDataStore)

    const handleOpenMenu = (e) => {
        if (e.currentTarget) {
            memoryAppointmentStore.setOpenMenu(e.currentTarget)
        }
    }

    const disableMenuBtn = () => {
        if (dataStore.appointments?.length>0){
            return false
        }
        return true
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "primary.light" }}>
                <Toolbar sx={{pt: 1, pb: 1}}>
                    <IconButton
                        disabled={disableMenuBtn()}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleOpenMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    {appointment ?
                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, flexGrow: 1 }}>
                            <Typography>
                                {appointment?.date ? moment(appointment?.date).format("DD.MM.YYYY") : ""}{" "}{appointment?.timeStart?.slice(0, 5)} {appointment?.isDone && <>- {appointment?.timeEnd?.slice(0, 5)}</>}
                            </Typography>
                            <Typography>
                                {appointment?.patient &&
                                    fullNameString(appointment?.patient?.lastName, appointment?.patient?.firstName, appointment?.patient?.patronymic)
                                }
                            </Typography>
                        </Box>
                    : ""
                    }
                    <ChangeModeBtn />
                </Toolbar>
            </AppBar>
        </Box>
    )
})

export default ActionBar