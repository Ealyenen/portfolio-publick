import React from 'react';
import { observer } from "mobx-react-lite";
import { Box, Button } from "@mui/material";
import { useInstance } from "react-ioc";
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload";
import PatientStore from '../../../store/patient.store';
import CircularProgress from '@mui/material/CircularProgress';

const InputHiden = styled('input')({
    display: 'none',
});

const QuestionaryBanner = observer(() => {
    const patientStore = useInstance(PatientStore)

    const handleGetFiles = (event) => {
        patientStore.uploadQuestionary(event.target.files)
    }

    return (
        <Box sx={{ mt: 3 }}>
            {patientStore.getIsLoadingQuestionary() ?
                <Button variant="contained" component="span" fullWidth color={'error'} sx={{ textTransform: "uppercase" }}>
                    <CircularProgress size={30} sx={{color: "primary.white"}}/>
                </Button>
                :
                <label htmlFor="banner-load-questionary">
                    <InputHiden accept="image/*,.png,.jpg,.gif,.web" id="banner-load-questionary" multiple type="file" onChange={handleGetFiles} />
                    <Button variant="contained" component="span" fullWidth color={'error'} sx={{ textTransform: "uppercase" }}>
                        Загрузить опросник <UploadIcon />
                    </Button>
                </label>
            }

        </Box>
    );
});

export default QuestionaryBanner;