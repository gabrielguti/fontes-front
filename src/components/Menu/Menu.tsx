import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AppBar, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import { useAuthContext } from "../../contexts/AuthContext"
import { theme } from "../../styles/theme"
import { useEffect, useState } from "react"
import { redirect } from "react-router-dom"

export const Menu = () => {
    const logOutIconUi = { type: "icon", icon: faArrowAltCircleRight, tooltipTitle: "Sair" }
    const [username, setUsername] = useState<string>("")
    const { userData, signOut, isLogged } = useAuthContext()

    useEffect(() => {
        if (userData?.username) {
            setUsername(userData.username)
        }
    }, [userData])

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: "0",
                borderBottom: `4px solid ${theme.palette.secondary.main}`,
            }}
        >
            <Toolbar>
                <Stack
                    direction={"row"}
                    sx={{
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Stack
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        {username && <Typography variant="h2">Olá, {username}!</Typography>}
                    </Stack>
                    <Stack
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title={logOutIconUi.tooltipTitle} arrow placement="left-end">
                            <FontAwesomeIcon icon={logOutIconUi.icon} style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => signOut()}/>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
