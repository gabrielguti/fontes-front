import { defineConfig } from "cypress"

export default defineConfig({
    viewportWidth: 1366,
    viewportHeight: 768,
    e2e: {
        baseUrl: "http://localhost:3000",
    },
    env: {
        REACT_APP_API_URL: "https://manager-link-teste.alibin.io",
        DEFAULT_LINK_PATHNAME: "/link/teste",
    },
    video: false,
})
