import { api } from "../../lib/api";
import { SignupResponse, SignUpParams } from "./SignupService.schema";

export const signUp = (user:SignUpParams):Promise<SignupResponse> => {
    return api.post('/users', user)
}