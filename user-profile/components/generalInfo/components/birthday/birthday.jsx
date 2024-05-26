import React from 'react';
import { Box } from "@mui/material";
import { useInstance } from "react-ioc";
import BirthdayWatching from './components/birthdayWtaching';
import BirthdayEditMode from './components/birthdayEditMode';
import GeneralViewStore from '../../store/generalInfo.view.store';
import { observer } from "mobx-react-lite"


const Birthday = observer(() => {
    const generalViewStore = useInstance(GeneralViewStore)

    return (
        <Box sx={{
            mt: 2,
            borderBottom: "1px solid",
            pb: 1,
            borderColor: "primary.light4"
        }}
        >
            {generalViewStore.getBirthdayEditMode() ?
                <BirthdayEditMode />
                :
                <BirthdayWatching />
            }

        </Box>
    );
});

export default Birthday;