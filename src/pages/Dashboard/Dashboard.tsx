import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid, Modal, Stack, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../components/Button/Button"
import { Menu } from "../../components/Menu/Menu"
import { ProjectCard } from "../../components/ProjectCard/ProjectCard"
import { useAuthContext } from "../../contexts/AuthContext"
import { ProjectForm } from "../../forms/Project/ProjectForm"
import { Projects } from "../../schemas/Project.schema"
import { getProjects } from "../../services/Project/ProjectService"
import { ModalStyle } from "../../styles/modal"
import { theme } from "../../styles/theme"

export const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState<string>("")
    const [projects, setProjects] = useState<Projects[]>([])
    const { userData } = useAuthContext()

    const handleChange = () => setOpen(!open)

    useEffect(() => {
        if (userData?.username) {
            setUsername(userData.username)
        }
    }, [userData])

    const getProjectsQuery = useQuery(["products", username], () => getProjects(username), {
        enabled: !!username,
        onSuccess: (success) => {
            setProjects(success.data.projects)
        },
        onError: (error: any) => {
            toast.error("Tivemos um erro inesperado")
        },
    })

    return (
        <Stack
            sx={{
                height: "100vh",
            }}
        >
            <Menu />
            <Stack
                sx={{
                    display: "flex",
                    justifyItems: "center",
                    height: "100%",
                    padding: "10px",
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        height: "15%",
                        justifyContent: "space-between",
                        padding: "10px",
                    }}
                >
                    <Typography variant="h1" sx={{ fontWeight: "bold" }}>
                        Controle de projetos
                    </Typography>
                    <Button variant="primary" onClick={handleChange}>
                        Adicionar
                    </Button>
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
                            <ProjectForm isEdit={false} refetch={getProjectsQuery.refetch} handleChange={handleChange} />
                        </Stack>
                    </Modal>
                </Stack>
                {projects.length ? (
                    <Grid container sx={{ overflow: "scroll", maxHeight: "70vh", justifyContent: "center" }}>
                        {projects.map((project) => (
                            <Grid
                                key={project.id}
                                item
                                xl={3}
                                sx={{
                                    height: "180px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    width: "400px",
                                }}
                            >
                                <ProjectCard
                                    refetch={getProjectsQuery.refetch}
                                    id={project.id}
                                    title={project.title}
                                    done={project.done}
                                    cost={project.cost}
                                    deadline={project.deadline}
                                    zip_code={String(project.zip_code)}
                                    username={username}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Stack
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            border: `5px solid ${theme.palette.disabled.main}`,
                            height: "70vh",
                            borderRadius: "10px",
                            borderStyle: "dashed",
                        }}
                    >
                        <Typography variant="h1" sx={{ fontSize: "30px", fontWeight: "bold", color: theme.palette.disabled.main }}>
                            Crie e gerencie seus projetos!
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}
