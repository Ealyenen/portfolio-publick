import React from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import ButtonMain from "../../../../_components/UI/Buttons/ButtonMain"
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@mui/material/styles";
import PatientStore from '../../store/patient.store';
import QuestionaryModalStore from '../store/questionaryModal.store';

const InputHiden = styled('input')({
    display: 'none',
});

const UploadBtn = observer(() => {
    const patientStore = useInstance(PatientStore)
    const questionaryModalStore = useInstance(QuestionaryModalStore)

    const handleUploadQuestionary = (event) => {
        questionaryModalStore.uploadQuestionaries(event.target.files, patientStore.getPatientId(), patientStore.getLastName(), patientStore.getFirstName())
    }

    return (
        <>
            {questionaryModalStore.getIsUploadingFiles() ?
                <ButtonMain
                    disabled
                    icon={<CircularProgress size={20} sx={{ color: "action.disabled" }} />}
                    mobileOnlyIcon
                />
                :
                <label htmlFor="button-modal-questionary-upload">
                    <InputHiden
                        accept="image/*,.png,.jpg,.gif,.web"
                        id="button-modal-questionary-upload"
                        multiple
                        type="file"
                        onChange={handleUploadQuestionary}
                    />
                    <ButtonMain
                        icon={<UploadIcon />}
                        mobileOnlyIcon
                        onClick={() => document.getElementById('button-modal-questionary-upload').click()}
                    />
                </label>
            }
        </>

    );
});

export default UploadBtn;