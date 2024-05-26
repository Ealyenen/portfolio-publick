import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { useInstance } from 'react-ioc';
import BaseModal from '../../../_components/UI/modals/BaseModal';
import { useMutation } from "@apollo/client";
import { observer } from 'mobx-react-lite';
import CreteModalStore from './store/createModal.store';
import DebtPrepaidStore from '../store/debtPrepaid.store';
import PatientSearch from './components/PatientSearch';
import Amount from './components/Amount';
import TypeChoose from './components/TypeChoose';
import { CREATE_DUTY } from '../mutation/debtPrepaid.mutations';
import Comment from './components/Comment';

const CreateModal = observer(() => {
    const store = useInstance(CreteModalStore)
    const debtPrepaidStore = useInstance(DebtPrepaidStore)

    const [createDuty] = useMutation(CREATE_DUTY)

    const handleClose = () => {
        store.resetStore()
        store.setOpenModal(false)
    }

    const handleSave = () => {
        store.checkData().then((isReady)=>{
            if (isReady){
                createDuty({
                    variables:{
                        amount: store.getAmount(),
                        operationType: store.getType(),
                        patientId: store.getPatient()?.id,
                        comment:  store.getComment()?.length>0 ? store.getComment() : undefined,
                    }
                }).catch((err)=>{
                    if (err){
                        console.log("duty create err", err)
                    }
                }).then((data)=>{
                    if (data?.data?.addDuty?.success){
                        debtPrepaidStore.requestAllDebt()
                        handleClose()
                    }else{
                        alert(data?.data?.addDuty?.msg)
                    }
                })
            }
        })
    }

    return (
        <BaseModal
            open={store.getOpenModal()}
            title={"Создание долга/аванса"}
            onClose={handleClose}
            saveClick={handleSave}
            saveTitle='Создать'
        >
            <Box sx={{ width: '100%', p: 2 }}>
                <Typography variant="subtitle1">
                    Пациент
                </Typography>
                <PatientSearch />
                <Typography variant="subtitle1" sx={{mt:4}}>
                    Тип и сумма
                </Typography>
                <Box sx={{display: "flex", gap: 2, mt: 2}}>
                    <TypeChoose/>
                    <Amount />
                </Box>
                <Typography variant="subtitle1" sx={{mt: 4}}>
                    Комментарий
                </Typography>
                <Comment/>
            </Box>
        </BaseModal>
    )
});

export default CreateModal;