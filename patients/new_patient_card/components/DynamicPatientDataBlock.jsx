import React from 'react';
import {Grid, TextField} from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import {Add} from "@mui/icons-material"
import {Controller} from "react-hook-form"
import StyledSelect from "../../../admin/components/StyledSelect"
import {observer} from "mobx-react-lite"

const DynamicPatientDataBlock = observer((props) => {

  const {
    fields,
    addNewItem,
    textAreaLabel,
    textAreaDefaultValue,
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
    defaultValueDynamicSelect,
    disabledSelect,
    disabled,
    userIsPatient
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
      {fields.map((item, index) => {

        return (
          <Grid container spacing={2} sx={{pl: 2, mt: 1}} key={item.id}>
            {!!textFieldLabelFirst  &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputOne}`}
                  control={control}
                  // defaultValue={`${family}[${index}].${propInputOne}`|| textFieldLabelFirst}
                  defaultValue={""}

                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      label={textFieldLabelFirst}
                      size="small"
                      focused
                      style={{width: "100%"}}
                    />
                  )}
                />
              </Grid>
            }
            {userIsPatient && options?.length>0 &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputTwo}`}
                  control={control}
                  type="text"
                  defaultValue={`${family}[${index}].${defaultValueDynamicSelect}` || "1"}
                  // defaultValue={"1"}
                  render={({field}) => {

                    return (
                      <StyledSelect
                        field={field}
                        options={options}
                        selectLabelId={`${family}[${index}].name`}
                        selectLabel={selectLabel}
                        compositeValue={compositeValue}
                        selectValue={`${family}[${index}].${defaultValueDynamicSelect}` || "1"}
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
                  defaultValue={textAreaDefaultValue}

                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      label={textAreaLabel}
                      multiline
                      fullWidth
                      focused
                      sx={{"& .MuiOutlinedInput-root": { padding: "8px" }}}
                      // disabled={disabled}
                      // rows={4}
                    />
                  )}
                />
              </Grid>
            }

            {userIsPatient && !!buttonDeleteText && <Grid item xs={12}>
              <Button variant="outlined" size="small" sx={{width: "100%"}}
                      onClick={() => {
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
        <Button variant="outlined" size="small"
                sx={{mt: 1}}
                onClick={addNewItem}
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

export default DynamicPatientDataBlock;