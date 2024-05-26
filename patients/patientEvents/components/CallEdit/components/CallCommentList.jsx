import React from 'react';
import {useInstance} from "react-ioc"
import {Typography, Box} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import CallEditModalStore from '../store/callEdit.store';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FullPageFallbackProgress } from '../../../../../../_components/UI/preloaders/FullPageFallbackProgress';
import { observer } from 'mobx-react-lite';

const CallCommentList = observer(() =>{
  const store = useInstance(CallEditModalStore)


    if (store.preloader===true){
      return (
        <FullPageFallbackProgress/>
      )
    }

    return (
        <Box sx={{mb: 2, mt: 2, p: 1, display: 'flex', justifyContent:  {xs: "flex-start", lg: "space-between"}, flexWrap: 'wrap', gap: 4}}>
          { store?.reasonsOptions.map((parentObj, parentIndex)=>{
            return(
              <Box key={parentIndex} sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant={"h6"} sx={{mb: 2, width: {xs: 280, sm: 200}, borderBottom: "1px solid", borderBottomColor: "primary.light", pb: 1}}>{parentObj?.name}</Typography>
                {parentObj?.children.map((reason, reasonIndex)=>{
                  return(
                    <FormControlLabel sx={{width: "100%", maxWidth: 200}} key={reasonIndex} control={<Checkbox size="small" onClick={() => store.setChangeActiveReason(parentIndex, reasonIndex)} checked={reason?.isActive} />} label={reason?.name} />
                  )
                })}
              </Box>
            )
          })}
        </Box>
    )
});
export default CallCommentList;