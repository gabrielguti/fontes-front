import { FunctionVoid } from "./Generic.schema"


export interface AuthLoginData {
    accessToken: string
    username: string
}

export interface AuthContextData {
    setAuth(data: AuthLoginData): void
    userData?: AuthLoginData
    isLogged: boolean
    signOut: FunctionVoid
}
