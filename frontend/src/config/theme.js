import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3c3c3c',
        },
        secondary: {
            main: 'rgb(220, 0, 78)',
        },
        background: {
            default: '#fff',
            paper: '#fff',
        },
    },
});