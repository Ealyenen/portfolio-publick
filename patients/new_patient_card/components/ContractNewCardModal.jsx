import * as React from 'react';
import {
    Box,
    TextField,
    Typography
  } from "@mui/material";
  import IconButton from "@mui/material/IconButton";
  import FeedIcon from "@mui/icons-material/Feed";
import { useInstance } from 'react-ioc';
import {StoreContractNewCardModal} from '../stores/store';
import BaseModal from '../../../../_components/UI/modals/BaseModal';
import {styled} from "@mui/material/styles";
import Button from '@mui/material/Button';

const ContractNewCardModal = () => {
    const InputHiden = styled('input')({
        display: 'none',
      });
  const storeContractNewCardModal = useInstance(StoreContractNewCardModal)
    
    return (
      <BaseModal
        open={storeContractNewCardModal.openModal}
        title={'договор'}
        onClose={()=>storeContractNewCardModal.setOpenContractNewCardModal(false)}
        saveClick={()=>storeContractNewCardModal.setOpenContractNewCardModal(false)}
      >
        <Box sx={{width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap"}}>
                <Box>
                    <TextField label="Номер договора" size="small" focused sx={{width: 200}}/>
                    <label htmlFor="icon-button-file">
                    <InputHiden accept="image/*" id="icon-button-file" type="file"/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <FeedIcon/>
                    </IconButton>
                    </label>
                </Box>
                <TextField label="Номер паспорта" size="small" focused sx={{mt: 1, width: {xs: "100%", sm: 200}}}/>
              </Box>
              <Box sx={{display: "flex", flexDirection: "column"}}>
                
                <TextField label="Выдан" size="small" focused sx={{mt: 2}}/>
                <TextField label="Адрес Регистрации" size="small" focused sx={{mt: 2}}/>
                <TextField label="Услуга" size="small" focused sx={{mt: 2}}/>
                <TextField label="Являюсь законным представителем (ввести ФИО ребенка)" size="small" focused sx={{mt: 2}}/>
              </Box>
              <Button size='small' variant="outlined" sx={{mt: 1, textTransform: "uppercase"}}>
                <Typography>
                  Открыть договор
                </Typography>
              </Button>
        </Box>
      </BaseModal>
    )
  };

export default ContractNewCardModal;