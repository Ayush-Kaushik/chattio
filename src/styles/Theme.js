import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const PRIMARY_COLOR = "#1070CA";
const PRIMARY_COLOR_DARK = "#47B881";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR
        },
        secondary: {
            main: PRIMARY_COLOR_DARK
        }
    },
    typography: {
        h3 : {
            fontSize: '2.5rem'
        },
        '@media (min-width:600px)': {
            fontSize: '2.5rem',
        }
    }
});

export default theme;