import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { useInstance } from 'react-ioc';
import BaseModal from '../../../_components/UI/modals/BaseModal';
import { useMutation } from "@apollo/client";
import { observer } from 'mobx-react-lite';
import DebtPrepaidStore from '../store/debtPrepaid.store';
import EditModalStore from './store/editModal.store';
import PayType from './components/PaymentType';
import { fullNameString, SurnameAndInitialsString } from '../../../_common/helpers/nameGenerationString';
import { Link as RouterLink } from "react-router-dom";
import { PATIENTS_ROUTE } from '../../../_common/router/routes';
import moment from "moment"
import NotRepaid from './components/NotRepaidDuty';
import Comment from './components/Comment'
import Divider from '@mui/material/Divider';
import { UPDATE_DUTY } from '../mutation/debtPrepaid.mutations';
import SaveDialog from './Confirmation';

const EditModal = observer(() => {
    const store = useInstance(EditModalStore)
    const debtPrepaidStore = useInstance(DebtPrepaidStore)

    const [updateDuty] = useMutation(UPDATE_DUTY)

    const handleClose = () => {
        store.reset()
        store.setOpenModal(false)
    }

    const handleSave = () => {
        if (store.getPayType() === "" && store.getNotRepaid() === false) {
            updateDuty({
                variables: {
                    comment: store.getComment(),
                    dutyId: store.getData()?.id,
                }
            }).catch((err) => {
                console.log("err in updateDuty", err)
            }).then((data) => {
                if (data?.data?.updateDuty?.success) {
                    //not handleUpdateFunction as there is field account what changes in all patient's operations...
                    debtPrepaidStore.requestAllDebt()
                    handleClose()
                } else {
                    alert(data?.data?.updateDuty?.msg || "Произошла ошибка при изменении данных")
                }
            })
        } else {
            store.setOpenConfirmation(true)
        }
    }

    const outputData = (title, text) => {
        return (
            <Box sx={{ mt: 1 }}>
                <Typography sx={{ display: "inline", fontSize: 16, mr: 1 }} variant="subtitle1">
                    {title}:
                </Typography>
                <Typography sx={{ display: "inline" }} component="span">
                    {text}
                </Typography>
            </Box>
        )
    }

    return (
        <>
            <BaseModal
                open={store.getOpenModal()}
                title={"Изменение " + store.getData()?.operationTypeShow + "а"}
                onClose={handleClose}
                saveClick={handleSave}
                saveTitle='Сохранить'
            >
                {outputData("Пациент",
                    <Typography sx={{ color: "primary.main" }} component={RouterLink} to={`${PATIENTS_ROUTE}/${store.getData()?.patient?.id}`}>
                        {fullNameString(store.getData()?.patient?.lastName, store.getData()?.patient?.firstName, store.getData()?.patient?.patronymic)}
                    </Typography>
                )}
                {outputData("Сумма", `${store.getData()?.amount}\u20BD`)}
                {outputData(
                    "Создание",
                    moment(store.getData()?.created).format("DD.MM.YYYY HH:mm")
                    + " " +
                    SurnameAndInitialsString(store.getData()?.userCreated?.lastName, store.getData()?.userCreated?.firstName, store.getData()?.userCreated?.patronymic)
                )}
                <Divider sx={{ mt: 2, borderColor: "primary.light4" }} />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Списание
                </Typography>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                    <PayType />
                    {store.getData()?.operationType === "DUTY" && <NotRepaid />}
                </Box>
                <Comment />
            </BaseModal>
            <SaveDialog />
        </>
    )
});

export default EditModal;