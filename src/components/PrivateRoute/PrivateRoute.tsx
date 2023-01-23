import { ReactNode } from 'react'
import {Navigate} from 'react-router-dom'
interface PrivateRouteProps {
    isLogged: boolean
    children: JSX.Element
}
export const PrivateRoute = ({isLogged, children}: PrivateRouteProps) => {
    if(!isLogged){
        return <Navigate to = '/' replace/>
    }
    return children
}


