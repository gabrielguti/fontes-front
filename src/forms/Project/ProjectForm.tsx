import { Stack, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../../components/Button/Button"
import { formFeedback } from "../../data/formFeedbackData"
import { ProjectFormInputs, ProjectFormProps } from "./ProjectForm.schema"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers"
import { createProject, editProjectFields } from "../../services/Project/ProjectService"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useAuthContext } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { ProjectFieldsToSend } from "../../schemas/Project.schema"
import { clearMask,maskCepString, maskMoneyString } from "../../utils/masks"

const defaultValues: ProjectFormInputs = {
    title: "",
    zip_code: "",
    cost: "",
    deadline: new Date(),
}

export const ProjectForm = ({ isEdit, refetch, project_id = '', handleChange = () => true }: ProjectFormProps) => {
    const {userData} = useAuthContext()
    const [username, setUsername] = useState<string>('')
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormInputs>({ defaultValues })

    useEffect(() => {
        if(userData?.username) setUsername(userData.username)
    }, [userData])

    
    const createProjectMutation = useMutation((project: ProjectFieldsToSend) => createProject(project, username), {
        onSuccess: async (success) => {
            toast.success('Projeto criado!')
            handleChange()
            refetch()
        }, onError: (error:any) => {
            handleChange()
            toast.error('Tivemos um erro inesperado')
        }
    })

    const editFieldsProjectMutation = useMutation((project: ProjectFieldsToSend) => editProjectFields(project, project_id, username), {
        onSuccess: async (success) => {
            toast.success('Projeto atualizado!')
            handleChange()
            refetch()
        }, onError: (error:any) => {
            handleChange()
            toast.error('Tivemos um erro inesperado')
        }
    })

    const onSubmit = (projectFormInputs: ProjectFormInputs) => {
        
        const formattedFields = {
            ...projectFormInputs, zip_code: Number(clearMask(projectFormInputs.zip_code, ['-'])), cost: Number(clearMask(projectFormInputs.cost,[',','.']))
        }
        
        if(isEdit){
            return editFieldsProjectMutation.mutate(formattedFields)
        }

        createProjectMutation.mutate(formattedFields)
    }

    return (
        <Stack
            className="ProjectForm"
            sx={{
                width: "280px",
                padding: "0",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: formFeedback.title.required,
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Título *"
                            variant="standard"
                            sx={{ width: "100%" }}
                            margin="normal"
                            error={!!errors?.title}
                            helperText={errors?.title?.message}
                        />
                    )}
                />
                <Controller
                    name="zip_code"
                    control={control}
                    rules={{
                        required: formFeedback.zip_code.required,
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="CEP *"
                            variant="standard"
                            sx={{ width: "100%" }}
                            margin="normal"
                            error={!!errors?.zip_code}
                            helperText={errors?.zip_code?.message}
                            onChange={(e) => {
                                setValue('zip_code', maskCepString(e.target.value), {shouldDirty:true})
                            }}
                        />
                    )}
                />

                <Controller
                    name="cost"
                    control={control}
                    rules={{
                        required: formFeedback.cost.required,
                    }}
                    render={({ field }) => {
                        return (
                            <TextField
                                {...field}
                                label="Custo R$ *"
                                variant="standard"
                                sx={{ width: "100%" }}
                                margin="normal"
                                error={!!errors?.cost}
                                helperText={errors?.cost?.message}
                                onChange={(e) => {
                                    setValue('cost', maskMoneyString(e.target.value), {shouldDirty: true})
                                }}
                            />
                        )
                    }}
                />
                <Controller
                    name="deadline"
                    control={control}
                    rules={{
                        required: formFeedback.deadline.required,
                    }}
                    render={({ field }) => {
                        return (
                            <LocalizationProvider dateAdapter={AdapterMoment}>

                                <DatePicker
                                    {...field}
                                    label="Prazo *"
                                    onChange={(e:any) => setValue('deadline', e._d)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            sx={{ width: "100%" }}
                                            margin="normal"
                                            type="date"
                                            error={!!errors?.deadline}
                                            helperText={errors?.deadline?.message}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        )
                    }}
                />
                <Button variant="primary" type="submit" sx={{ marginTop: "50px", width: "100%" }}>
                    {isEdit ? "Editar" : "Cadastrar"}
                </Button>
            </form>
        </Stack>
    )
}
