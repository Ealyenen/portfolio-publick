import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import StoreFavoriteAppointmentsModal from "./store/store";
import SlideUpModal from "../../../_components/UI/modals/SlideUpModal";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import ButtonGroup from '@mui/material/ButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from "@mui/material/Typography"
import moment from "moment/moment"
import { StoreGalleryModal } from "../list_days/stores/store"
import Appointment from "../list_days/components/Appointment"
import { toJS } from "mobx"
import FavouriteSlideModal from "../../../_components/UI/modals/FavouriteSlideModal"
import DataStoreListDays from "../../../_components/Layouts/auth-layout/stores/data.store"

const FavoriteAppointmentsModal = observer(({
  // checkedApp,
  // setChekedApp,
  // deleteItem,
  loadAppointmentInfo,patientNamesList
}) => {
  const store = useInstance(StoreFavoriteAppointmentsModal)
  const dataStore = useInstance(DataStoreListDays)
  const patientAppointment = loadAppointmentInfo?.appoinmentSelectedPatient
  const storeImageModal = useInstance(StoreGalleryModal)

  const saveClick = () => {
    store.setOpenModal(false)

    dataStore.clearCheckedUp()
    localStorage.setItem('appointmentsList', JSON.stringify([]));
  }


  useEffect(() => {

    if (patientAppointment) {
      dataStore.setDataProfile(patientAppointment)

    }
  }, [patientAppointment])


  function scrollToAppointment(idForScroll) {
    if (idForScroll) {
      const scrollToElem = document.getElementById(idForScroll);
      scrollToElem?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }

  // let patientNamesList = []
  // let previousPerson = null
  //
  //
  // JSON.parse(localStorage.getItem('appointmentsList'))?.map((item) => {
  //
  //   if (!previousPerson || previousPerson !== item.patient.id) {
  //     patientNamesList.push({
  //       id: item.appointment.appointmentId,
  //       title: `${item?.patient?.lastName ? item?.patient?.lastName : ""} ${item?.patient?.firstName ? item?.patient?.firstName : ""} ${item?.patient?.patronymic ? item?.patient?.patronymic : ""}`,
  //       birthday: item.patient.birthday
  //     })
  //   }
  //   if (previousPerson && previousPerson === item?.patient?.id) {
  //     patientNamesList.push({
  //       id: item.appointment.appointmentId,
  //       title: "",
  //       birthday: ""
  //     })
  //   }
  //   previousPerson = item.patient.id
  //
  //   console.log("previousPerson = item.patient.id", previousPerson)
  // })
  //
  // console.log("patientNamesList", patientNamesList)


  const imageClick = (itemData2, index) => {
    storeImageModal.setOpenModal(itemData2, index)
  }

  return (
    <FavouriteSlideModal
      open={store.openModal}
      title={'Выбранные приемы'}
      closeClick={() => store.setOpenModal(false)}
      saveTitle={'Очистить'}
      saveClick={saveClick}
      // setChekedApp={setChekedApp}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={2}>
          <Box sx={{p: 2}}>

            {dataStore.checkedApp && dataStore.checkedApp?.map((appointment, index) => {

              const takeTimeFormat = (time) => {
                time?.substring(0, 8)
              }

              return (
                <ButtonGroup
                  sx={{mb: 1, width: "100%"}}
                  key={`btn-${appointment.appointment.appointmentId}`}
                  variant="outlined"
                  size="small"
                  aria-label="outlined button group"
                >
                  <>
                    <Box style={{display: "flex", flexDirection: "column", gap: "10px", width: "100%"}}>
                      {patientNamesList[index]?.title?.length > 0 &&
                        <Typography sx={{marginTop: "20px"}}>{patientNamesList[index]?.title}</Typography>}
                      {patientNamesList[index]?.birthday &&
                        <Typography>{moment(patientNamesList[index]?.birthday).format("DD.MM.YYYY")}</Typography>}
                      <Box style={{display: "flex"}}>

                        <Button href={`#app-favorite-${appointment.appointment.appointmentId}`}
                                sx={{borderTopRightRadius: 0, borderBottomRightRadius: 0, width: "100%"}}
                                onClick={() => scrollToAppointment(`${appointment.appointment.appointmentId}`)}
                                fullWidth>
                          <Box>
                            <Typography>
                              {moment(appointment?.appointment?.date).format("DD.MM.YYYY")}
                            </Typography>
                            <Typography>
                              {moment(takeTimeFormat(appointment.timeStart)).format('HH:mm')} - {moment(takeTimeFormat(appointment.timeEnd)).format('HH:mm')}
                            </Typography>
                          </Box>
                        </Button>

                        <Button sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                                onClick={() => {
                                  dataStore.deleteChecked(toJS(appointment.appointment.appointmentId))
                                }}>
                          <ClearIcon />
                        </Button>

                      </Box>
                    </Box>
                  </>
                </ButtonGroup>
              )
            })}

          </Box>
        </Grid>


        <Grid item xs={12} md={8} lg={10}
              sx={{bgcolor: '#dee0f4', height: {md: 'calc(100vh - 32px)'}, overflow: 'auto'}}>
          <Box sx={{p: 0}}>

            {dataStore.checkedApp.map((item) => {

              // const isChecked = dataStore.checkedApp?.some((el) => el.appointment.appointmentId === item.appointment.appointmentId)

              const isChecked = dataStore.checkedApp?.some((el) => {

                return el?.appointment?.appointmentId === item?.appointment?.appointmentId
              })

              return (
                <Grid
                  container spacing={0}
                  sx={{
                    mb: 4,
                    mt: 4,
                  }}
                  key={item.id}
                  id={`${item.appointment.appointmentId}`}
                >
                  <Appointment
                    item={item}
                    isChecked={isChecked}
                    imageClick={imageClick}
                  />
                </Grid>
              )
            })}
          </Box>
        </Grid>
      </Grid>
    </FavouriteSlideModal>
  );
});

export default FavoriteAppointmentsModal;
