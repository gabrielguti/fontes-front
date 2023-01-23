import "@mui/material/styles"

declare module "@mui/material/styles" {
    interface Palette {
        complementary: {
            beluga: Palette["primary"]
            monument: Palette["primary"]
        }
        disabled: Palette["primary"]
    }

    interface PaletteOptions {
        complementary: {
            beluga: PaletteOptions["primary"]
            monument: PaletteOptions["primary"]
        }
        disabled: PaletteOptions["primary"]
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        overline: false
        subtitle1: false
        subtitle2: false
        h5: false
        h6: false
    }
}
