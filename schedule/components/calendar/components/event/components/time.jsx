import React from "react";
import { Typography } from "@mui/material"

const Time = (({ timeStart, timeEnd }) => {

    return (
        <Typography variant="button" sx={{fontSize: 10, whiteSpace: "nowrap"}}>
            {timeStart.slice(0, 5)} - {timeEnd.slice(0, 5)}
        </Typography>
    )
});

export default Time