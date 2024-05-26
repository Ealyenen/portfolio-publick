import React, { useState } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import StyledSelect from "../../../admin/components/StyledSelect"
import { booleanAnswerOptions, testOptionsSex } from "../DataNewPatientConstants"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { observer } from "mobx-react-lite"
import { styled } from "@mui/material/styles"
import TextMaskCustom from "../../../../_components/TextMaskPhone/TextMaskPhone"
import { dateOfBirthdayMask } from "../../../../_common/helpValues/inputParametrs"
import { useInstance } from "react-ioc"
import StoreNewPatientCardModal from "../stores/store"
import authStore from "../../../../_common/stores/auth.store"


export const StyledContainer = styled(Grid)(({theme}) => ({
  pr: {xs: 2, md: 2},
  marginTop: "2rem",
  borderTop: "1px solid",
  borderColor: theme.palette.primary.light2,
}));
const FirstFormSection = observer((props) => {

  const {
    register, control, setValue, errors, allCities, metroMoscow,
    allSources, userIsPatient, getValues, getOption, isManagementGroup
  } = props


  const [ageDD, setAge] = useState("")
  const [valueDateAdd, setValueDateAdd] = useState(new Date());
  const storeNewPatientCardModal = useInstance(StoreNewPatientCardModal)


  function dateToFormatBirth(string) {

    const dateToArray = string.split(".")

    const getDay = dateToArray[1]
    const getMonth = dateToArray[0]
    const getYear = dateToArray[2]

    const dateActual = `${getYear}${getMonth}${getDay}`

    const dob = dateActual;

    const year = Number(dob.substr(0, 4));
    const month = Number(dob.substr(4, 2)) - 1;
    const day = Number(dob.substr(6, 2));
    const today = new Date();

    let age = today.getFullYear() - year;

    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }

    setAge(age)
    setValue("age", age)
    return age;

  }

  return (
    <>
      <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}, marginTop: "0"}}>
        <Grid item xs={6}>
          <TextField
            style={{width: "100%"}}
            {...register('lastName', {required: true})}
            id={"lastName"}
            type={"text"}
            name={"lastName"}
            label={"Фамилия*"}
            size={"small"}
            focused
            defaultValue={''}
            placeholder={"Фамилия"}
            error={errors.lastName}
            color={errors.lastName && "error"}
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <span style={{color: "red", fontSize: "12px"}}>Обязательное поле</span>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{width: "100%"}}
            label="Имя*"
            size="small"
            focused
            {...register('firstName', {required: true})}
            id={"firstName"}
            type={"text"}
            name={"firstName"}
            defaultValue={''}
            placeholder={"Имя"}
            error={errors.firstName}
            color={errors.firstName && "error"}
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <span style={{color: "red", fontSize: "12px"}}>Обязательное поле</span>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{width: "100%"}}
            label="Отчество"
            size="small"
            focused
            {...register('patronymic')}
            id={"patronymic"}
            type={"text"}
            name={"patronymic"}
            defaultValue={''}
            placeholder={"Отчество"}
          />
        </Grid>

        <Grid item xs={6}>
          <Box sx={{width: {xs: "100%", sm: "50%"}, paddingRight: "1rem"}}>
            <Controller
              name="sex"
              control={control}
              type="text"
              defaultValue={"EMPTY"}
              render={({field}) => {
                return (
                  <StyledSelect
                    field={field}
                    options={testOptionsSex}
                    selectLabelId="sex-select-label"
                    selectLabel="Пол"
                  />
                )
              }}
            />
          </Box>
        </Grid>
      </StyledContainer>

      <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>
        <Grid item xs={6}>

          <Controller
            name={"birthday"}
            control={control}
            render={({field: {onChange, value}}) => (

              <TextField
                onChange={onChange}
                label={"Дата рождения"}
                size="small"
                focused

                InputProps={{
                  inputComponent: TextMaskCustom,
                  inputProps: {
                    mask: dateOfBirthdayMask,
                    guide: true,
                    placeholder: "__.__.____"
                  },
                }}

                onBlur={() => {

                  const date = getValues("birthday").split('.')
                  const month = date[1]
                  const day = date[0]
                  const year = date[2]
                  const dateForParse = month + "." + day + "." + year


                  if (month !== undefined) {
                    dateToFormatBirth(dateForParse)
                  } else if (true) {
                    setAge("")
                    setValue("age", "")
                  }

                }}
              />
            )}
          />

        </Grid>

        {userIsPatient && <Grid item xs={6}>
          <Controller
            name="age"
            control={control}
            defaultValue={ageDD ? ageDD : ""}

            render={({field: {onChange, value}}) => {
              return (
                <TextField
                  disabled
                  onChange={onChange}
                  label="Возраст"
                  size="small"
                  focused
                  value={value}
                  style={{width: "100%"}}
                />
              )
            }}
          />
        </Grid>}


        <Grid item xs={6}>
          <TextField
            style={{width: "100%"}}
            label="Паспорт"
            size="small"
            focused
            name="passport"
            {...register('passport')}
            placeholder={"Паспорт"}
            defaultValue={''}
          />
        </Grid>
      </StyledContainer>

      <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>

        {userIsPatient && allCities && allCities.length > 0 && <Grid item xs={6}>
          <Controller
            control={control}
            name={"city"}

            render={({field: {onChange, value}}) => {

              return (
                <Autocomplete
                  disabled={!userIsPatient}
                  freeSolo
                  options={allCities && allCities.sort((a, b) => -b.name.localeCompare(a.name))}
                  getOptionLabel={option => option.name}
                  renderOption={(props, option) => {

                    return (
                      <Box
                           sx={{
                             display: 'flex',
                             justifyContent: 'space-between',
                             width: '100%'
                           }} {...props}>
                        <Box>{option.name}</Box>
                      </Box>
                    )
                  }
                  }
                  onChange={
                    (event, values, reason) => {

                      onChange(values);
                    }
                  }
                  renderInput={(params) => {

                    return (
                      <TextField
                        disabled={!userIsPatient}
                        {...params}
                        label={"Город"}
                        margin="normal"
                        variant="outlined"
                        focused={true}
                        size={"small"}
                        sx={{margin: "0"}}
                      />
                    );
                  }}

                />
              )
            }}
          />
        </Grid>}

        <Grid item xs={6}>
          <TextField
            {...register('newCity')}
            id={"newCity"}
            type={"text"}
            name={"newCity"}
            defaultValue={""}
            label={"Новый город"}
            size={"small"}
            focused
            style={{width: "100%"}}
            placeholder={"Новый город"}
          />
        </Grid>

        {userIsPatient && metroMoscow && <Grid item xs={6}>
          <Controller
            control={control}
            name={"metro"}
            render={({field: {onChange, value}}) => {

              return (
                <Autocomplete
                  disabled={!userIsPatient}
                  freeSolo
                  options={metroMoscow.sort((a, b) => -b.name.localeCompare(a.name))}

                  getOptionLabel={option => option.name}
                  renderOption={(props, option) => {

                    return (
                      <Box
                           sx={{
                             display: 'flex',
                             justifyContent: 'space-between',
                             width: '100%'
                           }} {...props}>
                        <Box>{option.name}</Box>
                      </Box>
                    )
                  }
                  }
                  onChange={
                    (event, values, reason) => {

                      onChange(values);
                    }
                  }
                  renderInput={(params) => {

                    return (
                      <TextField
                        disabled={!userIsPatient}
                        {...params}
                        label={"Метро"}
                        margin="normal"
                        variant="outlined"
                        focused={true}
                        size={"small"}
                        sx={{margin: "0"}}
                      />
                    );
                  }}

                />
              )
            }}
          />
        </Grid>}

        <Grid item xs={6}>
          <TextField
            {...register('newMetro')}
            id={"newMetro"}
            type={"text"}
            name={"newMetro"}
            defaultValue={""}
            label={"Новая станция"}
            size={"small"}
            focused
            style={{width: "100%"}}
            placeholder={"Новая станция"}
          />
        </Grid>
      </StyledContainer>



      <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>

        {userIsPatient && <Grid item xs={6}>
          <Controller
            name="source"
            control={control}
            type="text"
            defaultValue={""}
            render={({field}) => {
              return (
                <StyledSelect
                  field={field}
                  options={allSources}
                  selectLabelId="source-select-label"
                  selectLabel="Источник"
                  defaultValueSelect="Источник"
                  compositeValue
                  disabledSelect={!userIsPatient}
                />
              )
            }}
          />
        </Grid>}

        {userIsPatient && <Grid item xs={6}>
          <TextField
            {...register('newSource')}
            id={"newSource"}
            type={"text"}
            name={"newSource"}
            defaultValue={""}
            label={"Другой источник"}
            size={"small"}
            focused
            style={{width: "100%"}}
            placeholder={"Другой источник"}
            disabled={!userIsPatient}
          />
        </Grid>}


        {storeNewPatientCardModal.admins && <Grid item xs={6}>
          <Controller
            control={control}
            name={"manager"}

            defaultValue={!!authStore.user ? authStore.user : ""}

            render={({field: {onChange, value}}) => {

              return (
                <Autocomplete
                  disabled={true}
                  freeSolo
                  options={storeNewPatientCardModal.admins.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
                  value={!!authStore.user ? authStore.user : ""}
                  getOptionLabel={option => getOption(option)}
                  renderOption={(props, option) => {

                    return (
                      <Box
                           sx={{
                             display: 'flex',
                             justifyContent: 'space-between',
                             width: '100%'
                           }} {...props}>
                        <Box>{option.lastName} {option.firstName} {option.patronymic ? option.patronymic : ""}</Box>
                      </Box>
                    )
                  }
                  }
                  onChange={
                    (event, values, reason) => {

                      onChange(values);
                    }
                  }
                  renderInput={(params) => {

                    return (
                      <TextField
                        {...params}
                        label={"Администратор"}
                        margin="normal"
                        variant="outlined"
                        focused={true}
                        size={"small"}
                        sx={{margin: "0"}}
                      />
                    );
                  }}

                />
              )
            }}
          />
        </Grid>}


        {/*{storeNewPatientCardModal.admins && <Grid item xs={6}>*/}
        {/*  <Controller*/}
        {/*    control={control}*/}
        {/*    name={"ownerAdmin"}*/}

        {/*    defaultValue={""}*/}

        {/*    render={({field: {onChange, value}}) => {*/}

        {/*      return (*/}
        {/*        <Autocomplete*/}
        {/*          freeSolo*/}
        {/*          options={storeNewPatientCardModal.admins.sort((a, b) => -b.lastName.localeCompare(a.lastName))}*/}
        {/*          value={!!authStore.user ? authStore.user : ""}*/}
        {/*          getOptionLabel={option => getOption(option)}*/}
        {/*          renderOption={(props, option) => {*/}

        {/*            return (*/}
        {/*              <Box*/}
        {/*                sx={{*/}
        {/*                  display: 'flex',*/}
        {/*                  justifyContent: 'space-between',*/}
        {/*                  width: '100%'*/}
        {/*                }} {...props}>*/}
        {/*                <Box>{option.lastName} {option.firstName} {option.patronymic ? option.patronymic : ""}</Box>*/}
        {/*              </Box>*/}
        {/*            )*/}
        {/*          }*/}
        {/*          }*/}
        {/*          onChange={*/}
        {/*            (event, values, reason) => {*/}

        {/*              onChange(values);*/}
        {/*            }*/}
        {/*          }*/}
        {/*          renderInput={(params) => {*/}

        {/*            return (*/}
        {/*              <TextField*/}
        {/*                {...params}*/}
        {/*                label={"Ответственный администратор"}*/}
        {/*                margin="normal"*/}
        {/*                variant="outlined"*/}
        {/*                focused={true}*/}
        {/*                size={"small"}*/}
        {/*                sx={{margin: "0"}}*/}
        {/*                disabled={!isManagementGroup}*/}
        {/*              />*/}
        {/*            );*/}
        {/*          }}*/}

        {/*        />*/}
        {/*      )*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Grid>}*/}

        <Grid item xs={6}>
          <MobileDatePicker
            label="Дата создания"
            inputFormat="DD/MM/yyyy"
            value={valueDateAdd}
            onChange={(newValue) => {
              setValueDateAdd(newValue);
            }}
            renderInput={(params) => {

              return (
                <TextField
                  {...params}
                  size="small"
                  focused
                  {...register('dateAdd')}
                  name={"dateAdd"}
                  style={{width: "100%"}}
                />
              )
            }
            }
          />
        </Grid>
      </StyledContainer>

      <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>

        {userIsPatient && <Grid item xs={6}>
          <Controller
            name="photo"
            control={control}
            type="text"
            defaultValue={"EMPTY"}

            render={({field}) => {
              return (
                <StyledSelect
                  field={field}
                  options={booleanAnswerOptions}
                  selectLabelId="photo-select-label"
                  selectLabel="Размещение фото"
                  defaultValueSelect="Размещение фото"
                  disabledSelect={!userIsPatient}
                />
              )
            }}
          />
        </Grid>}

        {userIsPatient && <Grid item xs={6}>
          <Controller
            name="sendSms"
            control={control}
            type="text"
            defaultValue={"EMPTY"}

            render={({field}) => {
              return (
                <StyledSelect
                  field={field}
                  options={booleanAnswerOptions}
                  selectLabelId="sendSms-select-label"
                  selectLabel="Отправка в мессенджеры"
                  disabledSelect={!userIsPatient}
                />
              )
            }}
          />
        </Grid>}

        {userIsPatient && <Grid item xs={6}>
          <Controller
            name="sendEmail"
            control={control}
            type="text"
            defaultValue={"EMPTY"}

            render={({field}) => {
              return (
                <StyledSelect
                  field={field}
                  options={booleanAnswerOptions}
                  selectLabelId="sendEmail-select-label"
                  selectLabel="Отправка почты"
                  defaultValueSelect="Отправка почты"
                  disabledSelect={!userIsPatient}
                />
              )
            }}
          />
        </Grid>}

        {userIsPatient && <Grid item xs={6}>
          <TextField
            {...register('supplementaryAgreement')}
            id={"supplementaryAgreement"}
            type={"text"}
            name={"supplementaryAgreement"}
            defaultValue={""}
            label={"№ Договора согласия"}
            size={"small"}
            focused
            style={{width: "100%"}}
            disabled={!userIsPatient}
          />
        </Grid>}



      </StyledContainer>
    </>
  )
});

export default FirstFormSection;