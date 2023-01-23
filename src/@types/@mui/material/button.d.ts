import "@mui/material/Button"

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        contained: false
        outlined: false
        text: false
        primary: true
        secondary: true
    }
}
