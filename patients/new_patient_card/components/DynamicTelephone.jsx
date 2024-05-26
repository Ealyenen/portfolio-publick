import React from 'react';
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import { Add } from "@mui/icons-material"
import { Controller } from "react-hook-form"
import StyledSelect from "../../../admin/components/StyledSelect"
import { observer } from "mobx-react-lite"

const DynamicTelephone = observer((props) => {

  const {
    fields,
    addNewItem,
    textAreaLabel,
    removeItem,
    textFieldLabelFirst,
    title,
    buttonAddText,
    buttonDeleteText,
    blockHasComments,
    propInputOne,
    propInputTwo,
    propInputThree,
    family,
    selectLabel,
    options,
    control,
    compositeValue,
    disabledSelect,
    disabled,
    setPhoneDeleted,
    register,
    handleSwitchChange, getValues, watch, errors
  } = props



  return (
    <Grid container spacing={2} sx={{pl: 2, mt: 1}}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          // ml={2}
        >
          {title}
        </Typography>
      </Grid>


      {fields && fields.map((item, index) => {

        // console.log("errors.tel[index]?.number", errors && errors?.tel && errors?.tel[index]?.number )


        return (
          <Grid container spacing={2} sx={{pl: 2, mt: 1}} key={item.id}>

            {!!textFieldLabelFirst && item.number!== null &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputOne}`}
                  control={control}
                  defaultValue={`${family}[${index}].${propInputOne}` }
                  rules={{ required: true }}


                  render={({field: {onChange, value}}) => {

                    return (<TextField
                      type={"tel"}
                      value={value }
                      onChange={onChange}
                      label={textFieldLabelFirst}
                      size="small"
                      focused
                      style={{width: "100%"}}
                      // required
                      // ref={form.register}
                    />)
                  }}
                />

                {errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type === "required" && (
                  <span style={{color: "red"}} role="alert">Обязательное поле</span>)}
              </Grid>
            }

            {options &&
              <Grid item xs={item.number!== null ? 6 : 12} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputTwo}`}
                  control={control}
                  type="text"
                  defaultValue={item?.type?.id || ""}
                  rules={{ required: true }}

                  render={({field}) => {

                    return (
                      <StyledSelect
                        // required
                        field={field}
                        options={options}
                        selectLabelId={`${family}[${index}].name`}
                        selectLabel={selectLabel}
                        compositeValue={compositeValue}
                        selectValue={item?.type?.id || ""}
                        // disabledSelect={disabledSelect}
                      />
                    )
                  }}
                />
                {errors && errors?.tel && errors?.tel[index]?.typeId && errors?.tel[index]?.typeId?.type === "required" && (
                  <span style={{color: "red"}} role="alert">Обязательное поле</span>)}
              </Grid>
            }

            {blockHasComments &&
              <Grid item xs={12} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputThree}`}
                  control={control}
                  defaultValue={item?.comment || ""}

                  render={({field: {onChange, value}}) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      label={textAreaLabel}
                      multiline
                      fullWidth
                      focused
                      sx={{"& .MuiOutlinedInput-root": {padding: "8px"}}}
                      disabled={disabled}
                    />
                  )}
                />
              </Grid>
            }

            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    {...register(`${family}[${index}].isDefault`)}
                    // defaultChecked={item.isDefault}
                    checked={item.isDefault}
                    onChange={(e)=> handleSwitchChange(e, index)}
                  />
                }
                label={"основной"}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    {...register(`${family}[${index}].isSms`)}
                    defaultChecked={item.isSms}
                    // onChange={()=>{
                    //
                    //   console.log(getValues("tel"))
                    //   console.log(getValues())
                    //
                    //   console.log("TELFIELDS", fields)
                    //
                    //   console.log(watch("tel"))
                    // }
                    // }
                  />
                }
                label={"sms"}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    {...register(`${family}[${index}].ruNumber`)}
                    defaultChecked={item.ruNumber}
                  />
                }
                label={"ru"}
              />
            </Grid>


            {!!buttonDeleteText && fields.length>1 && <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                setPhoneDeleted((prevState) => {

                  return [...prevState, {
                    phoneId: item.phoneId,
                    typeId: item.typeId ? item.typeId : item?.type?.id,
                    number: item.number,
                    comment: item.comment,
                    isDefault: false,
                    isSms: item.isSms,
                    ruNumber: item.ruNumber,
                    isDelete: true,
                  }]
                })
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

export default DynamicTelephone;
