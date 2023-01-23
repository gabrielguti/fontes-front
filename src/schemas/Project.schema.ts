export interface ProjectFieldsToSend {
    title: string
    zip_code: number,
    cost: number,
    deadline: Date
}

export interface Projects {
    id: string,
    title: string,
    zip_code: number | string,
    cost: number,
    done: boolean,
    deadline: Date,
    username: string,
    created_at: Date,
    updated_at: Date
}

export interface ProjectOwnerParams {
    username: string,
    id:string
}


