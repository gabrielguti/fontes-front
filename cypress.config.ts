import { defineConfig } from "cypress"

export default defineConfig({
    viewportWidth: 1366,
    viewportHeight: 768,
    e2e: {
        baseUrl: "http://localhost:5173",
    },
    env: {
        REACT_APP_API_URL: "http://localhost:3000",
    },
})
