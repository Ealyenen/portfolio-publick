import React from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import ButtonMain from '../../../../../../../_components/UI/Buttons/ButtonMain';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@mui/material/styles";

const InputHiden = styled('input')({
    display: 'none',
});

const LoadQuestionaryBtn = observer(() => {
    const patientStore = useInstance(PatientStore)

    const handleUploadQuestionary = (event) => {
        patientStore.uploadQuestionary(event.target.files)
    }

    return (
        <>
            {patientStore.getIsLoadingQuestionary() ?
                <ButtonMain
                    disabled
                    icon={<CircularProgress size={20} sx={{color: "action.disabled"}}/>}
                    mobileOnlyIcon
                />
                :
                <label htmlFor="button-load-questionary">
                    <InputHiden
                        accept="image/*,.png,.jpg,.gif,.web"
                        id="button-load-questionary"
                        multiple
                        type="file"
                        onChange={handleUploadQuestionary}
                    />
                    <ButtonMain
                        title={"Загрузить"}
                        icon={<UploadIcon />}
                        mobileOnlyIcon
                        onClick={() => document.getElementById('button-load-questionary').click()}
                    />
                </label>
            }

        </>

    );
});

export default LoadQuestionaryBtn;