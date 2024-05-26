import {
  Grid,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {observer} from "mobx-react-lite";
import React from 'react';
import {Controller} from 'react-hook-form';
import StyledSelect from "../../../admin/components/StyledSelect"


const StaticPatientDataBlock = observer((props) => {

  const {textFieldLabelFirst,
    textAreaLabel,
    textAreaDefaultValue,
    title,
    buttonDeleteText,
    buttonAddText,
    blockHasComments,
    options,
    textFieldLabelSecond,
    nameTextArea,
    control,
    selectName,
    selectLabel,
    selectLabelId,
    textFieldNameFirst,
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

      {!!textFieldLabelFirst && <Grid item xs={6} md={6}>
        <Controller
          name={textFieldNameFirst}
          control={control}
          defaultValue={textFieldLabelFirst || ""}

          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              label={textFieldLabelFirst}
              size="small"
              focused
              style={{width: "100%"}}
            />
          )}
        />
      </Grid>}

      {options &&
        <Grid item xs={6}>
          <Controller
            name={selectName}
            control={control}
            type="text"
            defaultValue={""}

            render={({field}) => {
              return (
                <StyledSelect
                  field={field}
                  options={options}
                  selectLabelId={selectLabelId}
                  selectLabel={selectLabel}
                />
              )
            }}
          />
        </Grid>
      }

      {!!textFieldLabelSecond && <Grid item xs={6} md={6}>
        <Controller
          name={textFieldLabelSecond}
          control={control}
          defaultValue={textFieldLabelSecond}

          render={({ field: { onChange, value } }) => (
            <TextField

              onChange={onChange}
              label={textFieldLabelSecond}
              style={{width: "100%"}}
              size="small"
              focused

            />
          )}
        />
      </Grid>}

      {blockHasComments &&
        <Grid item xs={12}>
          <Controller
            name={nameTextArea}
            control={control}
            defaultValue={textAreaDefaultValue ? textAreaDefaultValue :  ""}

            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                onChange={onChange}
                label={textAreaLabel}
                multiline
                fullWidth
                focused
                rows={4}
                placeholder={""}
              />
            )}
          />
        </Grid>}

      {!!buttonDeleteText && <Grid item xs={12}>
        <Button variant="outlined" size="small" sx={{width: "100%"}}>
          <Typography sx={{mr: 1, display: {xs: "none", md: "block"}}}>
            {buttonDeleteText}
          </Typography>
          <DeleteIcon/>
        </Button>
      </Grid>}

      {!!buttonAddText && <Grid item xs={12}>
        <Button variant="outlined" size="small" sx={{mt: 1}}>
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

export default StaticPatientDataBlock;