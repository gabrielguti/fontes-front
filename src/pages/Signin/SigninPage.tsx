import { Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { AuthForm } from "../../forms/Signin/SigninForm"
import { theme } from "../../styles/theme"
import wallpaper from '/wallpaper.svg'

export const Signin = () => {
    return (
        <Stack
            className="AuthPage"
            direction="row"
            height="100vh"
            sx={{
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover'


            }}
        >
            <Stack
                alignItems="center"
                sx={{
                    minHeight: "50%",
                    minWidth: "30%",
                    padding: "10px",
                    background: theme.palette.common.white,
                    borderRadius: "15px",
                    paddingTop: '50px',
                }}
            >
                <Stack>
                    <Typography variant="h1">Entrar</Typography>
                </Stack>
                <AuthForm />
                <Stack direction='row' sx={{
                    margin: '5px'
                }}>
                    <Typography variant="body1" sx={{
                        marginRight: '5px'
                    }}>Não possui conta?</Typography>
                    <Link to='/register' style={{color: theme.palette.secondary.main, cursor:"pointer"}}>Cadastre-se</Link>
                </Stack>
            </Stack>
        </Stack>
    )
}
