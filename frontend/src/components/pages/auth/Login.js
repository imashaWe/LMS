import {useState} from "react";
import {Avatar, Alert, Link, CssBaseline, Grid, Box, Typography, Container} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate, useParams} from "react-router-dom";
import {FormContainer, PasswordElement, TextFieldElement} from "react-hook-form-mui";
import axios from 'axios';
import {useSignIn} from 'react-auth-kit';
import jwt_decode from "jwt-decode";
import CopyrightView from "../../common/CopyrightView";
import {parseApiUrl, parseMessage} from "../../../helpers/functions";
import {useAppMessage} from "../../../providers/AppMessage";
import useQuery from "../../../helpers/hookes/useQuery";

export default function Login() {
    const appMessage = useAppMessage();
    const [loading, setLoading] = useState(false);
    const signin = useSignIn();
    const navigate = useNavigate();
    const query = useQuery();

    const onSubmit = (data) => {
        setLoading(true);
        appMessage.clear();
        axios.post(parseApiUrl('auth/login'), data)
            .then((r) => {
                const tokenData = jwt_decode(r.data.token);
                signin({
                    token: r.data.token,
                    expiresIn: tokenData.exp,
                    tokenType: "Bearer",
                    authState: r.data,
                });
                navigate(query.get("redirect") ?? "/");
            })
            .catch((e) => appMessage.setError(e))
            .finally(() => setLoading(false));
    }

    return (

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
                <img style={{height:"170px"}} src="/asset/images/login.svg"/>
                <Typography component="h1" variant="h5">
                    LOGIN
                </Typography>

                <FormContainer onSuccess={onSubmit}>
                    <Grid container spacing={2} marginY={1}>
                        <Grid item xs={12}>
                            <TextFieldElement fullWidth name={"username"} type={"email"} required/>
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordElement fullWidth name={"password"} required/>
                        </Grid>
                    </Grid>

                    {appMessage.error && (
                        <Alert severity="error" sx={{marginTop: 2}}>{appMessage.error}</Alert>
                    )}

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        loading={loading}
                    >
                        LOGIN
                    </LoadingButton>

                </FormContainer>

                <Grid container>
                    <Grid item xs>
                        <Link href="/signup">
                            <Typography variant="body2">
                                Forgot password?
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup">
                            <Typography variant="body2">
                                Don't have an account? Sign Up
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

            </Box>
            <CopyrightView sx={{mb: 4}}/>
        </Container>
    );
}