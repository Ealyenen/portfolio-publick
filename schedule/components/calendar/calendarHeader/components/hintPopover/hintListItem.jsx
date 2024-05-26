import React from "react";
import { Box, Typography } from "@mui/material"
import { theme } from "../../../../../../../_common/theme/theme"


const SheduleHintListItem = ((
    {
        name,
        itemComponent,
        color = theme.palette.primary.black,
        circle = false,
        isSign = false
    }
) => {

    return (
        <Box sx={{ display: "flex", p: 0.5 }}>
            {isSign &&
                <Box
                    sx={{
                        width: 20,
                        height: 20,
                        minWidth: 20,
                        minHeight: 20,
                        background: color ? color : theme.palette.primary.grey2,
                        borderRadius: circle ? "50%" : 0.5,
                        color: "primary.white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {itemComponent}
                </Box>
            }
            <Typography sx={{ display: "inline", ml: 0.5 }}>
                {name}
            </Typography>
        </Box>

    )

});

export default SheduleHintListItem