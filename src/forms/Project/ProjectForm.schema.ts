export interface ProjectFormProps {
    isEdit: boolean
    refetch: any
    project_id?:string
    handleChange?: () => void
}

export interface ProjectFormInputs {
    title: string
    zip_code: string,
    cost: string,
    deadline: Date
}
