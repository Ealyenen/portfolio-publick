import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import StoreAppointmentModal from "./stores/store";
import DataStoreAppointmentModal from "./stores/data.store";
import SlideUpModal from "../../../_components/UI/modals/SlideUpModal";
import { provider } from "react-ioc";
import InfoAppointmentBlock from './components/InfoAppointmentBlock';
import CommonInfoBlockNewAppointment from './components/CommonInfoBlockNewAppointment';
import CommonInfoBlockExistedAppointment from './components/CommonInfoBlockExistedAppointment';
import PhotoStore from './stores/photo.store';
import AllPatientCard from '../store/patientCard.store';
import CashStore from './stores/cash.store';
import StoreAppointmentAnalsies from './stores/analysis.store';
import { fullNameString, SurnameAndInitialsString } from '../../../_common/helpers/nameGenerationString';
import { useMediaQuery, useTheme } from "@mui/material";
import DeletePhotoDialog from './components/DeletePhoto/DeltePhoto';
import StoreAppointmentEstimate from './stores/estimateComponent.store';
import PatientStore from '../store/patient.store';
import moment from "moment"
import PatientEventsStore from '../store/patinetEvents.store';
import { Box } from '@mui/material'
import ButtonMainTimered from "../../../_components/UI/Buttons/ButtonMainTimered"


const AppointmentModal = provider(CashStore, StoreAppointmentAnalsies, PhotoStore, StoreAppointmentEstimate)(observer(() => {
  const store = useInstance(StoreAppointmentModal);
  const dataStore = useInstance(DataStoreAppointmentModal);
  const allPatientCard = useInstance(AllPatientCard)
  const photoStore = useInstance(PhotoStore)
  const analysisStore = useInstance(StoreAppointmentAnalsies)
  const patientStore = useInstance(PatientStore)
  const patientEventsStore = useInstance(PatientEventsStore)

  dataStore?.setCashUnitsCount()

  const mainTheme = useTheme();
  const mobileBreakpointSm = useMediaQuery(mainTheme.breakpoints.down("sm"));

  const [appointmentTitle, setAppointmentTitle] = useState(dataStore.isExisted ? 'Редактирование приема' : 'Новый прием')

  useEffect(() => {
    if (dataStore?.patient) {
      const appointmentType = dataStore.isExisted ? 'Редактирование приема' : 'Новый прием'
      setAppointmentTitle(
        (mobileBreakpointSm ?
          SurnameAndInitialsString(
            dataStore?.patient?.lastName,
            dataStore?.patient?.firstName,
            dataStore?.patient?.patronymic
          )
          :
          fullNameString(
            dataStore?.patient?.lastName,
            dataStore?.patient?.firstName,
            dataStore?.patient?.patronymic
          ) +
          " " +
          appointmentType
        )
      )
      if (!dataStore.isExisted) {
        dataStore.setFromTime(moment(new Date()).format("HH:mm"))
      }
    }
  }, [dataStore?.patient])

  useEffect(() => {
    if (dataStore?.patient && dataStore?.appointmentId) {
      setAppointmentTitle(
        (mobileBreakpointSm ?
          SurnameAndInitialsString(
            dataStore?.patient?.lastName,
            dataStore?.patient?.firstName,
            dataStore?.patient?.patronymic
          ) +
          " " +
          "№" +
          dataStore?.appointmentId
          :
          fullNameString(
            dataStore?.patient?.lastName,
            dataStore?.patient?.firstName,
            dataStore?.patient?.patronymic
          ) +
          " " +
          'Редактирование приема' +
          " " +
          "№" +
          dataStore?.appointmentId
        )
      )
    }
  }, [dataStore, dataStore?.patient, dataStore?.appointmentId])

  const closeModal = () => {
    store.setTabValue(0)
    photoStore.resetStore()
    patientEventsStore.updatePaginationByAppointment(dataStore.appointmentId)
    dataStore.resetData()
    store.setOpenModal(false)
    patientStore.setUpdateAnalisis(true)
    allPatientCard.setRefetching(true)
    store.setActionWait(false)
  }

  const handleSave = () => {
    console.log("save click appointment")
    return new Promise((resolve, reject) => {
      if (store.tabValue === dataStore.appointmentBlocksIds.photo) {
        if (photoStore.permissionToClosePhotosBlock) {
          photoStore.saveAppointmentFromPhotos().then(() => {
            patientEventsStore.updatePaginationByAppointment(dataStore.appointmentId)
            dataStore.resetData()
            store.setTabValue(0)
            photoStore.resetStore()
            store.setOpenModal(false)
            resolve(true)
            store.setActionWait(false)
          })
        } else {
          alert ("Невозможно сохранить прием. Закончите редактирование фото")
          resolve(false)
          store.setActionWait(false)
        }
      } else if (dataStore.appointmentBlocksIds.analisis.includes(store.tabValue)) {
        analysisStore.saveAnalisis(
          dataStore.appointmentId
        ).catch(() => {
          store.setActionWait(false)
        }).then((data) => {
          if (data) {
            patientEventsStore.updatePaginationByAppointment(dataStore.appointmentId)
            dataStore.resetData()
            store.setTabValue(0)
            photoStore.resetStore()
            store.setOpenModal(false)
            resolve(true)
            store.setActionWait(false)
          }
          patientEventsStore.updatePaginationByAppointment(dataStore.appointmentId)
          store.setActionWait(false)
        })
      } else if ([dataStore.appointmentBlocksIds.reason,
      dataStore.appointmentBlocksIds.complaints,
      dataStore.appointmentBlocksIds.anamnesis,
      dataStore.appointmentBlocksIds.objectively,
      dataStore.appointmentBlocksIds.work,
      dataStore.appointmentBlocksIds.home,
      dataStore.appointmentBlocksIds.reccomendations,
      dataStore.appointmentBlocksIds.consultation,
      dataStore.appointmentBlocksIds.comment,
      dataStore.appointmentBlocksIds.nexAppointment].includes(store.tabValue)) {
        dataStore.saveAppointment().then((data) => {
          if (data) {
            patientEventsStore.updatePaginationByAppointment(dataStore.appointmentId)
            dataStore.resetData()
            store.setTabValue(0)
            photoStore.resetStore()
            store.setOpenModal(false)
          }
          resolve(true)
          store.setActionWait(false)
        })
      } else {
        patientEventsStore.updatePaginationByAppointment(dataStore.appointmentId)
        dataStore.resetData()
        store.setTabValue(0)
        photoStore.resetStore()
        store.setOpenModal(false)
        resolve(true)
        store.setActionWait(false)
      }
    });
  }


  const saveClick = () => {
    store.setActionWait(true)
    handleSave().then(() => {
      patientStore.setUpdateAnalisis(true)
      allPatientCard.setRefetching(true)
    })
  }


  return (
    <>
      <SlideUpModal
        open={store.openModal}
        title={appointmentTitle}
        // saveClick={() => saveClick()}
        closeClick={() => closeModal()}

        customBtn={<ButtonMainTimered
          color={"contrastLight"}
          title={"Сохранить"}
          timerTitle={"Ожидайте"}
          onClick={saveClick} />}
      >
        {dataStore.isExisted ?
          <CommonInfoBlockExistedAppointment />
          :
          <CommonInfoBlockNewAppointment />
        }
        <InfoAppointmentBlock />
      </SlideUpModal>
      {store.deletePhotoModalOpen && <DeletePhotoDialog />}
    </>
  );
}));

export default AppointmentModal;