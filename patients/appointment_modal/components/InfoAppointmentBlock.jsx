import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel, MenuItem, Select,
  Typography,
  List,
  ListItemText,
  Collapse,
  ListItemButton
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
import AppointmentBlocksWrap from './AppointmentBlocksWrap';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const InfoAppointmentBlock = provider()(observer(() => {
  const store = useInstance(StoreAppointmentModal);
  const dataStore = useInstance(DataStoreAppointmentModal);
  const analysisStore = useInstance(StoreAppointmentAnalysis)
  const photoStore = useInstance(PhotoStore)

  const [openAnalisis, setOpenAnalisis] = useState(false);

  const handleClickAnalisis = () => {
    setOpenAnalisis(!openAnalisis)
  }

  const [openConsultations, setOpenConsultations] = useState(false);

  const handleClickConsultations = () => {
    setOpenConsultations(!openConsultations)
  }

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

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

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

  const changeTabOnAnalisis = (nextTabIndex) => {
    for (let i = dataStore.allAnalysisTypes.length - 1; i >= 0; i--) {
      if (dataStore.allAnalysisTypes[i].name === dataTabItems[nextTabIndex].label) {
        analysisStore.setActiveAnalysisId(dataStore.allAnalysisTypes[i].id)
        analysisStore.getAnalisisData(dataStore.appointmentId)
        break
      }
    }
  }

  const saveTab = async (previous) => {
    console.log("save appointment tab")
    return await new Promise((resolve, reject) => {
      if (dataStore.appointmentBlocksIds.analisis.includes(previous)) {
        store.setActionWait(true)
        analysisStore.saveAnalisis(dataStore.appointmentId).then((data) => {
          resolve(data)
          store.setActionWait(false)
        })
      } else if (previous === dataStore.appointmentBlocksIds.photo) {
        if (photoStore.permissionToClosePhotosBlock) {
          store.setActionWait(true)
          photoStore.saveAppointmentFromPhotos().then(() => {
            resolve(true)
            store.setActionWait(false)
          })
        } else {
          alert("Невозможно закрыть фото. Закончите редактирование")
          resolve(false)
        }
      } else if (previous === dataStore.appointmentBlocksIds.estimate || previous === dataStore.appointmentBlocksIds.cash) {
        resolve(true)
      } else dataStore.updateAppointment(previous).then((data) => resolve(data))

    });
  }

  const dataTextListCreateItems = [
    {
      id: dataStore.appointmentBlocksIds.reason,
      label: 'Причина Обращения',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.complaints,
      label: 'Жалобы',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.anamnesis,
      label: 'Анамнез',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.objectively,
      label: 'Объективно',
      divider: true
    },
    {
      id: dataStore.appointmentBlocksIds.nexAppointment,
      label: 'Следующий прием',
      divider: true
    },
  ]

  const dataTextListItems = [
    {
      id: dataStore.appointmentBlocksIds.reason,
      label: 'Причина Обращения',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.complaints,
      label: 'Жалобы',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.anamnesis,
      label: 'Анамнез',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.objectively,
      label: 'Объективно',
      divider: true
    },
    {
      id: dataStore.appointmentBlocksIds.home,
      label: 'Дома',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.reccomendations,
      label: 'Рекомендации',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.consultation,
      label: 'Консультация',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.comment,
      label: 'Примечание',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.nexAppointment,
      label: 'Следующий прием',
      divider: true
    },
  ]

  const dataAnalisisListItems = [
    {
      id: dataStore.appointmentBlocksIds.analisis[0],
      label: dataStore.allAnalysisTypes[0]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[1],
      label: dataStore.allAnalysisTypes[1]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[2],
      label: dataStore.allAnalysisTypes[2]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[3],
      label: dataStore.allAnalysisTypes[3]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[4],
      label: dataStore.allAnalysisTypes[4]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[5],
      label: dataStore.allAnalysisTypes[5]?.name,
    },
  ]

  const dataConsultationsListItems = [
    {
      id: dataStore.appointmentBlocksIds.analisis[6],
      label: dataStore.allAnalysisTypes[6]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[7],
      label: dataStore.allAnalysisTypes[7]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[8],
      label: dataStore.allAnalysisTypes[8]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[9],
      label: dataStore.allAnalysisTypes[9]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[10],
      label: dataStore.allAnalysisTypes[10]?.name,
    },
    {
      id: dataStore.appointmentBlocksIds.analisis[11],
      label: dataStore.allAnalysisTypes[11]?.name,
    },
  ]

  const dataCreateAnalisisCashPhotoListItems = [
    {
      id: dataStore.appointmentBlocksIds.analisis[12],
      label: dataStore.allAnalysisTypes[12]?.name,
      divider: true
    },
    {
      id: dataStore.appointmentBlocksIds.photo,
      label: 'Фото',
      divider: true
    },
    {
      id: dataStore.appointmentBlocksIds.estimate,
      label: 'Смета',
      divider: false
    },
  ]

  const dataAnalisisCashPhotoListItems = [
    {
      id: dataStore.appointmentBlocksIds.analisis[12],
      label: dataStore.allAnalysisTypes[12]?.name,
      divider: true
    },
    {
      id: dataStore.appointmentBlocksIds.photo,
      label: 'Фото',
      divider: true
    },
    {
      id: dataStore.appointmentBlocksIds.estimate,
      label: 'Смета',
      divider: false
    },
    {
      id: dataStore.appointmentBlocksIds.cash,
      label: 'Касса',
      divider: true
    },
  ]

  function openTab(next) {
    dataStore.getTextTabInfo(next)
    if (next === dataStore.appointmentBlocksIds.photo) {
      photoStore.getPhotos()
    }
    if (dataStore.appointmentBlocksIds.analisis.includes(next)) {
      analysisStore.reset()
      changeTabOnAnalisis(next)
    }
    return true
  }

  const changeTabSelect = (event, value) => {
    const previous = store.tabValue
    saveTab(previous).then((data) => {
      if (data) {
        store.setTabValue(event.target.value)
        openTab(event.target.value, value.props.children)
      }
    })
  }

  const changeTab = (event, newValue) => {
    const previous = store.tabValue
    saveTab(previous).then((data) => {
      if (data) {
        store.setTabValue(newValue)
        openTab(newValue, event.target.childNodes[0].data)
      }
    })
  };

  return (
    <Grid container sx={{ height: {xs: "auto", sm: "90vh"} }}>
      <Grid item xs={12} sx={{ display: { sm: 'none' } }}>
        <FormControl sx={{ m: 3, minWidth: 244 }} size="small" focused>
          <InputLabel id="tabSelect">Пункт заполнения</InputLabel>
          <Select
            labelId="tabSelect"
            id="tabSelect"
            value={store.tabValue}
            label="Пункт заполнения"
            onChange={changeTabSelect}
            disabled={store.actionWait}
          >
            {dataTabItems.map((item, index) =>
              <MenuItem key={index} value={item.id}>{item.label}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        sx={{
          height: "100%",
          overflowY: "scroll",
          display: { xs: "none", sm: "block" },
          borderTop: "1px solid",
          borderRight: "1px solid",
          borderColor: "primary.violetGrey2"
        }}
      >
        {/* Текст */}
        <List
          sx={{ width: '100%', maxWidth: 360, p: 0 }}
          component="nav"
          aria-labelledby="dataTextListItems"
        >
          {dataStore.isExisted ?
            dataTextListItems.map((element) => {
              return (
                <ListItemButton sx={{ p: 0.6, pl: 2, borderBottom: element?.divider ? "1px solid" : "none", borderColor: "primary.violetGrey2" }} selected={element.id === store.tabValue} key={element.id} onClick={(e, v) => changeTab(e, element.id)}>
                  <ListItemText primary={element.label} />
                </ListItemButton>
              )
            })
            :
            dataTextListCreateItems.map((element) => {
              return (
                <ListItemButton sx={{ p: 0.6, pl: 2, borderBottom: element?.divider ? "1px solid" : "none", borderColor: "primary.violetGrey2" }} selected={element.id === store.tabValue} key={element.id} onClick={(e, v) => changeTab(e, element.id)}>
                  <ListItemText primary={element.label} />
                </ListItemButton>
              )
            })
          }
        </List>
        {/* Исследования */}
        <ListItemButton sx={{ p: 0.6, pl: 2, }} onClick={handleClickAnalisis}>
          <ListItemText primary="Исследования" />
          {openAnalisis ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAnalisis} timeout="auto" unmountOnExit>
          <List
            sx={{ width: '100%', maxWidth: 360, p: 0 }}
            component="nav"
            aria-labelledby="dataAnalisisListItems"
          >
            {dataAnalisisListItems.map((element) => {
              return (
                <ListItemButton sx={{ p: 0.6, pl: 3 }} selected={element.id === store.tabValue} key={element.id} onClick={(e, v) => changeTab(e, element.id)}>
                  <ListItemText sx={{ wordBreak: { sm: "break-all", md: "normal" } }} primary={element.label} />
                </ListItemButton>
              )
            })}
          </List>
          {/* Консультации */}
        </Collapse>
        <ListItemButton sx={{ p: 0.6, pl: 2, }} onClick={handleClickConsultations}>
          <ListItemText primary="Консультации" />
          {openConsultations ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openConsultations} timeout="auto" unmountOnExit>
          <List
            sx={{ width: '100%', maxWidth: 360, p: 0 }}
            component="nav"
            aria-labelledby="dataAnalisisListItems"
          >
            {dataConsultationsListItems.map((element) => {
              return (
                <ListItemButton sx={{ p: 0.6, pl: 3, }} selected={element.id === store.tabValue} key={element.id} onClick={(e, v) => changeTab(e, element.id)}>
                  <ListItemText primary={element.label} />
                </ListItemButton>
              )
            })}
          </List>
        </Collapse>
        {/* ост */}
        <List
          sx={{ width: '100%', maxWidth: 360, p: 0 }}
          component="nav"
          aria-labelledby="dataAnalisisCashPhotoListItems"
        >
          {dataStore.isExisted ?
            dataAnalisisCashPhotoListItems.map((element) => {
              return (
                <ListItemButton sx={{ p: 0.8, pl: 2, borderBottom: element?.divider ? "1px solid" : "none", borderColor: "primary.violetGrey2" }} selected={element.id === store.tabValue} key={element.id} onClick={(e, v) => changeTab(e, element.id)}>
                  <ListItemText primary={element.label} />
                  {element.label === "Касса" &&
                    <Typography>
                      {dataStore.cashUnitsCount != 0 && dataStore.cashUnitsCount}
                    </Typography>
                  }
                </ListItemButton>
              )
            })
            :
            dataCreateAnalisisCashPhotoListItems.map((element) => {
              return (
                <ListItemButton sx={{ p: 0.8, pl: 2, borderBottom: element?.divider ? "1px solid" : "none", borderColor: "primary.violetGrey2" }} selected={element.id === store.tabValue} key={element.id} onClick={(e, v) => changeTab(e, element.id)}>
                  <ListItemText primary={element.label} />
                  {element.label === "Касса" &&
                    <Typography>
                      {dataStore.cashUnitsCount != 0 && dataStore.cashUnitsCount}
                    </Typography>
                  }
                </ListItemButton>
              )
            })
          }
        </List>
      </Grid>
      <Grid item xs={12} sm={9} md={10} sx={{ height: { xs: "auto", sm: "100%" }, overflowY: "scroll" }}>
        <AppointmentBlocksWrap />
      </Grid>
    </Grid>
  )
}));

export default InfoAppointmentBlock