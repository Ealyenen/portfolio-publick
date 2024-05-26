import React from 'react';
import { FormControlLabel, Grid, Input, Switch } from "@mui/material"
import { Controller } from 'react-hook-form';
import { observer } from "mobx-react-lite"


const IndividualDiseases = observer((props) => {

  const {fields, control, register} = props


  return (
    <Grid container spacing={2} sx={{display: "flex", flexDirection: "column", pl: {xs:1,sm:3}, mt: 0.5}}>


      {fields.length > 0 && fields.map((el, index) => {

          return (
            <Grid key={el.id} container spacing={2}>
              {el.name !== "Подошвенный фиброматоз" &&
                <Grid item xs={12} md={5}>
                  <FormControlLabel
                    control={
                      <Switch
                        {...register(`individualDiseasesList.${index}.toRepresentation`)}
                        defaultChecked={el.toRepresentation}
                      />
                    }
                    label={el.name}
                  />
                  <input {...register(`individualDiseasesList.${index}.id`)} value={el.diseaseId}
                         style={{display: "none"}} />
                </Grid>}

              <Grid item xs={12} md={7}>
                {
                  el.name !== "Подошвенный фиброматоз" &&
                  <Controller
                    name={`individualDiseasesList.${index}.comment`}
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Input
                        onChange={onChange}
                        label={"comment"}
                        size="small"
                        style={{width: "100%"}}
                        defaultValue={el.comment}
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

export default IndividualDiseases;