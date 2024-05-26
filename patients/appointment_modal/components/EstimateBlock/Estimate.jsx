import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { provider } from "react-ioc";
import StoreAppointmentEstimate from '../../stores/estimateComponent.store';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import { useMediaQuery, useTheme } from "@mui/material";
import PriceDataGrid from './PriceDataGrid';

const EstimateBlock = provider()(observer(() => {
    const estimateStore = useInstance(StoreAppointmentEstimate)

    useEffect(() => {
        estimateStore.setDefaultActiveTab().then(() => {
            estimateStore.getPriceListRequest()
        })
    }, [estimateStore])

    const mainTheme = useTheme();
    const mobileBreakpointSm = useMediaQuery(mainTheme.breakpoints.down("sm"));


    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function TabLabel(label) {
        return mobileBreakpointSm ? "" : label
    }

    function TabIcon(typeServices) {
        let icon = <MedicalServicesIcon />
        switch (typeServices) {
            case "MEDICAL":
                icon = <MedicalServicesIcon />
                break
            case "DOMESTIC":
                icon = <HomeIcon />
                break
            default:
                icon = <MedicalServicesIcon />
        }
        return icon
    }


    const handleTabChange = (event, value) => {
        estimateStore.setActiveTab(value).then(() => {
            estimateStore.getPriceListRequest()
        })
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={estimateStore?.activeTab?.id || 0} onChange={handleTabChange} aria-label="basic tabs example">
                        {estimateStore.tabs?.map((tab) => {
                            return (
                                <Tab
                                    label={TabLabel(tab?.label)}
                                    id={`estimate-tab-${tab?.id}`}
                                    aria-controls={`estimate-tab-${tab?.id}`}
                                    key={`estimate-tab-${tab?.id}`}
                                    icon={TabIcon(tab?.typeServices)}
                                    iconPosition="end"
                                />
                            )
                        })}
                    </Tabs>
                </Box>
                {estimateStore.tabs?.map((tab, index) => {
                    return (
                        <CustomTabPanel value={estimateStore?.activeTab?.id || 0} index={index}>
                            <PriceDataGrid />
                        </CustomTabPanel>
                    )
                })}
            </Box>
        </>
    )
}));

export default EstimateBlock