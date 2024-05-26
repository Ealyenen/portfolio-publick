import { Box, Grid, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import StyledSelect from "../../../admin/components/StyledSelect"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import { Add } from "@mui/icons-material"
import React from 'react';
import { observer } from "mobx-react-lite"
import StoreEditPatientCardModal from "../../edit_patient_card/stores/store"
import { useInstance } from "react-ioc"
import { toJS } from "mobx"
import { fullNameString } from "../../../../_common/helpers/nameGenerationString"
import moment from "moment";


const PatientConnects = observer((props) => {

  const storeEditPatientCardModal = useInstance(StoreEditPatientCardModal)

  const {
    fields, allPatients, control, userIsPatient, storeConnections, connectRemove, connectAppend, handleSetPatient,
    handleSearchPatient, watch
  } = props


  return (
    <Grid container spacing={2}
          sx={{
            pr: {xs: 0, md: 2},
            mt: 2,
            borderTop: '1px solid',
            borderColor: 'primary.light2'
          }}>

      {fields && fields.map((item, index) => {


        return (
          <Grid container spacing={2} sx={{pl: 2, mt: 1}} key={item.id}
                style={{display: "flex", alignItems: "center"}}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
              >
                Связь с пациентом
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name={`connect[${index}].id`}

                defaultValue={item.parent}

                render={({field: {onChange, value}}) => {


                  return (
                    <Autocomplete
                      disabled={!userIsPatient}
                      // freeSolo

                      size="small"
                      disablePortal

                      options={allPatients ? allPatients : []}
                      value={item.parent}

                      loading={storeEditPatientCardModal.loadingPatients}

                      getOptionLabel={(option) => fullNameString(option.lastName, option.firstName, option.patronymic)}

                      renderOption={(props, option) => {


                        return (
                          <Box {...props} key={option.id}
                               sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>


                            <Box sx={{ width: "100%" }}>
                              {option.firstName && option.lastName && fullNameString(option?.lastName, option?.firstName, option?.patronymic)}
                            </Box>
                            <Box sx={{ width: 130, textAlign: "end", pr:"2px" }}>
                              {option?.birthday && moment(option?.birthday).format("DD.MM.YYYY")}
                            </Box>

                          </Box>
                        )

                      }}

                      onChange={
                        (event, values, reason) => {

                          return onChange(toJS(values))
                        }
                      }

                      autoSelect
                      getOptionKey={(option) => option.id}
                      loadingText={"Поиск..."}
                      noOptionsText={"Нет данных"}

                      getOptionSelected={(option, value) => {

                        return (
                          value === undefined || value === "" || option.id === value.id
                        )
                      }
                      }

                      renderInput={(params) => {

                        return (
                          <TextField
                            disabled={!userIsPatient}
                            {...params}
                            label={"Связь с пациентом"}
                            margin="normal"
                            variant="outlined"
                            focused={true}
                            size={"small"}
                            sx={{margin: "0"}}
                            onChange={(event) => handleSearchPatient(event.target.value)}
                          />
                        );
                      }}

                    />
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name={`connect[${index}].parentComment`}
                control={control}
                type="text"
                defaultValue={item.parentComment || ""}
                render={({field}) => {

                  return (
                    <StyledSelect
                      field={field}
                      options={storeConnections?.patientClosePeople}
                      selectLabelId={`connect[${index}].parentComment`}
                      selectLabel={"Тип связи"}
                      selectValue={field.value}
                      disabledSelect={!userIsPatient}
                    />
                  )
                }}
              />

            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                connectRemove(index);
              }} disabled={!userIsPatient}>
                <Typography sx={{mr: 1, display: {xs: "none", md: "block"}}}>
                  Удалить
                </Typography>
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        );
      })}

      <Grid item xs={12}>
        <Button variant="outlined" size="small" sx={{mt: 1}} onClick={() => {
          connectAppend({id: "", parentComment: "",});
        }} disabled={!userIsPatient}>
          <Typography
            sx={{mr: 1, display: {xs: "none", md: "block"}}}
          >
            Добавить
          </Typography>
          <Add />
        </Button>
      </Grid>
    </Grid>
  );
});

export default PatientConnects;

