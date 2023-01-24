import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Stack, TextField, Tooltip } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button } from "../../components/Button/Button"
import { formFeedback } from "../../data/formFeedbackData"
import { PasswordInputUi } from "../../schemas/PasswordField.schema"
import { signUp } from "../../services/Signup/SignupService"
import { SignupFormInputs } from "./SignupForm.schema"


const defaultValues: SignupFormInputs = {
    name: "",
    username: "",
    password: "",
}

export const SignupForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>({ defaultValues })
    const navigate = useNavigate()

    const [passwordInputUi, setPasswordInputUi] = useState<PasswordInputUi>({ type: "password", icon: faEye, tooltipTitle: "Mostrar" })
    const switchPasswordInputUi = () => {
        setPasswordInputUi(
            passwordInputUi.type === "password"
                ? { type: "text", icon: faEyeSlash, tooltipTitle: "Ocultar" }
                : { type: "password", icon: faEye, tooltipTitle: "Mostrar" }
        )
    }

    const signupMutation = useMutation((user:SignupFormInputs) => signUp(user), {
        onSuccess: async (success) => {
            toast.success("Cadastro realizado com sucesso!")
            navigate("/login")
        },
        onError: (error:any) => {
            toast.error(error.response.data.message)
        },
    })

    const onSubmit = (signupFormInputs: SignupFormInputs) => {
        signupMutation.mutate(signupFormInputs)
    }

    return (
        <Stack
            className="RegisterForm"
            sx={{
                width: "280px",
                padding: "0",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: formFeedback.email.required,
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            data-testid='name'
                            label="Name*"
                            variant="standard"
                            sx={{ width: "100%" }}
                            margin="normal"
                            error={!!errors?.name}
                            helperText={errors?.name?.message}
                        />
                    )}
                />
                 <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: formFeedback.email.required,
                        minLength: formFeedback.username.minLenght(4),
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            data-testid='username'
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
                                data-testid='password'
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
                <Button data-testid='submit' variant="primary" loading={signupMutation.isLoading}  type="submit" sx={{ marginTop: "50px", width: "100%" }}>
                    Cadastrar
                </Button>
            </form>
        </Stack>
    )
}
