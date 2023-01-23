import { faCheck, faPen, faTrash, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Modal, Stack, Typography } from "@mui/material"
import { theme } from "../../styles/theme"
import moment from "moment"
import { useState } from "react"
import { ProjectForm } from "../../forms/Project/ProjectForm"
import { ModalStyle } from "../../styles/modal"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Button } from "../../components/Button/Button"
import { deleteProject, editProjectStatus, getProject } from "../../services/Project/ProjectService"
import { useQuery } from "@tanstack/react-query"
import { Projects } from "../../schemas/Project.schema"

interface ProjectCardProps {
    done: boolean
    title: string
    deadline: Date
    cost: number
    zip_code: string
    id: string
    refetch: any
    username: string
}

export const ProjectCard = ({ done, title, deadline, cost, zip_code, id, refetch, username }: ProjectCardProps) => {
    const formattedDeadline = moment(deadline).format("DD/MM/YYYY")
    const [open, setOpen] = useState(false)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [project, setProject] = useState<Projects>()

    const handleChange = () => setOpen(!open)
    const handleChangeDetailsModal = () => setOpenDetailsModal(!openDetailsModal)

    const editStatusMutation = useMutation(() => editProjectStatus({ username, id }), {
        onSuccess: (success) => {
            toast.success("Projeto concluído")
            refetch()
        },
        onError: (error: any) => {
            toast.error("Tivemos um erro inesperado")
        },
    })
    const deleteProjectMutation = useMutation(() => deleteProject({ username, id }), {
        onSuccess: (success) => {
            toast.success("Projeto excluído")
            refetch()
        },
        onError: (error) => {
            toast.error("Tivemos um erro inesperado")
        },
    })

    const getProjectQuery = useQuery(["full-project", id], () => getProject(id), {
        enabled: showDetails,
        onSuccess: (success) => {
            setProject(success.data.project)
            setShowDetails(false)
            setOpenDetailsModal(true)
        },
        onError: (error) => {
            setShowDetails(false)
            toast.error("Tivemos um erro inesperado")
        },
    })

    return (
        <Box
            sx={{
                width: "300px",
                height: "160px",
                borderRadius: "10px",
                background: theme.palette.complementary.beluga.main,
                boxShadow: `1px 1px 1px 1px ${theme.palette.disabled.main}`,
                marginBottom: "10px",
            }}
        >
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    padding: "10px",
                }}
            >
                <Typography variant="body1" sx={{ width: "70%", fontWeight: "bold" }}>
                    {title}
                </Typography>

                {!done && <FontAwesomeIcon icon={faCheck} style={{ cursor: "pointer" }} onClick={() => editStatusMutation.mutate()} />}

                <FontAwesomeIcon icon={faPen} onClick={handleChange} style={{ cursor: "pointer" }} />

                <Modal disableAutoFocus open={open} onClose={handleChange}>
                    <Stack sx={ModalStyle}>
                        <Stack
                            sx={{
                                width: "100%",
                                margin: "0",
                                alignItems: "end",
                            }}
                        >
                            <FontAwesomeIcon icon={faX} onClick={handleChange} style={{ cursor: "pointer" }} />
                        </Stack>
                        <ProjectForm isEdit={true} refetch={refetch} project_id={id} />
                    </Stack>
                </Modal>

                <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} onClick={() => deleteProjectMutation.mutate()} />
            </Stack>
            <Stack
                sx={{
                    justifyContent: "space-between",
                    padding: "10px",
                }}
            >
                <Typography variant="body1">R${cost} </Typography>

                {!done && <Typography variant="body1">Realizar até {formattedDeadline}</Typography>}

                {done && (
                    <Typography variant="body1" sx={{ color: theme.palette.success.main, fontWeight: "bold" }}>
                        Concluído
                    </Typography>
                )}
                <Button onClick={() => setShowDetails(true)} variant="secondary">
                    {" "}
                    Ver detalhes
                </Button>
                {project && (
                    <Modal disableAutoFocus open={openDetailsModal} onClose={handleChangeDetailsModal}>
                        <Stack sx={ModalStyle}>
                            <Stack
                                direction="row"
                                sx={{
                                    width: "100%",
                                    margin: "0",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h1" style={{}}>
                                    Título: {project.title}
                                </Typography>
                                <FontAwesomeIcon icon={faX} onClick={handleChangeDetailsModal} style={{ cursor: "pointer" }} />
                            </Stack>
                            <Stack
                                sx={{
                                    width: "100%",
                                    padding: "5px",
                                }}
                            >
                                <Typography variant="body1">Custo: R${project.cost}</Typography>
                                <Typography variant="body1">Realizar até {moment(project.deadline).format("DD/MM/YYYY")}</Typography>
                                <Typography variant="body1">Localização: {project.zip_code}</Typography>
                                <Typography variant="body1">Criado em: {moment(project.created_at).format("DD/MM/YYYY")}</Typography>
                                <Typography variant="body1">Status: {project.done ? "Concluído" : "Em andamento"}</Typography>
                            </Stack>
                        </Stack>
                    </Modal>
                )}
            </Stack>
        </Box>
    )
}
