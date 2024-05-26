import React from 'react';
import { Box, FormControlLabel, Grid, Input, Switch } from "@mui/material"
import { Controller } from 'react-hook-form';
import { observer } from "mobx-react-lite"


const AllDisCreate = observer((props) => {

  const {fields, control, register} = props


  return (
    <Grid container spacing={2} sx={{display: "flex", flexDirection: "column", pl: {xs: 2, sm: 3}}}>

      {
        fields.map((el, index) => {

          const {comment, id, name} = el

          return (
            <Grid key={id} container spacing={2}>

              {name !== "Подошвенный фиброматоз" &&
                <Grid item xs={12} md={5}>

                  <FormControlLabel
                    control={
                      <Switch
                        {...register(`diseasesList.${index}.toRepresentation`)}
                      />
                    }
                    label={name}
                  />
                  <input {...register(`diseasesList.${index}.diseaseId`)} value={id}
                         style={{display: "none"}} />
                </Grid>}

              <Grid item xs={12} md={7}>
                <Box style={{display: "flex", flexDirection: "column"}}>
                  {name !== "Подошвенный фиброматоз" && (
                    <Controller
                      name={`diseasesList.${index}.comment`}
                      control={control}
                      render={({field: {onChange, value}}) => (
                        <Input
                          onChange={onChange}
                          label={"comment"}
                          size="small"
                          defaultValue={comment}
                          style={{width: "100%"}}
                        />
                      )}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          )
        })
      }
    </Grid>
  );
});

export default AllDisCreate;