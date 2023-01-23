import { Box } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { useAuthContext } from "./contexts/AuthContext"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Signin } from "./pages/Signin/SigninPage"
import { Signup } from "./pages/Signup/SignupPage"

export const App = () => {
    const {isLogged} = useAuthContext()

    return (
        <Box className="App">
            <BrowserRouter>
            <Routes>
                <Route path='*' element={<Signin/>}/>
                <Route path='/login' element={<Signin/>}/>
                <Route path='/register' element={<Signup/>}/>
                <Route path='/dashboard' element={ <PrivateRoute isLogged={isLogged}><Dashboard/></PrivateRoute>}/>
            </Routes>
            </BrowserRouter>
        </Box>
    )
}
