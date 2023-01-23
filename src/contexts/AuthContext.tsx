import { createContext, useContext, useState } from "react"
import { WebStorageKeys } from "../data/webStorageKeysData"
import { deobfuscate, obfuscate } from "../lib/obfuscate"
import { AuthContextData, AuthLoginData } from "../schemas/AuthContext.schema"


const getUserDataInLocalStorage = () => {
    const accessToken = localStorage.getItem(WebStorageKeys.AccessToken)
    const username = localStorage.getItem(WebStorageKeys.Username)

    let userData
    if(accessToken && username){
        userData={
            accessToken: accessToken,
            username:deobfuscate(username)
        }
    }

    return userData || undefined
   

}


const getAccessTokenInWebStorage = () => localStorage.getItem(WebStorageKeys.AccessToken)

const removeUserInWebStorage = () => {
        localStorage.removeItem(WebStorageKeys.AccessToken)
        localStorage.removeItem(WebStorageKeys.Username)
    
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: any) => {
    const [userData, setUserData] = useState<AuthLoginData | undefined>(() => getUserDataInLocalStorage())
    const [isLogged, setIsLogged] = useState(() => !!getAccessTokenInWebStorage())



    const setAuth = (data: AuthLoginData) => {
        const obfuscatedUser = obfuscate(JSON.stringify(data.username))

        localStorage.setItem(WebStorageKeys.AccessToken, data.accessToken)
        localStorage.setItem(WebStorageKeys.Username, obfuscatedUser)
        setUserData({
            accessToken: data.accessToken,
            username: data.username,
        })
        setIsLogged(true)
    }

    const signOut = () => {
        removeUserInWebStorage()
        setIsLogged(false)
    }


    return <AuthContext.Provider value={{ setAuth, userData, isLogged, signOut }}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext isn't defined")
    }
    return context
}

export { AuthProvider, useAuthContext }
