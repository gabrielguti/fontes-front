import { api } from "../../lib/api"
import { SignInParams } from "./SigninService.schema"

export const signIn = (user: SignInParams) => {
    return api.post(`/login`, user)
}
