import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { useInstance } from 'react-ioc';
import { observer } from "mobx-react-lite";
import BaseModal from '../../../../../_components/UI/modals/BaseModal';
import SheduleEditModalStore from './store/sheduleEdit.store';
import Comment from './components/Comment';
import moment from "moment"
import { SurnameAndInitialsString } from "../../../../../_common/helpers/nameGenerationString"
import { useMutation } from "@apollo/client";
import { UPDATE_SCHEDULE } from "../../../_mutations/patients.mutations"
import PatientEventsStore from '../../../store/patinetEvents.store';

const SheduleEditModal = observer(() => {
    const store = useInstance(SheduleEditModalStore)
    const patientEventsStore = useInstance(PatientEventsStore)

    const [editShedule] = useMutation(UPDATE_SCHEDULE)


    const handleClose = () => {
        store.reset()
        store.setOpenModal(false)
    }
    
    const handleSave = () => {
        if (store.getData()) {
            editShedule({
                variables: {
                    input: {
                        scheduleEntryId: store.getData()?.id,
                        dayTableId: store.getData()?.dayTable?.id,
                        statusId: store.getData()?.status?.id,
                        date: store.getData()?.date,
                        timeStart: store.getData()?.timeStart,
                        timeEnd: store.getData()?.timeEnd,
                        description: store.getComment()
                    }
                }
            }).catch(()=>{
                alert("Возникла ошибка при попытке сохранить комментарий")
            }).then((data)=>{
                if (data?.data?.updateSchedule?.schedule?.event){
                    patientEventsStore.updateSheduleEventByEvent(data?.data?.updateSchedule?.schedule?.event)
                }
                handleClose()
            })
        }
    }

    const row = (title, text) => {
        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle1" sx={{ display: "inline", fontSize: 18 }}>
                    {title}:{" "}
                </Typography>
                <Typography sx={{ display: "inline" }}>
                    {text}
                </Typography>
            </Box>
        )
    }

    return (
        <BaseModal
            open={store.getOpenModal()}
            title={"Запись"}
            onClose={handleClose}
            saveClick={handleSave}
        >
            {store.getData() ?
                <Box>
                    {row("Дата", store.getData()?.date ? moment(store.getData()?.date).format("DD.MM.YYYY (dddd)") : "")}
                    {row("Время", store.getData()?.timeStart?.slice(0, 5) + " - " + store.getData()?.timeEnd?.slice(0, 5))}
                    {row("Добавлена", store.getData()?.created ? moment(store.getData()?.created).format("DD.MM.YYYY HH:mm") : 'отсутствует')}
                    {row("Специалист", store.getData()?.specialist ? SurnameAndInitialsString(store.getData()?.specialist?.lastName, store.getData()?.specialist?.firstName, store.getData()?.specialist?.patronymic) : "отсутствует")}
                    {row("Центр", store.getData()?.medicalCenter?.name || "отсутствует")}
                    {row("Статус", store.getData()?.status?.name || "отсутствует")}
                    {store.getData()?.isStudent && row("Ученическая", "да")}
                    {!store.getData()?.isActive && row("Запись удалена", "Да")}
                    <Comment />
                </Box>
                :
                <Typography sx={{ textAlign: "center" }} variant="h6">
                    Не удалось загрузить запись
                </Typography>
            }
        </BaseModal>
    )
});

export default SheduleEditModal;