import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {Alert} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FormContainer, PasswordElement, TextFieldElement} from "react-hook-form-mui";
import axios from 'axios';
import {useSignIn} from 'react-auth-kit'
import {parseApiUrl, parseMessage} from "../../helpers/functions";
import jwt_decode from "jwt-decode";
import CopyrightView from "../common/CopyrightView";

const theme = createTheme();

export default function Login() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const signin = useSignIn();
    const navigate = useNavigate();
    const {redirect} = useParams();


    const onSubmit = (data) => {
        setLoading(true);
        setError(false);
        axios.post(parseApiUrl('auth/login'), data)
            .then((r) => {
                let tokenData = jwt_decode(r.data.token);
                signin({
                    token: r.data.token,
                    expiresIn: tokenData.exp,
                    tokenType: "Bearer",
                    authState: r.data.user,
                });
                if (redirect) {
                    navigate(redirect)
                } else {
                    navigate("/")
                }
            })
            .catch((e) => setError(parseMessage(e)))
            .finally(() => setLoading(false));
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

                    <FormContainer onSuccess={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextFieldElement fullWidth name={"username"} type={"email"} required/>
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordElement fullWidth name={"password"} required/>
                            </Grid>
                        </Grid>

                        {error && (
                            <Alert severity="error" sx={{marginTop: 2}}>{error}</Alert>
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

                    </FormContainer>

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
                <CopyrightView sx={{mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}