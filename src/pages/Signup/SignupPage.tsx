import { Stack, Typography } from "@mui/material"
import { SignupForm } from "../../forms/Signup/SignupForm"
import { theme } from "../../styles/theme"
import wallpaper from '/wallpaper.svg'
import { Link } from "react-router-dom";


export const Signup = () => {
    return (
        <Stack
            className="RegisterPage"
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
                    paddingTop: '50px'
                }}
            >
                <Stack>
                    <Typography variant="h1">Cadastre-se</Typography>
                </Stack>
                <SignupForm />
                <Stack direction='row' sx={{
                    margin: '5px'
                }}>
                    <Typography variant="body1" sx={{
                        marginRight: '5px'
                    }}>Já possui conta?</Typography>
                     <Link style={{
                         color: theme.palette.secondary.main
                     }} to='/login'>Entrar</Link>
                </Stack>
            </Stack>
        </Stack>
    )
}