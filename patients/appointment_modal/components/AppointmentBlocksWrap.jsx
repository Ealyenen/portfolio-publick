import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Backdrop
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PropTypes from "prop-types";
import RichTextEditor from "../../../../_components/UI/rich-text/rich.text-editor";
import StoreAppointmentModal from "../stores/store";
import DataStoreAppointmentModal from "../stores/data.store";
import PhotoComponent from './Photo/PhotoComponent';
import { provider } from "react-ioc";
import StoreAppointmentAnalysis from '../stores/analysis.store';
import AnalysisBlock from './Analyzes/AnalysisBlock'
import CashBlock from './Cash/CashBlock';
import PhotoStore from '../stores/photo.store';
import { FullPageFallbackProgress } from '../../../../_components/UI/preloaders/FullPageFallbackProgress';
import EstimateBlock from './EstimateBlock/Estimate';
import { makeAutoObservable, toJS } from "mobx";

const AppointmentBlocksWrap = provider()(observer(() => {
    const store = useInstance(StoreAppointmentModal);
    const dataStore = useInstance(DataStoreAppointmentModal);
    const analysisStore = useInstance(StoreAppointmentAnalysis)
    const photoStore = useInstance(PhotoStore)

    useEffect(() => {
        if (dataStore.openAnalisisFromCard === true && dataStore.allAnalysisTypes.length > 0) {
            let type = dataStore.analisisTypeFromCard
            analysisStore.setActiveAnalysisId(type)
            analysisStore.getAnalisisData(dataStore.appointmentId)
            dataStore.setDownOpenAnalisisPageFromCard()
        }

    }, [dataStore, store, dataStore.allAnalysisTypes, dataStore.openAnalisisFromCard, dataStore.analisisTypeFromCard])

    const getTextEditorValue = (value) => {
        if (value !== "<p><br></p>") {
            return value
        } else return ""
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3, borderTop: 1, borderTopColor: 'divider' }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const dataTabItems = [
        {
          id: dataStore.appointmentBlocksIds.reason,
          label: 'Причина Обращения',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.appealReason}
                getValue={(value) => dataStore.setAppealReason(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.complaints,
          label: 'Жалобы',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.complaints}
                getValue={(value) => dataStore.setComplaints(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.anamnesis,
          label: 'Анамнез',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.anamnez}
                getValue={(value) => dataStore.setAnamnez(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.objectively,
          label: 'Объективно',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.objectively}
                getValue={(value) => dataStore.setObjectively(getTextEditorValue(value))}
              />
          ),
          divider: 1
        },
        {
          id: dataStore.appointmentBlocksIds.home,
          label: 'Дома',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.home}
                getValue={(value) => dataStore.setHome(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.reccomendations,
          label: 'Рекомендации',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.recommendations}
                getValue={(value) => dataStore.setRecommendations(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.consultation,
          label: 'Консультация',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.consultation}
                getValue={(value) => dataStore.setConsultation(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.comment,
          label: 'Примечание',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.notes}
                getValue={(value) => dataStore.setNotes(getTextEditorValue(value))}
              />
          ),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.nexAppointment,
          label: 'Следующий прием',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <RichTextEditor
                initialValue={dataStore.nexAppointment}
                getValue={(value) => dataStore.setNexAppointment(getTextEditorValue(value))}
              />
          ),
          divider: 1
        },
    
        {
          id: dataStore.appointmentBlocksIds.analisis[0],
          label: dataStore.allAnalysisTypes[0]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[1],
          label: dataStore.allAnalysisTypes[1]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[2],
          label: dataStore.allAnalysisTypes[2]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[3],
          label: dataStore.allAnalysisTypes[3]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[4],
          label: dataStore.allAnalysisTypes[4]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[5],
          label: dataStore.allAnalysisTypes[5]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[6],
          label: dataStore.allAnalysisTypes[6]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[7],
          label: dataStore.allAnalysisTypes[7]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[8],
          label: dataStore.allAnalysisTypes[8]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[9],
          label: dataStore.allAnalysisTypes[9]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[10],
          label: dataStore.allAnalysisTypes[10]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[11],
          label: dataStore.allAnalysisTypes[11]?.name,
          component: (<AnalysisBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.analisis[12],
          label: dataStore.allAnalysisTypes[12]?.name,
          component: (<AnalysisBlock />),
          divider: 1
        },
    
    
    
        {
          id: dataStore.appointmentBlocksIds.photo,
          label: 'Фото',
          component: (
            dataStore.isLoadingInfo ?
              <FullPageFallbackProgress />
              :
              <PhotoComponent />
          ),
          divider: 1
        },
        {
          id: dataStore.appointmentBlocksIds.estimate,
          label: 'Смета',
          component: (<EstimateBlock />),
          divider: 0
        },
        {
          id: dataStore.appointmentBlocksIds.cash,
          label: 'Касса',
          component: (<CashBlock />),
          divider: 1
        }
      ]

    return (
        <>
            {dataTabItems.map((item, index) =>
                <TabPanel key={index} value={store.tabValue} index={item.id}>
                    <Typography variant={'h5'} sx={{ mb: 2 }}>
                        {item.label}
                    </Typography>
                    {item.component}
                    {store.actionWait &&
                        <Backdrop
                            sx={{ color: "primary.white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                        >
                            <FullPageFallbackProgress />
                        </Backdrop>
                    }
                </TabPanel>
            )}
        </>
    )
}));

export default AppointmentBlocksWrap