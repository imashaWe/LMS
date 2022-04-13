import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FormContainer, PasswordElement, SelectElement, TextFieldElement} from "react-hook-form-mui";
import {Alert} from "@mui/material";
import {useApi} from "../../helpers/hookes/useApi";
import axios from "axios";
import {parseApiUrl, parseMessage} from "../../helpers/functions";
import {useSignIn} from "react-auth-kit";
import jwt_decode from "jwt-decode";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="https://mui.com/">
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
    const signin = useSignIn();
    const navigate = useNavigate();
    const {redirect} = useParams();

    const onSubmit = (data) => {
        if (data.password !== data.passwordConfirm) {
            setError("Password and confirm password does not match.");
            return;
        }
        setLoading(true);
        setError(null);
        axios.post(parseApiUrl(`auth/signup/${data[`accountType`]}`), data)
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
                        Sign up
                    </Typography>

                    <FormContainer onSuccess={onSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={6}>
                                <TextFieldElement fullWidth name={"firstName"} label={"First Name"} required/>
                            </Grid>

                            <Grid item xs={6}>
                                <TextFieldElement fullWidth name={"lastName"} label={"Last Name"} required/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldElement fullWidth name={"email"} label={"Email"} type={"email"} required/>
                            </Grid>

                            <Grid item xs={12}>
                                <SelectElement
                                    fullWidth
                                    name={"accountType"}
                                    label={"Register As"}
                                    required
                                    options={[
                                        {id: 'student', title: 'Student'},
                                        {id: 'lecturer', title: 'Lecturer'},
                                    ]}/>
                            </Grid>

                            <Grid item xs={12}>
                                <PasswordElement fullWidth name={"password"} label={"Password"} required/>
                            </Grid>

                            <Grid item xs={12}>
                                <PasswordElement fullWidth name={"passwordConfirm"}
                                                 label={"Password Confirmation"}
                                                 type={"password"}
                                                 required/>
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
                            Create Account
                        </LoadingButton>

                    </FormContainer>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">
                                <Typography variant="body2">Already have an account? Sign in</Typography>
                            </Link>

                        </Grid>
                    </Grid>

                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}