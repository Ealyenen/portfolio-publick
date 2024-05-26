import React from 'react';
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Controller } from "react-hook-form"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import { Add } from "@mui/icons-material"
import Box from "@mui/material/Box"

const AddIndividualDisease = (props) => {

  const {fieldName, fields, heading, control, disabled,
    isIndividualDiseaseNeedToRepresentation, individualDiseaseName, individualDiseaseComment, addNewItem, removeItem
  } = props


  return (
    <Grid container spacing={2} sx={{pl: {xs:1,sm:2}, mt: 1}}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
        >
          {heading}
        </Typography>
      </Grid>

      {fields.map((item, index) => {

        return (
          <Grid container spacing={2} sx={{pl: {xs:1,sm:2}, mt: 1}} key={item.id}>
              <Grid item xs={12} md={5}>
                <Box sx={{display: "flex"}}>
                  <FormControlLabel
                    control={
                      <Controller
                        name={`${fieldName}[${index}].${isIndividualDiseaseNeedToRepresentation}`}
                        control={control}
                        render={({ field: props }) => (
                          <Switch
                            {...props}
                          />
                        )}
                      />
                    }
                  />
                  <Controller
                    name={`${fieldName}[${index}].${individualDiseaseName}`}
                    control={control}
                    // defaultValue={item.disName || ""}
                    defaultValue={""}

                    render={({field: {onChange, value}}) => (
                      <TextField
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        label={"Название"}
                        size="small"
                        focused
                        style={{width: "100%"}}
                        disabled={disabled}
                      />
                    )}
                  />
                </Box>
              </Grid>


            <Grid item xs={12} md={5}>
              <Controller
                name={`${fieldName}[${index}].${individualDiseaseComment}`}
                control={control}
                defaultValue={""}
                // defaultValue={secondTextFieldDefaultValue}

                render={({field: {onChange, value}}) => (
                  <TextField
                    onChange={onChange}
                    label={"Комментарий"}
                    style={{width: "100%"}}
                    size="small"
                    focused
                    disabled={disabled}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                removeItem(index);
              }} disabled={disabled}>
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
        <Button variant="outlined" size="small" sx={{mt: 1}} onClick={addNewItem} disabled={disabled}>
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
};

export default AddIndividualDisease;