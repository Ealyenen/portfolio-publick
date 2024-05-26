import React from 'react';
import {Grid, TextField} from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import {Add} from "@mui/icons-material"
import {Controller} from "react-hook-form"
import StyledSelect from "../../../admin/components/StyledSelect"
import {observer} from "mobx-react-lite"
import { useInstance } from "react-ioc"
import StoreEditPatientCardModal from "../../edit_patient_card/stores/store"
import { toJS } from "mobx"


const DynamicSocial = observer((props) => {

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
    setSocialDeleted,
    userIsPatient
  } = props

  const store = useInstance(StoreEditPatientCardModal)

  return (
    <Grid container spacing={2} sx={{pl: 2, mt: 1}}>
      <Grid item xs={4}>
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
                  defaultValue={item?.nickname || ""}

                  render={({ field: { onChange, value } }) => (
                    <TextField
                      type={"text"}
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

            {options  &&
              <Grid item xs={6} md={4}>
                <Controller
                  name={`${family}[${index}].${propInputTwo}`}

                  control={control}
                  type="text"
                  // defaultValue={`${family}[${index}].${propInputTwo}` || ""}
                  defaultValue={item?.networkType || ""}
                  render={({field}) => {

                    return (
                      <StyledSelect
                        field={field}
                        options={options}
                        selectLabelId={`${family}[${index}].name`}
                        selectLabel={selectLabel}
                        compositeValue={compositeValue}
                        // defaultValue={`${family}[${index}].${propInputTwo}` || ""}
                        defaultValue={item?.networkType || ""}
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
                      value={value}
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
                <Button variant="outlined" size="small" sx={{width: "100%"}} onClick={() => {
                  setSocialDeleted((prevState) => {
                    if (prevState) {

                      return [...prevState, {
                        networkType: item?.networkType?.id,
                        comment: item.comment,
                        nickname: item.nickname,
                        isDelete: true,
                      }]
                    }
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
        <Button variant="outlined" size="small" sx={{mt: 1}}
                onClick={addNewItem}
                disabled={store.freeSocial === false}
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

export default DynamicSocial;