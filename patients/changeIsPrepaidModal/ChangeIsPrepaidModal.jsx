import React, { useEffect, useState } from 'react';
import { useInstance } from "react-ioc";
import BaseModal from '../../../_components/UI/modals/BaseModal';
import { observer } from "mobx-react-lite";
import PatientStore from '../store/patient.store';
import ChangeIsPrepaidModalStore from './store/changeIsPrepaidModal';
import { PATIENT_CARD_PREPAYED } from "../_queries/patients.queries"
import {  useQuery, useMutation } from "@apollo/client";
import { Checkbox,  } from "@mui/material"
import { UPDATE_PATIENT_PREPAYMENT } from "../_mutations/patients.mutations"


const ChangeIsPrepaidModal = (observer(() => {
    const changeIsPrepaidModalStore = useInstance(ChangeIsPrepaidModalStore)
    const patientStore = useInstance(PatientStore)

    const {data: loadPatientInfo} = useQuery(PATIENT_CARD_PREPAYED, {variables: {"id": patientStore?.getPatientId()}})

    const [isPrepaidService, setIsPrepaidService] = useState(false)


    useEffect(() => {
        if (loadPatientInfo) {
            const { patient } = loadPatientInfo;
            setIsPrepaidService(patient?.isPrepaidService || false);
        }
    }, [loadPatientInfo?.patient?.isPrepaidService]);


    const [updatePatient] = useMutation(UPDATE_PATIENT_PREPAYMENT);


    const handleCloseModal = () => {
        changeIsPrepaidModalStore.setOpenModal(false)
    }

    const handleSaveClick = () => {

        updatePatient({
            variables: {
                "input": {
                    "patientId": patientStore?.getPatientId(),
                    "isPrepaidService": isPrepaidService,
                }
            }
        }).then(()=> {

            patientStore.updatePatientData()
        })

        changeIsPrepaidModalStore.setOpenModal(false)
    }


    const handleChangeNotification = (event) => {

        setIsPrepaidService(event.target.checked);
    }


    return (
        <>
            <BaseModal
                title={"Изменить предоплату"}
                open={changeIsPrepaidModalStore.getOpenModal()}
                closeTitle="Отмена"
                onClose={() => handleCloseModal()}
                saveClick={() => handleSaveClick()}
                maxWidth={'xs'}
            >
                Обслуживать только по предоплате?

                <Checkbox
                  checked={isPrepaidService}
                  onChange={(e) => handleChangeNotification(e)}
                />

            </BaseModal>
        </>

    );
}));

export default ChangeIsPrepaidModal;