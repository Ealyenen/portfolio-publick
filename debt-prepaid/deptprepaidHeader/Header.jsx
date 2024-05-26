import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, AccordionSummary, AccordionDetails, Typography, Fab } from "@mui/material";
import DatesRange from './components/DatesRange';
import Patient from './components/Patient'
import Type from './components/Type';
import User from './components/User';
import ButtonMain from '../../../_components/UI/Buttons/ButtonMain';
import { observer } from 'mobx-react-lite';
import DebtPrepaidStore from '../store/debtPrepaid.store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import SearchBtn from './components/SearchBtn';
import CreteModalStore from '../CreateModal/store/createModal.store';
import AddIcon from '@mui/icons-material/Add';
import HintPopover from './components/Hint';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '&:root': {
        "&$expanded": {
            margin: "auto",
        }
    },
}));

const Header = observer(() => {
    const store = useInstance(DebtPrepaidStore)
    const creteModalStore = useInstance(CreteModalStore)

    const handleResetAll = () => {
        store.resetFilters()
        store.resetPagination()
        store.requestAllDebt()
    }

    const handleCreate = () => {
        creteModalStore.setOpenModal(true)
    }

    const filters = () => {
        return (
            <>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", mt: 1 }}>
                    <User />
                    <Patient />
                    <DatesRange />
                    <Type />
                </Box>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3, justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {store.countFilters > 0 &&
                            <ButtonMain
                                title="сбросить все"
                                onClick={handleResetAll}
                            />
                        }
                        <SearchBtn />
                        <ButtonMain
                            title="создать долг/аванс"
                            onClick={handleCreate}
                            sx={{ display: { xs: "none", md: "block" } }}
                        />
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <HintPopover />
                    </Box>
                </Box>

            </>

        )
    }

    return (
        <>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Фильтры:
                </Typography>
                {filters()}
            </Box>
            <Accordion sx={{ display: { xs: "block", md: "none" } }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ p: 0 }}
                >
                    <Typography>
                        Фильтры {store.countFilters > 0 && store.countFilters}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    {filters()}
                </AccordionDetails>
            </Accordion>
            <Box sx={{ display: { xs: "block", md: "none"}, mt: 2 }}>
                <HintPopover />
            </Box>
            <Box sx={{ position: "fixed", bottom: 20, zIndex: 1, display: { xs: "block", md: "none" } }}>
                <Fab size="small" color="secondary" onClick={handleCreate}>
                    <AddIcon />
                </Fab>
            </Box>
        </>

    );
});

export default Header;