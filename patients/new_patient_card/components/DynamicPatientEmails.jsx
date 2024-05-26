import React from 'react';
import {Grid, TextField} from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import {Add} from "@mui/icons-material"
import {Controller} from "react-hook-form"
import StyledSelect from "../../../admin/components/StyledSelect"
import {observer} from "mobx-react-lite"

const DynamicPatientEmails = observer((props) => {

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
    disabledSelect,
    setEmailDeleted,
    userIsPatient

  } = props

  return (
    <Grid container spacing={2} sx={{pl: 2, mt: 1}}>

      {!!title && <Grid item xs={12}>
        <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        // ml={2}
        >
      {title}
        </Typography>
        </Grid>}

      {fields.map((item, index) => {

        return (
          <Grid container spacing={2} sx={{pl: 2, mt: 1}} key={item.id}>
            {!!textFieldLabelFirst  &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputOne}`}
                  control={control}
                  defaultValue={`${family}[${index}].${propInputOne}`|| ""}
                  // defaultValue={""}

                  render={({ field: { onChange, value } }) => (
                    <TextField
                      type={"text"}
                      value={value}
                      onChange={onChange}
                      label={textFieldLabelFirst}
                      size="small"
                      focused
                      style={{width: "100%"}}
                      placeholder={"adress@ru.com"}
                    />
                  )}
                />
              </Grid>
            }
            {userIsPatient && options  &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputTwo}`}
                  control={control}
                  type="text"
                  defaultValue={item?.type?.id || ""}
                  render={({field}) => {

                    return (
                      <StyledSelect
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
              </Grid>
            }
            {userIsPatient && blockHasComments  &&
              <Grid item xs={12} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputThree}`}
                  control={control}
                  defaultValue={item?.comment || ""}

                  render={({ field: { onChange, value } }) => (
                    <TextField
                      sx={{padding: "0", "& .MuiOutlinedInput-root": { padding: "8px" }}}
                      value={value}
                      onChange={onChange}
                      label={textAreaLabel}
                      multiline
                      fullWidth
                      focused
                      // disabled={disabled}
                    />
                  )}
                />
              </Grid>
            }

            {userIsPatient && !!buttonDeleteText && <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                setEmailDeleted((prevState) => {

                  return [...prevState, {
                    typeId: item?.type?.id,
                    emailAddress: item.emailAddress,
                    comment: item.comment,
                    isDelete: true,
                    isDefault: item.isDefault,
                  }]
                })
                removeItem(index);
              }}
                      // disabled={disabled}
              >
                <Typography sx={{mr: 1, display: {xs: "none", md: "block"}}}>
                  {buttonDeleteText}
                </Typography>
                <DeleteIcon/>
              </Button>
            </Grid>}
          </Grid>
        );
      })}

      {userIsPatient && !!buttonAddText && <Grid item xs={12}>
        <Button variant="outlined" size="small" sx={{mt: 1}} onClick={addNewItem}
                // disabled={disabled}
        >
          <Typography
            sx={{mr: 1, display: {xs: "none", md: "block"}}}
          >
            {buttonAddText}
          </Typography>
          <Add/>
        </Button>
      </Grid>}
    </Grid>
  );
});

export default DynamicPatientEmails;