import {CssBaseline, Grid, Box, Typography, Container} from '@mui/material';
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate, useParams} from "react-router-dom";
import {FormContainer, PasswordElement, RadioButtonGroup, TextFieldElement} from "react-hook-form-mui";
import {Alert, Link} from "@mui/material";
import axios from "axios";
import {parseApiUrl, parseMessage} from "../../../helpers/functions";
import {useSignIn} from "react-auth-kit";
import jwt_decode from "jwt-decode";
import CopyrightView from "../../common/CopyrightView";
import {useAppMessage} from "../../../providers/AppMessage";
import useQuery from "../../../helpers/hookes/useQuery";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const appMessage = useAppMessage();
    const signin = useSignIn();
    const navigate = useNavigate();
    const query = useQuery();

    const onSubmit = (data) => {
        appMessage.clear();
        if (data.password !== data.passwordConfirm) {
            appMessage.setError("Password and confirm password does not match.");
            return;
        }
        setLoading(true);
        axios.post(parseApiUrl(`auth/signup/${data[`accountType`]}`), data)
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
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img style={{height:"170px"}} src="/asset/images/signup.svg"/>
                <Typography component="h1" variant="h5">
                    SIGN UP
                </Typography>

                <FormContainer onSuccess={onSubmit}>
                    <Grid container spacing={2} marginY={1}>

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
                            <RadioButtonGroup
                                fullWidth
                                name={"accountType"}
                                label={"Register As"}
                                required
                                row
                                options={[
                                    {id: 'student', label: 'Student'},
                                    {id: 'lecturer', label: 'Lecturer'},
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
                        Create Account
                    </LoadingButton>

                </FormContainer>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login">
                            <Typography variant="body2">Already have an account? Login</Typography>
                        </Link>

                    </Grid>
                </Grid>

            </Box>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                }}
            >
                <CopyrightView sx={{mt: 5}}/>
            </Box>

        </Container>
    );
}