import React from 'react';
import { Badge, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import ButtonMain from '../../../../../_components/UI/Buttons/ButtonMain';
import AddIcon from '@mui/icons-material/Add';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditIcon from '@mui/icons-material/Edit';
import PatientStore from '../../../store/patient.store';
import StoreFavoriteAppointmentsModal from '../../../favorite_appointments/store/store';
import StoreAppointmentModal from '../../../appointment_modal/stores/store';
import DataStoreAppointmentModal from '../../../appointment_modal/stores/data.store';
import AdditionStore from '../../../AdditionalModal/store/additionalModal.store';
import StoreDeptModal from '../../../dept/stores/store';
import StoreEditPatientCardModal from '../../../edit_patient_card/stores/store';
import AddCardIcon from '@mui/icons-material/AddCard';
import ChangeBalanceModalStore from "../../../changeBalanceModal/store/changeBalanceModal.store"
import ChangeIsPrepaidModalStore from '../../../changeIsPrepaidModal/store/changeIsPrepaidModal';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import MemoryBtn from './MemoryBtn';

const PatientBreadCrumbs = observer(() => {
    const patientStore = useInstance(PatientStore)
    const storeAppointmentModal = useInstance(StoreAppointmentModal)
    const dataStoreAppointmentModal = useInstance(DataStoreAppointmentModal)
    const additionStore = useInstance(AdditionStore)
    const storeEditPatientCardModal = useInstance(StoreEditPatientCardModal)
    const storeDeptModal = useInstance(StoreDeptModal)
    const changeBalanceModalStore = useInstance(ChangeBalanceModalStore)
    const changeIsPrepaidModalStore = useInstance(ChangeIsPrepaidModalStore)

    const handleAddAppointment = () => {
        storeAppointmentModal.setOpenModal(true)
        dataStoreAppointmentModal.setPatientToAppointment({
          id: patientStore?.getPatientId(),
          lastName: patientStore?.getLastName(),
          firstName: patientStore?.getFirstName(),
          patronymic: patientStore?.getPatronymic()
        })
    }

    const handleAddInfoBlock = () => {
        additionStore.setOpenModal(true)
    }

    const handleEditCard = () => {
        storeEditPatientCardModal.setOpenModal(true, patientStore.getPatientId())
    }

    const handleTransactions = () => {
        storeDeptModal.setOpenModal(true)
    }

    const handleChangeBalance = () => {
        changeBalanceModalStore.setOpenModal(true)
    }

    const handleChangeIsPrepaid = () => {
        changeIsPrepaidModalStore.setOpenModal(true)
    }

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
            <ButtonMain
                title="Создать прием"
                icon={<AddIcon />}
                mobileOnlyIcon
                onClick={handleAddAppointment}
            />
            <ButtonMain
                title="Создать инфоблок"
                icon={<DataSaverOnIcon />}
                mobileOnlyIcon
                onClick={handleAddInfoBlock}
            />
            <ButtonMain
                title="Редактировать карту"
                icon={<EditIcon />}
                mobileOnlyIcon
                onClick={handleEditCard}
            />
            <ButtonMain
                title="Баланс: история"
                icon={<AccountBalanceWalletIcon />}
                mobileOnlyIcon
                onClick={handleTransactions}
            />
            <ButtonMain
                title="Изменить баланс"
                icon={<AddCardIcon />}
                mobileOnlyIcon
                onClick={handleChangeBalance}
            />
            <MemoryBtn/>
            <ButtonMain
                title='Изменить "по предоплате"'
                icon={<CurrencyRubleIcon />}
                mobileOnlyIcon
                onClick={handleChangeIsPrepaid}
            />
        </Box>
    );
});

export default PatientBreadCrumbs;