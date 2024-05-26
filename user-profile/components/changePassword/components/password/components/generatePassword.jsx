import React, { useState } from 'react';
import { Box, ButtonGroup, TextField, FormControl, FormHelperText, Typography } from "@mui/material";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite"
import PasswordStore from '../../../store/password.store';
import IconButton from '@mui/material/IconButton';
import ButtonMain from '../../../../../../../_components/UI/Buttons/ButtonMain';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { generatePassword } from '../../../store/passwordGenerate';
import { handleCopyToClipBoard } from '../../../../../../../_common/helpers/copyToClipboard';


const GeneratePassword = observer(() => {
    const passwordStore = useInstance(PasswordStore)
    const [generated, setGenerated] = useState("")
    const [generateClicks, setGenerateClicks] = useState(0)

    const handleGenerate = () => {
        if (generateClicks === 5) {
            setGenerated("1(>^_^)><(^_^<)l")
        }
        else {
            setGenerated(generatePassword())
        }
        setGenerateClicks((prev) => prev + 1)
    }

    const handleUseGenerated = () => {
        passwordStore.setNewPassword(generated)
        passwordStore.setRepeatNewPassword(generated)
        handleCopyToClipBoard(generated)
        setGenerated("")
    }


    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 2, flexWrap: "wrap"}}>
            {generateClicks >= 10 ?
                <Typography>
                    Теперь пароль точно самый надежный {";) "}
                </Typography>
                :
                <ButtonMain
                    title="Сгенерировать"
                    onClick={handleGenerate}

                />
            }

            {generated?.length > 0 &&
                <Box sx={{width: {xs: "100%", sm: "auto", display: "flex"}}}>
                    <Typography sx={{ bgcolor: "primary.light2", p: 1, borderRadius: 1 }}>
                        {generated}
                    </Typography>
                    <IconButton onClick={handleUseGenerated}>
                        <VpnKeyIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                </Box>
            }
        </Box>

    );
});

export default GeneratePassword;