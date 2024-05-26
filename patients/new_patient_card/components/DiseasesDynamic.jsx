import React from 'react';
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import { Add } from "@mui/icons-material"
import { Controller } from "react-hook-form"
import { observer } from "mobx-react-lite"
import Box from "@mui/material/Box"

const DiseasesDynamic = observer((props) => {

  const {
    fields,
    addNewItem,
    removeItem,
    textFieldLabelFirst,
    title,
    buttonAddText,
    buttonDeleteText,
    textFieldLabelSecond,
    propInputOne,
    family,
    control,
    secondTextFieldName,
    secondTextFieldDefaultValue,
    disabled,
    propSwitch
  } = props


  return (
    <Grid container spacing={2} sx={{pl: {xs:1,sm:2}, mt: 1}}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
        >
          {title}
        </Typography>
      </Grid>
      {fields.map((item, index) => {

        return (
          <Grid container spacing={2} sx={{pl: 2, mt: 1}} key={item.id}>

            {!!textFieldLabelFirst &&
              <Grid item xs={12} md={5}>
                <Box sx={{display: "flex"}}>
                  <FormControlLabel
                    control={
                      <Controller
                        name={`${family}[${index}].${propSwitch}`}
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
                    name={`${family}[${index}].${propInputOne}`}
                    control={control}
                    // defaultValue={item.disName || ""}

                    render={({field: {onChange, value}}) => (
                      <TextField
                        type={"tel"}
                        value={value}
                        onChange={onChange}
                        label={textFieldLabelFirst}
                        size="small"
                        focused
                        fullWidth
                        style={{width: "100%"}}
                        disabled={disabled}
                      />
                    )}
                  />
                </Box>
              </Grid>
            }

            <Grid item xs={12} md={5}>
              <Controller
                name={`${family}[${index}].${secondTextFieldName}`}
                control={control}
                defaultValue={secondTextFieldDefaultValue}

                render={({field: {onChange, value}}) => (
                  <TextField
                    onChange={onChange}
                    label={textFieldLabelSecond}
                    style={{width: "100%"}}
                    size="small"
                    focused
                    disabled={disabled}
                  />
                )}
              />
            </Grid>

            {!!buttonDeleteText && <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                removeItem(index);
              }} disabled={disabled}>
                <Typography sx={{mr: 1, display: {xs: "none", md: "block"}}}>
                  {buttonDeleteText}
                </Typography>
                <DeleteIcon />
              </Button>
            </Grid>}
          </Grid>
        );
      })}

      {!!buttonAddText && <Grid item xs={12}>
        <Button variant="outlined" size="small" sx={{mt: 1}} onClick={addNewItem} disabled={disabled}>
          <Typography
            sx={{mr: 1, display: {xs: "none", md: "block"}}}
          >
            {buttonAddText}
          </Typography>
          <Add />
        </Button>
      </Grid>}
    </Grid>
  );
});

export default DiseasesDynamic;