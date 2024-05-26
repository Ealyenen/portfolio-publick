import React from 'react';
import { observer } from "mobx-react-lite"
import { Typography, Box } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreGeneralInfo from '../../../store/generalnfo.store';
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import GeneralViewStore from '../../../store/generalInfo.view.store';
import { fullNameString } from '../../../../../../../_common/helpers/nameGenerationString';


const NameWatching = observer(() => {
    const storeGeneralInfo = useInstance(StoreGeneralInfo)
    const generalViewStore = useInstance(GeneralViewStore)

    const handleEditClick = () => {
        generalViewStore.setNameEditMode(true)
    }

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2}}>
            <Box>
                <Typography sx={{ display: "inline", color: "primary.main" }} variant="h6">
                    ФИО:
                </Typography>
                <Typography sx={{ display: "inline" }}>
                    {" "}{fullNameString(storeGeneralInfo.getLastName(), storeGeneralInfo.getFirstName(), storeGeneralInfo.getPatronymic())}
                </Typography>
            </Box>
            <ButtonMain
                title={"Изменить"}
                onClick={handleEditClick}
            />
        </Box>

    );
});

export default NameWatching;