import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material"
import AppointmentStore from '../../store/appointment.store';
import { fullNameString } from '../../../../../../../_common/helpers/nameGenerationString';
import CommonDataTitleAndStr from './CommonDataTitleStr';
import moment from "moment"
import TextBlock from './TextBlock';
import Analisis from './AppointmentAnalisis';

const InfoBlock = observer(() => {
    const store = useInstance(AppointmentStore)

    return (
        <Box>
            <CommonDataTitleAndStr
                title={"Специалист"}
                str={store.getAppointment()?.doctor ?
                    fullNameString(
                        store.getAppointment()?.doctor.lastName,
                        store.getAppointment()?.doctor.firstName,
                        store.getAppointment()?.doctor.patronymic
                    )
                    :
                    "отсутствует"
                }
            />
            {/* here should be field where writen person who created appointment */}
            {/* <CommonDataTitleAndStr
                title={"Добавил(а)"}
                str={store.getAppointment()?.manager ?
                    fullNameString(
                        store.getAppointment()?.manager.lastName,
                        store.getAppointment()?.manager.firstName,
                        store.getAppointment()?.manager.patronymic
                    )
                    :
                    "отсутствует"
                }
            /> */}
            <CommonDataTitleAndStr
                title={"Центр"}
                str={store.getAppointment()?.center ?
                    store.getAppointment()?.center?.name
                    :
                    "отсутствует"
                }
            />
            <CommonDataTitleAndStr
                title={"Дата"}
                str={
                    store.getAppointment()?.date ?
                        moment(store.getAppointment()?.date).format("DD.MM.YYYY")
                        :
                        "отсутствует"

                }
            />
            <CommonDataTitleAndStr
                title={"Завершен"}
                str={store.getAppointment()?.isDone ?
                    "да"
                    :
                    "нет"
                }
            />
            <CommonDataTitleAndStr
                title={"Время"}
                str={
                    (store.getAppointment()?.timeStart ? store.getAppointment()?.timeStart?.slice(0, 5) : "")
                    + " - " +
                    (store.getAppointment()?.timeEnd ? store.getAppointment()?.timeEnd?.slice(0, 5) : "")
                }
            />
            {store.getAppointment()?.reasonAppeal &&
                <TextBlock title={"Причина обращения"} text={store.getAppointment()?.reasonAppeal} />
            }
            {store.getAppointment()?.complaints &&
                <TextBlock title={"Жалобы"} text={store.getAppointment()?.complaints} />
            }
            {store.getAppointment()?.anamnesis &&
                <TextBlock title={"Анамнез"} text={store.getAppointment()?.anamnesis} />
            }
            {store.getAppointment()?.objectively &&
                <TextBlock title={"Объективно"} text={store.getAppointment()?.objectively} />
            }
            {store.getAppointment()?.work &&
                <TextBlock title={"Работа"} text={store.getAppointment()?.work} />
            }
            {store.getAppointment()?.home &&
                <TextBlock title={"Дома"} text={store.getAppointment()?.home} />
            }
            {store.getAppointment()?.recommendations &&
                <TextBlock title={"Рекомендации"} text={store.getAppointment()?.recommendations} />
            }
            {store.getAppointment()?.consultation &&
                <TextBlock title={"Консультация"} text={store.getAppointment()?.consultation} />
            }
            {store.getAppointment()?.comment &&
                <TextBlock title={"Примечание"} text={store.getAppointment()?.comment} />
            }
            {store.getAppointment()?.nextAppointment &&
                <TextBlock title={"Следующий прием"} text={store.getAppointment()?.nextAppointment} />
            }
            {
                store.getAppointment()?.analyzes?.map((analize) => {
                    return (
                        <Analisis
                            key={analize?.id}
                            title={analize?.analyzeType?.name || "Анализ без типа"}
                            text={analize?.text}
                            images={analize?.analyzeImages}
                            datesJson={analize?.additionInformation}
                            dateOfAnalize={analize?.eventDate}
                        />
                    )
                })
            }
        </Box>
    );
});

export default InfoBlock;