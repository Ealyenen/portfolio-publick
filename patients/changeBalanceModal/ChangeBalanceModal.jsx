import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import BaseModal from '../../../_components/UI/modals/BaseModal';
import { Box, Typography, TextField, FormControl } from "@mui/material";
import { observer } from "mobx-react-lite";
import ChangeBalanceModalStore from './store/changeBalanceModal.store';
import PatientStore from '../store/patient.store';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useMutation } from "@apollo/client";
import { UPDATE_BALANCE } from '../_mutations/patients.mutations';

const ChangeBalanceModal = (observer(() => {
    const changeBalanceModalStore = useInstance(ChangeBalanceModalStore)
    const patientStore = useInstance(PatientStore)

    const [changeBalance] = useMutation(UPDATE_BALANCE);

    const handleChange = (event, newAlignment) => {
        changeBalanceModalStore.setBalanceOperationType(newAlignment);
    }

    const handleChangeValueForBalance = (newValue) => {
        const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/
        if (newValue?.length <= 15 && regex.test(newValue)) {
            changeBalanceModalStore.setValueForBalanceChanging(newValue)
        }
    }

    const handleCloseModal = () => {
        changeBalanceModalStore.resetStore()
        changeBalanceModalStore.setOpenModal(false)
    }

    const calcOperation = () => {
        if (changeBalanceModalStore.getBalanceOperationType()==="hardWrite"){
            return "ASSIGN"
        }else if (changeBalanceModalStore.getBalanceOperationType()==="-"){
            return "MINUS"
        }else if (changeBalanceModalStore.getBalanceOperationType()==="+"){
            return "PLUS"
        }
    }

    const handleSaveClick = () => {
        if (changeBalanceModalStore.getBalanceOperationType() && changeBalanceModalStore.valueForBalanceChanging !== "") {
            changeBalance({
                variables: {
                    patientId: patientStore.getPatientId(),
                    newBalance: changeBalanceModalStore.valueForBalanceChanging ? changeBalanceModalStore.valueForBalanceChanging : "0.00",
                    calcOperation: calcOperation() || undefined
                }
            }).catch((error) => {
                console.log("error balance update", error)
                alert("Произошла ошибка при попытке изменить баланс")
            }).then((data) => {
                if (data?.data?.updatePatientBalance?.success) {
                    patientStore.setBalanceId(data?.data?.updatePatientBalance?.balance?.id)
                    patientStore.setBalanceValue(data?.data?.updatePatientBalance?.balance?.value)
                    handleCloseModal()
                } else {
                    alert(data?.data?.updatePatientBalance?.msg)
                }
            })
        } else {
            alert(
                "Задайте " +
                (!changeBalanceModalStore.getBalanceOperationType() ? "тип " : "")
                +
                (!changeBalanceModalStore.getBalanceOperationType() && changeBalanceModalStore.valueForBalanceChanging === "" ? "и " : "")
                +
                (changeBalanceModalStore.valueForBalanceChanging === "" ? "сумму " : "")
                +
                "операции"
                
            )
        }
    }
    //patientStore.getPatientId()

    return (
        <>
            <BaseModal
                title={"Изменить баланс"}
                open={changeBalanceModalStore.getOpenModal()}
                closeTitle="Отмена"
                onClose={() => handleCloseModal()}
                saveClick={() => handleSaveClick()}
                maxWidth={'xs'}
            >
                <Box>
                    <Typography variant="subtitle1">
                        Текущий баланс: {patientStore.getBalanceValue() ? patientStore.getBalanceValue() : "0.00"}
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    color="primary"
                    value={changeBalanceModalStore.getBalanceOperationType()}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{mt: 2}}
                >
                    {changeBalanceModalStore.getOperationTypes().map((type) => {
                        return (
                            <ToggleButton
                                key={type.type}
                                size="small"
                                value={type.type}
                            >
                                {type.name}
                            </ToggleButton>
                        )
                    })}
                </ToggleButtonGroup>
                <FormControl fullWidth focused type="number" sx={{mt: 3}}>
                    <TextField
                        value={changeBalanceModalStore.valueForBalanceChanging}
                        onChange={(e) => handleChangeValueForBalance(e.target.value)}
                        size="small"
                        label={"сумма"}
                        focused
                        type="number"
                        onKeyPress={(e) => {
                            if (!/[0-9.,]/.test(e.key) ||
                                (e.key === ',' && e.target.value.includes(','))
                                ||
                                (e.key === '.' && e.target.value.includes('.'))
                            ) {
                                e.preventDefault();
                            }
                        }}
                    />
                </FormControl>
            </BaseModal>
        </>

    );
}));

export default ChangeBalanceModal;