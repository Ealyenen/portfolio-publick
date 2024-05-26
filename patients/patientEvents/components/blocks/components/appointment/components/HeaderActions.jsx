import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { ButtonGroup } from "@mui/material"
import AppointmentStore from '../store/appointment.store';
import ButtonMain from "../../../../../../../../_components/UI/Buttons/ButtonMain"
import EditIcon from '@mui/icons-material/Edit';
import FavoriedBtn from './FavoriedBtn';
import DataStoreAppointmentModal from '../../../../../../appointment_modal/stores/data.store';
import StoreAppointmentModal from '../../../../../../appointment_modal/stores/store';

const HeaderActions = observer(() => {
    const store = useInstance(AppointmentStore)
    const dataStoreAppointmentModal = useInstance(DataStoreAppointmentModal)
    const storeAppointmentModal = useInstance(StoreAppointmentModal)

    const handleEdit = () => {
        dataStoreAppointmentModal.setCommonInfoForExist(store.getAppointment()?.appointmentId)
        dataStoreAppointmentModal.getTextTabInfo(0)
        storeAppointmentModal.setOpenModal(true)
    }

    return (
        <ButtonGroup>
            <ButtonMain
                icon={<EditIcon />}
                onClick={handleEdit}
            />
            <FavoriedBtn />
        </ButtonGroup>
    );
});

export default HeaderActions;