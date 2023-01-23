import { createTheme } from "@mui/material"
import "@mui/material/styles/createPalette"

enum ThemeBreakpoints {
    xl = 1920,
    lg = 1200,
    md = 900,
    sm = 600,
    xs = 0,
}
enum Colors {
    white = "#fff",
    black = "#000",
    primary = "#1d2d4a",
    secondary = "#ff5806",
    error = "#ec5858",
    success = "#5bd098",
    beluga = "#f1f1f1",
    monument = "#858b8c",
    disabled = "#d9dcdc",
    textPrimary = "#444040",
}

export const theme = createTheme({
    palette: {
        common: {
            white: Colors.white,
            black: Colors.black,
        },
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
        error: {
            main: Colors.error,
        },
        success: {
            main: Colors.success,
        },
        complementary: {
            beluga: {
                main: Colors.beluga,
            },
            monument: {
                main: Colors.monument,
            },
        },
        disabled: {
            main: Colors.disabled,
        },
        text: {
            primary: Colors.textPrimary,
        },
        action: {
            disabled: undefined,
        },
    },
    typography: {
        fontFamily: "Inter",
        body1: {
            fontSize: "1.6rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "1.4rem",
            },
        },
        body2: {
            fontSize: "1.4rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "1.2rem",
            },
        },
        button: {
            fontSize: "1.6rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "1.4rem",
            },
        },
        caption: {
            fontSize: "1.2rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "1.0rem",
            },
        },
        h1: {
            fontSize: "2.4rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "2.2rem",
            },
        },
        h2: {
            fontSize: "2.2rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "2.0rem",
            },
        },
        h3: {
            fontSize: "2.0rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "1.8rem",
            },
        },
        h4: {
            fontSize: "1.8rem",
            [`@media (max-width:${ThemeBreakpoints.md}px)`]: {
                fontSize: "1.6rem",
            },
        },
        h5: undefined,
        h6: undefined,
        overline: undefined,
        subtitle1: undefined,
        subtitle2: undefined,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            * {
                margin: 0;
                padding:0;
                box-sizing: border-box;
            }
            html {
                font-size: 62.5%;
            }
            `,
        },
        MuiButton: {
            defaultProps: {
                variant: "primary",
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: theme.typography.button.fontSize,
                    textTransform: "none",
                    height: "38px",
                    borderRadius: 6,
                }),
            },
            variants: [
                {
                    props: {
                        variant: "primary",
                    },
                    style: ({ theme }) => ({
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        ":hover": {
                            background: theme.palette.secondary.main,
                        },
                    }),
                },
                {
                    props: {
                        variant: "primary",
                        disabled: true,
                    },
                    style: ({ theme }) => ({
                        backgroundColor: theme.palette.disabled.main,
                        color: theme.palette.common.white,
                    }),
                },
                {
                    props: {
                        variant: "secondary",
                    },
                    style: ({ theme }) => ({
                        color: theme.palette.primary.main,
                        ":hover": {
                            background: theme.palette.secondary.main,
                            color: theme.palette.common.white
                        }
                    }),
                },
                {
                    props: {
                        variant: "secondary",
                        disabled: true,
                    },
                    style: ({ theme }) => ({
                        color: theme.palette.disabled.main,
                    }),
                },
            ],
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ theme }) => ({
                    fontSize: theme.typography.caption.fontSize,
                }),
            },
        },
    },
})
