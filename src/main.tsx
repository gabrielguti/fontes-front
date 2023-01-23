import { CssBaseline, ThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { App } from "./App"
import { AuthProvider } from "./contexts/AuthContext"

import { theme } from "./styles/theme"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ToastContainer position="top-center" autoClose={2000} />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
)
