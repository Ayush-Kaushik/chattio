import React, {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link, Paper} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {FirebaseContext} from "../context/FirebaseContext";
import {useHistory} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/labels";
import Emoji from "../components/Emoji";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        elevation: 3,
        padding: "5%",
    },
    alert: {
        width: "100%"
    },
    form: {
        width: "100%"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpForm() {
    const classes = useStyles();
    const history = useHistory();
    const firebaseContext = useContext(FirebaseContext);

    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        message: ""
    });

    const onSubmit = (e) => {
        /**
         * check the newPassword and confirmPassword in the context
         */
        e.preventDefault();
        firebaseContext.createUserWithEmailAndPassword(
            username,
            newPassword
        ).then(authState => {
            if (!firebaseContext.initialUserState.email_verified) {
                history.push(ROUTES.EMAIL_VERIFICATION);
            }

            history.push(ROUTES.HOME);
        }).catch(error => {
            switch (error.code) {
                default:
                    console.log(error.code);
                    setErrors((prevState) => ({
                        ...prevState,
                        message: error.message
                    }));
                    break;
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Sign up <Emoji symbol={"✍🏼"} label={"writing"}/>
                </Typography>
                {errors.message.length > 0 ?  
                    <Alert className={classes.alert} severity="error" >{errors.message}</Alert> : 
                    ""
                }
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {console.log(errors.username)}
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={LABELS.USERNAME}
                                name="email"
                                autoComplete="email"
                                value={username}
                                onChange={(e) => {
                                    setErrors((prevState) => ({
                                        ...prevState,
                                        username: "",
                                    }));
                                    setUsername(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={LABELS.PASSWORD}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={newPassword}
                                onChange={(e) => {
                                    setErrors((prevState) => ({
                                        ...prevState,
                                        newPassword: "",
                                    }));
                                    setNewPassword(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={LABELS.CONFIRM_NEW_PASSWORD}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setErrors((prevState) => ({
                                        ...prevState,
                                        confirmPassword: "",
                                    }));
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >
                        {'Sign Up'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component="button" onClick={() => history.push(ROUTES.SIGN_IN)}>
                                {'Already have an account? Sign in'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

