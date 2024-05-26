import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Typography, Grid } from "@mui/material"
import AppointmentStore from '../store/appointment.store';
import InfoBlock from './appointmentBodyComponents/InfoBlock';
import ImgBlock from './appointmentBodyComponents/ImageBlock';
import ChequesBlock from './appointmentBodyComponents/ChequesBlock';
import ButtonMain from "../../../../../../../../_components/UI/Buttons/ButtonMain"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AppointmentBody = observer(() => {
    const store = useInstance(AppointmentStore)

    const handleWatchDetailed = () => {
        store.setWatchDetailed(true)
    }

    const handleCloseDetailed = () => {
        store.setWatchDetailed(false)
    }

    return (
        <Grid container sx={{borderBottom: "1px solid", borderColor: "primary.light2"}}>
            <Grid
                item
                md={store.getWatchDetailed() ? 7.5 : 3}
                sx={{
                    borderRight: "1px solid",
                    borderColor: "primary.light2",
                    maxHeight: 600,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box sx={{ flex: 1, overflowY: "scroll" }}>
                    <InfoBlock />
                </Box>
                <Box
                    sx={{
                        p: 2,
                        borderTop: "1px solid",
                        borderColor: "primary.light2",
                        bgcolor: "primary.light3"
                    }}>
                    {store.getWatchDetailed() ?
                        <ButtonMain
                            title="Закрыть"
                            icon={<ArrowBackIcon />}
                            onClick={handleCloseDetailed}
                        />
                        :
                        <ButtonMain
                            title="Подробнее"
                            icon={<ArrowForwardIcon />}
                            onClick={handleWatchDetailed}
                        />
                    }
                </Box>
            </Grid>
            {!store.getWatchDetailed() &&
                <Grid item md={4.5} sx={{ p: 2, pt: 0, maxHeight: 600, overflowY: "scroll" }}>
                    <ChequesBlock />
                </Grid>
            }
            <Grid
                item
                md={4.5}
                sx={{
                    p: 2,
                    borderLeft: "1px solid",
                    borderColor: "primary.light2",
                    overflowY: "scroll",
                    maxHeight: 600
                }}
            >
                <ImgBlock />
            </Grid>
        </Grid>
    );
});

export default AppointmentBody;