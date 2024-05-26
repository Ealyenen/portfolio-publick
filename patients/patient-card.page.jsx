import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import StoreEditPatientCardModal from "./edit_patient_card/stores/store";
import StoreOtherCommunicationsModal from "./other_communications/stores/store";
import OtherCommunicationsModal from "./other_communications/OtherCommunicationsModal";
import StorePhonesModal from "./phones/stores/store";
import PhonesModal from "./phones/PhonesModal";
import StoreDeptModal from "./dept/stores/store";
import DeptModal from "./dept/DeptModal";
import StoreFavoriteAppointmentsModal from "./favorite_appointments/store/store";
import NavStore from "../../_components/Layouts/auth-layout/stores/nav.store";
import EditPatientCardModal from "./edit_patient_card/EditPatientCardModal"
import AdditionStore from './AdditionalModal/store/additionalModal.store';
import AdditionModal from './AdditionalModal/AdditionalModal';
import DeleteAddition from './AdditionalModal/DeleteAdditional';
import StoreAppointmentModal from './appointment_modal/stores/store';
import DataStoreAppointmentModal from './appointment_modal/stores/data.store';
import AppointmentModal from './appointment_modal/AppointmentModal';
import AllPatientCard from './store/patientCard.store';
import DeleteAppointmentDialog from './appointment_modal/components/DeleteAppointment/DeleteAppointment';
import StoreAppointmentAnalysis from './appointment_modal/stores/analysis.store';
import StoreConfirmationOfUseBalanceForCheque
  from './appointment_modal/components/Cash/confirmationOfUseBalance/store/confirmationOfUseBalance.store';
import ConfirmationOfUseBalance
  from './appointment_modal/components/Cash/confirmationOfUseBalance/ConfirmationOfUseBalance';
import RefetchingStore from "../calls/stores/refetch.store"
import { useMediaQuery, useTheme } from "@mui/material";
import PatientCommonInfo from './patientCommonInfo/patientCommonInfo';
import PatientStore from './store/patient.store';
import QuestionaryModalViewStore from './questionary_modal/store/questionaryModal.view.store';
import QuestionaryModal from './questionary_modal/QuestionaryModal';
import PatientEventsBlock from './patientEvents/PatientEventsBlock';
import EventsFiltersModal from './eventsFiltersModal/EventsFiltersModal';
import EventsFiltersModalStore from './eventsFiltersModal/store/eventsFiltersModal.store';
import PatientEventsBlockStore from './store/patientEventsBlock.store';
import PatientEventsStore from './store/patinetEvents.store';
import ChangeBalanceModalStore from './changeBalanceModal/store/changeBalanceModal.store';
import ChangeBalanceModal from './changeBalanceModal/ChangeBalanceModal';
import ChangeIsPrepaidModalStore from './changeIsPrepaidModal/store/changeIsPrepaidModal';
import ChangeIsPrepaidModal from './changeIsPrepaidModal/ChangeIsPrepaidModal';
import MemoryAppointmentStore from './memoryAppointment/store/MemoryAppointmentStore.store';
import MemoryAppointmentModal from './memoryAppointment/MemoryAppointmentModal';

const PatientCardPage = provider(
  PatientStore,
  StoreAppointmentModal,
  DataStoreAppointmentModal,
  StoreEditPatientCardModal,
  StoreOtherCommunicationsModal,
  StorePhonesModal,
  StoreDeptModal,
  StoreFavoriteAppointmentsModal,
  AdditionStore,
  AllPatientCard,
  StoreAppointmentAnalysis,
  StoreConfirmationOfUseBalanceForCheque,
  RefetchingStore,
  QuestionaryModalViewStore,
  ChangeBalanceModalStore,
  ChangeIsPrepaidModalStore,
  EventsFiltersModalStore,
  PatientEventsBlockStore,
  PatientEventsStore,
  MemoryAppointmentStore
)(observer(() => {
  const patientStore = useInstance(PatientStore)
  const storeAppointmentModal = useInstance(StoreAppointmentModal);
  const storeOtherCommunicationsModal = useInstance(StoreOtherCommunicationsModal);
  const storePhonesModal = useInstance(StorePhonesModal);
  const storeDeptModal = useInstance(StoreDeptModal);
  const additionStore = useInstance(AdditionStore)
  const storeConfirmationOfUseBalanceForCheque = useInstance(StoreConfirmationOfUseBalanceForCheque)
  const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)
  const changeBalanceModalStore = useInstance(ChangeBalanceModalStore)
  const changeIsPrepaidModalStore = useInstance(ChangeIsPrepaidModalStore)
  const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)
  const storeEditPatientCard = useInstance(StoreEditPatientCardModal)
  const memoryAppointmentStore = useInstance(MemoryAppointmentStore)

  const params = useParams();
  const nav = useInstance(NavStore)

  const mainTheme = useTheme();
  const mobileBreakpointLg = useMediaQuery(mainTheme.breakpoints.down("lg"));

  useEffect(() => {
    patientStore.setPatientId(params.id)
  }, [])

  useEffect(() => {
    const NameAndBirthday = mobileBreakpointLg ? patientStore.cardTitleShort : patientStore.cardTitle
    document.title = NameAndBirthday
    nav?.setHeaderTitle(NameAndBirthday)
    nav?.setSelectedIndex(1)
    nav?.setCopyText(NameAndBirthday)
  }, [patientStore.cardTitle, mobileBreakpointLg])

  return (
    <>
      {patientStore.getPatientId() &&
        <>
          <PatientCommonInfo />
          <PatientEventsBlock />
          {eventsFiltersModalStore.getOpenFiltersModal() && <EventsFiltersModal />}

          {storeAppointmentModal.openModal && <AppointmentModal />}
          {changeBalanceModalStore.getOpenModal() && <ChangeBalanceModal />}
          {storeEditPatientCard.openModal && storeEditPatientCard.loading !== true &&
            storeEditPatientCard.loadPatientInfo.phones && storeEditPatientCard.actualDiseasesPatientById.length>0 &&
            <EditPatientCardModal loadingPatient={false} />
          }
          {storeOtherCommunicationsModal.openModal && <OtherCommunicationsModal />}
          {storePhonesModal.openModal && <PhonesModal />}
          {storeDeptModal.openModal && <DeptModal />}
          {additionStore.openModal && <AdditionModal />}
          {additionStore.openDeleteDialog && <DeleteAddition />}
          {storeAppointmentModal.deleteAppointmentModalOpen && <DeleteAppointmentDialog />}
          {storeConfirmationOfUseBalanceForCheque.openModal && <ConfirmationOfUseBalance />}
          {questionaryModalViewStore.getOpenModal() && <QuestionaryModal />}
          {changeIsPrepaidModalStore.getOpenModal() && <ChangeIsPrepaidModal/>}
          {memoryAppointmentStore.getOpenModal() && <MemoryAppointmentModal/>}
        </>
      }
    </>
  );
}));
export default PatientCardPage;
