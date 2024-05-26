import React from 'react';
import { Grid, Typography, Box } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import moment from "moment/moment"
import 'moment/locale/ru'
import TodayIcon from '@mui/icons-material/Today';
import DoneIcon from '@mui/icons-material/Done';

const DateBanner = ({ date, alternativeText, useDoneIcon=false }) => {

    return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2, mb: 2, ml: { xs: -1.7, md: 0 } }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
                {useDoneIcon ?
                    <DoneIcon />
                    :
                    <TodayIcon />
                }

            </Avatar>
            <Box sx={{ p: [2, 1], flex: 1 }}>
                {date &&
                    <Typography variant="h6" sx={{ fontSize: 16 }}>
                        {moment(date).format("DD MMMM YYYY dddd")}
                    </Typography>
                }
                {alternativeText &&
                    <Typography variant="h6">
                        {alternativeText}
                    </Typography>
                }
            </Box>
        </Box>

    );
};

export default DateBanner;