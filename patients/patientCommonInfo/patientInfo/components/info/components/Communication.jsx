import React from 'react';
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import SmsIcon from '@mui/icons-material/Sms';
import StoreOtherCommunicationsModal from '../../../../../other_communications/stores/store';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import StorePhonesModal from '../../../../../phones/stores/store';
import CallBtn from './CallBtn';



const Communication = observer(() => {
    const patientStore = useInstance(PatientStore)
    const storeOtherCommunicationsModal = useInstance(StoreOtherCommunicationsModal)
    const storePhonesModal = useInstance(StorePhonesModal)

    const handleSmsClick = () => {
        storeOtherCommunicationsModal.setOpenModal(true)
    }

    const handleOpenPhones = () => {
        storePhonesModal.setOpenModal(true)
    }


    return (
        <Box
            sx={{
                pb: 2,
                pt: 2,
                borderBottom: patientStore.getIsPatient() ? "1px solid" : "none",
                borderColor: "primary.light4",
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: patientStore.getIsPatient() ? "space-between" : "start"
            }}>
            <CallBtn />
            {patientStore.getPhones()?.length > 1 &&
                <ButtonMain
                    title="Телефоны"
                    icon={
                        <AddIcCallIcon />
                    }
                    mobileOnlyIcon
                    onClick={handleOpenPhones}
                />
            }
            <ButtonMain
                title="Отправка смс"
                icon={
                    <SmsIcon />
                }
                mobileOnlyIcon
                sx={{ flex: { xs: "none", md: patientStore.getIsPatient() ? 1 : "none" }, minWidth: { xs: 64, md: 181 } }}
                onClick={handleSmsClick}
            />
        </Box>
    );
});

export default Communication;