import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "@mui/material";
import {Link} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link  to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'First name required'}}
                                    render={({field: {onChange, value}, fieldState: {error}}) => (<TextField
                                        fullWidth
                                        label="First Name"
                                        autoFocus
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'Last name required'}}
                                    render={({field: {onChange, value}, fieldState: {error}}) => (<TextField
                                        fullWidth
                                        label="Last Name"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'Email required'}}
                                    render={({field: {onChange, value}, fieldState: {error}}) => (<TextField
                                        fullWidth
                                        label="Email"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'password required'}}
                                    render={({field: {onChange, value}, fieldState: {error}}) => (<TextField
                                        fullWidth
                                        label="Password"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="passwordConfirm"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: 'Password Confirmation required'}}
                                    render={({field: {onChange, value}, fieldState: {error}}) => (<TextField
                                        fullWidth
                                        label="Password Confirmation"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        value={value}
                                        onChange={onChange}
                                    />)}
                                />
                            </Grid>
                        </Grid>

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
                            Create Account
                        </LoadingButton>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    <Typography variant="body2">Already have an account? Sign in</Typography>
                                </Link>

                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    )
        ;
}