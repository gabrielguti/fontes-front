import { Button as MuiButton, CircularProgress, useTheme } from "@mui/material"
import { ButtonProps } from "./Button.schema"

export const Button = ({ loading = false, children, ...rest }: ButtonProps) => {
    const { palette } = useTheme()

    return (
        <MuiButton {...rest} disabled={loading}>
            {!loading ? (
                children
            ) : (
                <CircularProgress
                    size={24}
                    sx={{
                        color: palette.primary.main,
                    }}
                />
            )}
        </MuiButton>
    )
}
