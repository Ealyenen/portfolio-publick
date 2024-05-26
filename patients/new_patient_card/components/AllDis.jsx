import React from 'react';
import { FormControlLabel, Grid, Input, Switch } from "@mui/material"
import { Controller } from 'react-hook-form';
import { observer } from "mobx-react-lite"


const AllDis = observer((props) => {

  const {fields, control, register} = props

  return (
    <Grid container spacing={2} sx={{display: "flex", flexDirection: "column", pl: {xs:1,sm:3}}}>


      {fields.map((el, index) => {

        return (
          <Grid key={el.id} container spacing={2}>
            {el.name !== "Подошвенный фиброматоз" &&
              <Grid item xs={12} md={5}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register(`diseasesList.${index}.toRepresentation`)}
                      defaultChecked={el.toRepresentation}
                    />
                  }
                  label={el.name}
                />
                <input {...register(`diseasesList.${index}.diseaseId`)} value={el.diseaseId}
                       style={{display: "none"}} />
              </Grid>}

            <Grid item xs={12} md={7}>
              {
                el.name !== "Подошвенный фиброматоз" &&
                <Controller
                  name={`diseasesList.${index}.commentFromPatient`}
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      onChange={onChange}
                      label={"comment"}
                      size="small"
                      style={{width: "100%"}}
                      defaultValue={el.commentFromPatient}
                    />
                  )}
                />
              }
            </Grid>
          </Grid>
        )
      })
      }
    </Grid>
  );
});

export default AllDis;