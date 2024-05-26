import React from "react";
import { Typography } from "@mui/material"

const Comment = (({ comment }) => {

    return (
        <Typography variant="body" sx={{fontSize: 10}}>
            {comment?.length>0 && comment}
        </Typography>
    )

});

export default Comment