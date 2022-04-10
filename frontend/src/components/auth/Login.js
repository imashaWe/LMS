import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {Alert} from "@mui/material";
import {Link} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {handleSubmit, control} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>

                        <Controller
                            name="userName"
                            control={control}
                            defaultValue=""
                            rules={{required: 'User Name required'}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    label="User Name"
                                    margin="normal"
                                    required
                                    fullWidth
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Password required'}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    label="Password"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="password"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <Controller
                            name="isRemember"
                            control={control}
                            render={({field}) =>
                                <FormControlLabel
                                    label="Remember me"
                                    control={<Checkbox {...field} color="primary"/>}
                                />
                            }
                        />

                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            loading={loading}
                        >
                            Log In
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/signup">
                                    <Typography variant="body2">
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    <Typography variant="body2">
                                        Don't have an account? Sign Up
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}