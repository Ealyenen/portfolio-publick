import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material"
import AppointmentStore from '../store/appointment.store';
import InfoBlock from './appointmentBodyComponents/InfoBlock';
import CommonDataTitleAndStr from './appointmentBodyComponents/CommonDataTitleStr';
import { SurnameAndInitialsString } from '../../../../../../../../_common/helpers/nameGenerationString';
import AccordionCastom from '../../../../../../../../_components/UI/accordions/AccordionCastom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ImgBlock from './appointmentBodyComponents/ImageBlock';
import ChequesBlock from './appointmentBodyComponents/ChequesBlock';

const AppointmentMobileBody = observer(() => {
    const store = useInstance(AppointmentStore)

    return (
        <Box>
            <CommonDataTitleAndStr
                p={1}
                title={"Специалист"}
                str={store.getAppointment()?.doctor ?
                    SurnameAndInitialsString(
                        store.getAppointment()?.doctor.lastName,
                        store.getAppointment()?.doctor.firstName,
                        store.getAppointment()?.doctor.patronymic
                    )
                    :
                    "отсутствует"
                }
            />
            <AccordionCastom
                panelName={`appointment-info-${store.getAppointment?.appointmentId}`}
                title={"Информация"}
                expandIcon={<KeyboardArrowRightIcon />}
                detailsSX={{ backgroundColor: 'primary.light3' }}
                callsPanelColor={'primary.light3'}
            >
                <Box sx={{ maxHeight: 400, overflowY: "scroll" }}>
                    <InfoBlock />
                </Box>
            </AccordionCastom>
            <AccordionCastom
                panelName={`appointment-info-${store.getAppointment?.appointmentId}`}
                title={"Чеки"}
                expandIcon={<KeyboardArrowRightIcon />}
                detailsSX={{ backgroundColor: 'primary.light3', p: {xs: 1, sm: 2}, pt: 0 }}
                callsPanelColor={'primary.light3'}
            >
                <Box sx={{ maxHeight: 400, overflowY: "scroll" }}>
                    <ChequesBlock/>
                </Box>
            </AccordionCastom>
            <AccordionCastom
                panelName={`appointment-info-${store.getAppointment?.appointmentId}`}
                title={"Фото"}
                expandIcon={<KeyboardArrowRightIcon />}
                detailsSX={{ backgroundColor: 'primary.light3' }}
                callsPanelColor={'primary.light3'}
            >
                <Box sx={{ maxHeight: 400, overflowY: "scroll" }}>
                    <ImgBlock />
                </Box>
            </AccordionCastom>
        </Box>
    );
});

export default AppointmentMobileBody;