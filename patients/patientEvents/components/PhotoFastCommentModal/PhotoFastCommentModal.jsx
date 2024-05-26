import * as React from 'react';
import { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel } from "@mui/material";
import { useInstance } from 'react-ioc';
import BaseModal from '../../../../../_components/UI/modals/BaseModal';
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form"
import { FullPageFallbackProgress } from "../../../../../_components/UI/preloaders/FullPageFallbackProgress"
import { useMutation } from "@apollo/client";
import { observer } from "mobx-react-lite"
import { UPDATE_APPOINTMENT_FAST_TITLES_PHOTO } from "../../../_mutations/patients.mutations"
import Typography from "@mui/material/Typography"
import { toJS } from "mobx"
import { StorePhotoFastCommentModal } from './store/PhotoFastCommentModal.store';
import PatientEventsStore from '../../../store/patinetEvents.store';

const PhotoFastCommentModal = observer(() => {
  const storePhotoFastCommentModal = useInstance(StorePhotoFastCommentModal)
  const patientEventsStore = useInstance(PatientEventsStore)


  const {
    handleSubmit,
    control,
  } = useForm({
    mode: 'all',
  });

  const [updateAppointment, { data: updateAppointmentData }] = useMutation(UPDATE_APPOINTMENT_FAST_TITLES_PHOTO);


  useEffect(() => {

  }, [storePhotoFastCommentModal.preloader, storePhotoFastCommentModal.photos])


  let initialCheckedPhotos = []

  storePhotoFastCommentModal.photos.forEach((el) => {

    el.children.forEach((item) => {

      if (!!item.isEnabled) {
        initialCheckedPhotos.push(+item.id)
      }
    })
  })

  let checkedPhotos = []

  const [currentCheckedIds, setCurrentCheckedIds] = useState([])

  const saveClick = (data) => {

    if (currentCheckedIds.length > 0) {

      currentCheckedIds.forEach((el) => {

        if (el.isEnabled === true) {
          checkedPhotos.push(+el.id)
        }
      })
    }

    const filteredInitialTitles = () => {

      const filteredInitialTitlesNew = initialCheckedPhotos.filter((id) =>
        !currentCheckedIds.map((item) => {
          return +item.id
        }).includes(id) ||
        currentCheckedIds.map((item) => {

          if (item.isEnabled === true) {
            return +item.id
          } else {
            return
          }
          return
        }).includes(id)
      )

      return filteredInitialTitlesNew
    }

    const allCheckedPhotos = [...filteredInitialTitles(), ...checkedPhotos]

    updateAppointment({
      variables: {
        "input": {
          reasonAppeal: storePhotoFastCommentModal.reasonAppeal,
          patientId: storePhotoFastCommentModal.patientId,
          appointmentId: storePhotoFastCommentModal.appointmentId,
          center: storePhotoFastCommentModal.center,
          images: [
            {
              imageId: storePhotoFastCommentModal.photoId,
              typeId: allCheckedPhotos,
              clearTypes: allCheckedPhotos.length === 0 ? true : false,
            }
          ]
        }
      }
    }).then((data) => {
      patientEventsStore.updatePaginationByAppointment(storePhotoFastCommentModal.appointmentId)
      storePhotoFastCommentModal.setClearAppointmentId()
      storePhotoFastCommentModal.setClearPatientId()
      storePhotoFastCommentModal.setClearReasonAppeal()
      storePhotoFastCommentModal.setClearCenter()

      storePhotoFastCommentModal.setOpenPhotoFastCommentModal(false)
    })
  }


  return (
    <BaseModal
      open={storePhotoFastCommentModal.openModal}
      title={'Изменить подпись фото'}
      onClose={() => storePhotoFastCommentModal.setOpenPhotoFastCommentModal(false)}
      saveClick={handleSubmit(saveClick)}
      maxWidth={"md"}
    >
      <form action="" style={{
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}>

        <Grid container sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

          {!!storePhotoFastCommentModal.preloader && <FullPageFallbackProgress />}

          {!!storePhotoFastCommentModal.photos && storePhotoFastCommentModal.preloader === false && < >

            {storePhotoFastCommentModal.photos.map((el) => {

              return (
                <Grid
                  item key={el.id}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid container>
                    <Grid item>
                      <Typography
                        variant={"h6"}
                        sx={{
                          mt: { xs: 3, sm: 0 },
                          mb: 2,
                          width: { xs: 280, sm: 200 },
                          borderBottom: "1px solid",
                          borderBottomColor: "primary.light",
                          pb: 1
                        }}>{el.name}</Typography>

                      {el.children.map((item, index) => {

                        return (
                          <Grid item xs={12} sm={12} key={item.id}>
                            <FormControlLabel
                              label={`${item.name}`}
                              defaultValue={item.isEnabled}
                              control={
                                <Controller
                                  name={`id:${item.id}, isEnabled:${item.isEnabled}`}
                                  control={control}
                                  defaultValue={item.isEnabled}
                                  render={({ field: props }) => {

                                    return (
                                      <Checkbox
                                        {...props}
                                        value={el.isEnabled}
                                        checked={props.value}
                                        onChange={(e) => {
                                          props.onChange(e.target.checked)
                                        }}
                                        onClick={(e) => {
                                          setCurrentCheckedIds(
                                            (prevState) => {

                                              return [...prevState, { id: item.id, isEnabled: e.target.checked }]
                                            }
                                          )
                                        }}
                                      />
                                    )
                                  }
                                  }
                                />
                              }
                            />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              )
            })
            }
          </>}
        </Grid>
      </form>
    </BaseModal>
  );
});

export default PhotoFastCommentModal;