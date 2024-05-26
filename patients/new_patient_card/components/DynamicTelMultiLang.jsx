import React from 'react';
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import { Add } from "@mui/icons-material"
import { Controller } from "react-hook-form"
import StyledSelect from "../../../admin/components/StyledSelect"
import { observer } from "mobx-react-lite"
import { phoneMask, phoneMaskMasked } from "../../../../_common/helpValues/inputParametrs"
import TextMaskCustom from "../../../../_components/TextMaskPhone/TextMaskPhone"
import { toJS } from "mobx"
import { useInstance } from "react-ioc"
import StoreEditPatientCardModal from "../../edit_patient_card/stores/store"



function chooseMaskRusNumber(isManagementGroup, phoneId, number) {

  const one = !isManagementGroup && phoneId && number !== null

  const two = !isManagementGroup && phoneId

  const three = !!isManagementGroup && phoneId && number

  const four = !!isManagementGroup && phoneId


  if (one) {

    return phoneMaskMasked
  } else if (two) {

    return phoneMask
  } else if (three) {

    return phoneMask
  } else if (four) {

    return phoneMask
  }

  return phoneMask
}


const DynamicTelMultiLang = observer((props) => {

  // const store = useInstance(StoreEditPatientCardModal)


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
    disabled,
    setPhoneDeleted,
    register,
    handleSwitchChange, errors, ruNumber, setRuNumber, handleSwitchChangeDefNumber, userIsPatient, isManagementGroup
  } = props


  return (
    <Grid container spacing={2} sx={{pl: 2, mt: 1}}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
        >
          {title}
        </Typography>
      </Grid>


      {fields && fields.map((item, index) => {

        return (
          <Grid container spacing={2} sx={{pl: 2, mt: 1}} key={item.id}>

            {!!textFieldLabelFirst && item.ruNumber !== false && item.number !== null &&

              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputOne}`}
                  control={control}
                  defaultValue={`${family}[${index}].${propInputOne}`}
                  rules={{required: true}}

                  render={({field: {onChange, value}}) => {

                    return (

                      <TextField
                        type={"tel"}
                        value={value}
                        onChange={onChange}
                        label={"Российский номер*"}
                        size="small"
                        focused
                        style={{width: "100%"}}
                        error={errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type}
                        color={errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type && "error"}

                        InputProps={{
                          inputComponent: TextMaskCustom,
                          inputProps: {
                            mask: chooseMaskRusNumber(isManagementGroup, item.phoneId, item.number),
                            guide: true,
                            placeholder: "+7(___) ___-__-__"
                          },
                        }}
                      />

                    )
                  }}
                />

                {errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type === "required" && (
                  <span style={{color: "red", fontSize: "12px"}} role="alert">Обязательное поле</span>)}
              </Grid>
            }


            {!!textFieldLabelFirst && item.ruNumber === false && item.number !== null &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputOne}`}
                  control={control}
                  defaultValue={`${family}[${index}].${propInputOne}`}
                  rules={{required: true}}

                  render={({field: {onChange, value}}) => {

                    return (
                      <>
                        <TextField
                          type={"tel"}
                          value={value}
                          onChange={onChange}
                          label={"Иностранный номер*"}
                          size="small"
                          focused
                          style={{width: "100%"}}

                          error={errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type}
                          color={errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type && "error"}
                        />
                      </>
                    )
                  }}
                />

                {errors && errors?.tel && errors?.tel[index]?.number && errors?.tel[index]?.number?.type === "required" && (
                  <>
                    <span style={{color: "red", fontSize: "12px"}} role="alert">Обязательное поле</span>
                    {/*{alert("Ошибка в заполнении полей телефона. Заполните обязательные поля")}*/}
                  </>
                )}
              </Grid>
            }


            {options &&
              <Grid item xs={item.number !== null ? 6 : 12} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputTwo}`}
                  control={control}
                  type="text"
                  defaultValue={item?.type?.id || ""}
                  rules={{required: true}}

                  render={({field}) => {

                    return (
                      <StyledSelect
                        field={field}
                        options={options}
                        selectLabelId={`${family}[${index}].name`}
                        selectLabel={selectLabel}
                        compositeValue={compositeValue}
                        selectValue={item?.type?.id || ""}

                        error={errors && errors?.tel && errors?.tel[index]?.typeId}
                        color={errors && errors?.tel && errors?.tel[index]?.typeId && "error"}
                      />
                    )
                  }}
                />
                {errors && errors?.tel && errors?.tel[index]?.typeId && errors?.tel[index]?.typeId?.type === "required" && (
                  <>
                    <span style={{color: "red", fontSize: "12px"}} role="alert">Обязательное поле</span>
                    {/*{alert("Ошибка в заполнении полей телефона. Заполните обязательные поля")}*/}
                  </>
                )
                }
              </Grid>
            }

            {userIsPatient && blockHasComments &&
              <Grid item xs={12} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputThree}`}
                  control={control}
                  defaultValue={`${family}[${index}].${propInputThree}` || ""}

                  render={({field: {onChange, value}}) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      label={textAreaLabel}
                      multiline
                      fullWidth
                      focused
                      sx={{"& .MuiOutlinedInput-root": {padding: "8px"}}}
                      // disabled={disabled}
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
                    onChange={(e) => handleSwitchChange(e, index)}
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
                    // defaultChecked={item.ruNumber}
                    checked={item.ruNumber}

                    onChange={(e) => {
                      setRuNumber(!ruNumber)

                      handleSwitchChangeDefNumber(e, index)
                    }
                    }
                  />
                }
                label={"ru"}
              />
            </Grid>

            {!!buttonDeleteText && fields.length > 1 && <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                removeItem(index);

                setPhoneDeleted((prevState) => {

                  return [...prevState, {
                    phoneId: item.phoneId,
                    typeId: item.typeId ? item.typeId : item?.type?.id ? item?.type?.id : "18",
                    number: !!item.number ? `7${item.number.replace(/[+() -]/g, '')}` : null,
                    comment: item.comment,
                    isDefault: false,
                    isSms: item.isSms,
                    ruNumber: item.ruNumber,
                    isDelete: true,
                  }]
                })

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

      {userIsPatient && !!buttonAddText && <Grid item xs={12}>
        <Button variant="outlined" size="small" sx={{mt: 1}}
                onClick={addNewItem}
          // disabled={disabled}
        >
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

export default DynamicTelMultiLang;
