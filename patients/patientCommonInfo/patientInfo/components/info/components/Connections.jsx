import React from 'react';
import { Box, Link, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import { fullNameString } from '../../../../../../../_common/helpers/nameGenerationString';
import AllPatientCard from '../../../../../store/patientCard.store';
import { Link as RouterLink } from "react-router-dom";
import { PATIENTS_ROUTE } from '../../../../../../../_common/router/routes';


const Connetions = observer(() => {
  const patientStore = useInstance(PatientStore)
  const allPatientCard = useInstance(AllPatientCard)

  const setConnectionType = (type) => {
    switch (type) {
      case "MOTHER":
        return "Мать";
      case "FATHER":
        return "Отец";
      case "EMPTY":
        return "";
      case "WIFE":
        return "Жена";
      case "HUSBAND":
        return "Муж";
      case "SON":
        return "Сын";
      case "DAUGHTER":
        return "Дочь";
      case "GRANDSON":
        return "Внук";
      case "GRANDDAUGHTER":
        return "Внучка";
      case "GRANDMOTHER":
        return "Бабушка";
      case "GRANDFATHER":
        return "Дедушка";
      case "SISTER":
        return "Сестра";
      case "BROTHER":
        return "Брат";
      case "AUNT":
        return "Тетя";
      case "UNCLE":
        return "Дядя";
      case "NEPHEW":
        return "Племянник";
      case "NIECE":
        return "Племянница";
      case "RELATIVE":
        return "Родственник";
      case "COLLEAGUE":
        return "Коллега";
      case "TUTOR":
        return "Куратор";
      case "TRUSTEE":
        return "Попечитель";
      case "GUARDIAN":
        return "Опекун";
      case "FAMILIAR":
        return "Знакомый";
      case "NEIGHBOUR":
        return "Соседи";
      case "BABYSITTER":
        return "Няня";
      default:
        return ""
    }
  }

  const handleGoToPatientCard = (id) => {
    allPatientCard.setEventsRefetching(true)
    patientStore.setPatientId(id)
  }

  return (
    <>
      <Typography variant="subtitle1" sx={{mt: 2}}>
        Связь с другими пациентами:
      </Typography>
      {patientStore.getParents()?.map((parent) => {
        return (
          <Box sx={{mt: 1}} key={parent.id}>
            < Link
              underline="hover"
              component={RouterLink}
              to={`${PATIENTS_ROUTE}/${parent?.parent?.id}`}
              onClick={() => handleGoToPatientCard(parent?.parent?.id)}
              sx={{display: "inline"}}
            >
              {fullNameString(parent?.parent?.lastName, parent?.parent?.firstName, parent?.parent?.patronymic)}
            </Link>
            <Typography sx={{display: "inline"}}>
              {" "}{setConnectionType(parent?.parentComment)}
            </Typography>
          </Box>
        )
      })}
    </>
  );
});

export default Connetions;