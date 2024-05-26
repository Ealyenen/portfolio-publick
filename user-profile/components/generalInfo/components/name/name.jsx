import React from 'react';
import { Box } from "@mui/material";
import { useInstance } from "react-ioc";
import GeneralViewStore from '../../store/generalInfo.view.store';
import { observer } from "mobx-react-lite"
import NameWatching from './components/nameWatching';
import NameEditMode from './components/nameEditMode';


const Name = observer(() => {
    const generalViewStore = useInstance(GeneralViewStore)

    return (
        <Box sx={{
            mt: 2,
            borderBottom: "1px solid",
            pb: 1,
            borderColor: "primary.light4"
        }}
        >
            {generalViewStore.getNameEditMode() ?
                <NameEditMode />
                :
                <NameWatching />
            }

        </Box>
    );
});

export default Name;