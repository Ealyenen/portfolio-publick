import React from 'react';
import { useInstance } from "react-ioc";
import StorePhonesModal from "./stores/store";
import BaseModal from "../../../_components/UI/modals/BaseModal";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import PatientStore from '../store/patient.store';
import CallBtn from './components/CallBtn';

const PhonesModal = () => {
  const store = useInstance(StorePhonesModal)
  const patientStore = useInstance(PatientStore)
  const mainTheme = useTheme();
  const mobileBreakpoint = useMediaQuery(mainTheme.breakpoints.down("md"));

  return (
    <BaseModal title={'Телефоны...'}
      open={store.openModal}
      onClose={() => store.setOpenModal(false)}
      closeTitle={'Закрыть'}
      maxWidth={'sm'}
      hideSave={true}
      hideClose={mobileBreakpoint ? false : true}
    >
      {
        patientStore.getPhones()?.map((item) => {

          return (
            <Box key={item.id}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                p: 2,
                borderBottom: 1,
                ": last-of-type": {
                  borderBottom: 0
                },
                borderColor: 'primary.light2',
              }}>
              <CallBtn phone={item} />
              <Box>
                <Typography variant={'h7'} sx={{ display: "inline", color: !item.ruNumber && "primary.lightred" }}>
                  {item.type.type}{"\u00A0"}{item.hasOrder ? item.order : ""}{!item.ruNumber ? " (Иностранный)" : ""}
                </Typography>
                <Typography sx={{ display: "inline" }}>
                  {" "}{item.comment}
                </Typography>
              </Box>

            </Box>
          )
        })
      }
    </BaseModal>
  );
};

export default PhonesModal;