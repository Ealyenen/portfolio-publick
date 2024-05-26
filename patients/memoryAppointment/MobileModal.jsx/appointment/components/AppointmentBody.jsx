import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material"
import AppointmentStore from '../store/appointment.store';
import InfoBlock from './appointmentBodyComponents/InfoBlock';
import ImgBlock from './appointmentBodyComponents/ImageBlock';
import ChequesBlock from './appointmentBodyComponents/ChequesBlock';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AppointmentBody = observer(() => {
    const store = useInstance(AppointmentStore)

    const switchTabViewMode = () => {
        switch (store.getTabValue()) {
            case 0:
                return (
                    <Box>
                        <InfoBlock />
                    </Box>
                )
            case 1:
                return (
                    <Box sx={{ p: 2 }}>
                        <ChequesBlock />
                    </Box>
                )
            case 2:
                return (
                    <Box sx={{ p: 2 }}>
                        <ImgBlock />
                    </Box>
                )
            default:
                return (
                    <InfoBlock />
                )
        }
    }

    function tabProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const changeTab = (e, v) => {
        store.setTabValue(v)
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={store.getTabValue()} onChange={changeTab} aria-label="basic tabs example">
                        <Tab label="Инфо" {...tabProps(0)} />
                        <Tab label="Чеки" {...tabProps(1)} />
                        <Tab label="Фото" {...tabProps(2)} />
                    </Tabs>
                </Box>
                <Box>
                    {switchTabViewMode()}
                </Box>
            </Box>
        </>

    );
});

export default AppointmentBody;