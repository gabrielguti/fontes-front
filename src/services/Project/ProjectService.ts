import { api } from "../../lib/api"
import { ProjectFieldsToSend, ProjectOwnerParams } from "../../schemas/Project.schema"





export const createProject = (project: ProjectFieldsToSend, username:string) => {
return api.post('/project', project, {
    headers: {
        username: username
    }
})
}

export const getProjects = (username:string) => {
    return api.get('/projects', {
        headers:{
            username:username
        }
    })
}

export const getProject = (id: string) => {
    return api.get('/project',{
        headers: {
            project_id: id
        },
    })
}


export const deleteProject = ({username, id}:ProjectOwnerParams) => {
    return api.delete(`/projects/${id}`, {
        headers:{
            username: username
        }
    })
}

export const editProjectStatus = ({username, id}:ProjectOwnerParams) => {
    return api.patch(`/projects/${id}/done`, {}, {
        headers: {
            username: username
        }
    })
}

export const editProjectFields = ({title, zip_code, cost, deadline}:ProjectFieldsToSend, id:string, username:string) => {
    return api.put(`/projects/${id}`, {title, zip_code, cost, deadline}, {
        headers: {
            username: username
        }
    })
}



