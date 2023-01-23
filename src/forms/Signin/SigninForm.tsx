import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Stack, TextField, Tooltip } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button } from "../../components/Button/Button"
import { useAuthContext } from "../../contexts/AuthContext"
import { formFeedback } from "../../data/formFeedbackData"
import { ErrorResponse, SuccessResponse } from "../../schemas/api.schema"
import { AuthLoginData } from "../../schemas/authChannel.schema"
import { PasswordInputUi } from "../../schemas/PasswordField.schema"
import { signIn } from "../../services/Signin/SigninService"
import { SigninResponse, SignInParams } from "../../services/Signin/SigninService.schema"
import { SigninFormInputs } from "./SigninForm.schema"
import { redirect } from "react-router-dom";

const defaultValues: SigninFormInputs = {
    username: "",
    password: "",
}

export const AuthForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormInputs>({ defaultValues })
    const { setAuth } = useAuthContext()
    const navigate = useNavigate()

    const [passwordInputUi, setPasswordInputUi] = useState<PasswordInputUi>({ type: "password", icon: faEye, tooltipTitle: "Mostrar" })
    const switchPasswordInputUi = () => {
        setPasswordInputUi(
            passwordInputUi.type === "password"
                ? { type: "text", icon: faEyeSlash, tooltipTitle: "Ocultar" }
                : { type: "password", icon: faEye, tooltipTitle: "Mostrar" }
        )
    }

    const signinMutation = useMutation((user:SigninFormInputs) => signIn(user), {
        onSuccess: async (success) => {
            if (success.data) {
                const userData: AuthLoginData = {
                    accessToken: success.data.accessToken,
                    username: success.data.username,
                }
                setAuth(userData)
            }
            toast.success("Sucesso ao entrar!")
            navigate("/dashboard")
        },
        onError: (error:any) => {
            toast.error(error.response.data.message)
        },
    })

    const onSubmit = (signinInputs: SigninFormInputs) => {
        signinMutation.mutate(signinInputs)
    }

    return (
        <Stack
            className="AuthForm"
            sx={{
                width: "280px",
                padding: "0",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: formFeedback.username.required,                    
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Username*"
                            variant="standard"
                            sx={{ width: "100%" }}
                            margin="normal"
                            error={!!errors?.username}
                            helperText={errors?.username?.message}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: formFeedback.password.required,
                        minLength: formFeedback.password.minLenght(6),
                    }}
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                label="Senha*"
                                variant="standard"
                                sx={{ width: "100%" }}
                                type={passwordInputUi.type}
                                margin="normal"
                                error={!!errors?.password}
                                helperText={errors?.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip title={passwordInputUi.tooltipTitle} arrow placement="right-end">
                                            <FontAwesomeIcon
                                                icon={passwordInputUi.icon}
                                                onClick={() => switchPasswordInputUi()}
                                                cursor="pointer"
                                            />
                                        </Tooltip>
                                    ),
                                }}
                            />
                        )
                    }}
                />
                <Button variant="primary" loading={signinMutation.isLoading} type="submit" sx={{ marginTop: "50px", width: "100%" }}>
                    Entrar
                </Button>
            </form>
        </Stack>
    )
}
