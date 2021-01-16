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
import Emoji from "./Emoji";

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
        width: "100%",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInForm() {
    const classes = useStyles();
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        isError: null,
        message: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        firebaseContext.signInWithEmailAndPassword(
            username,
            password,
        ).then(authState => {
            if (authState.user) {
                if (authState.user.emailVerified) {
                    history.push(ROUTES.HOME);
                } else {
                    history.push(ROUTES.EMAIL_VERIFICATION);
                }
            } else {
                history.push(ROUTES.SIGN_IN);
            }

        }).catch(error => {
            switch (error.code) {
                default:
                    console.log("Set Error is called");
                    setErrors((prevState) => ({
                        ...prevState,
                        isError: true,
                        message: error.message,
                    }));
                    break;
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            {console.log("signInForm called inside render method!")}
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Get It Done <Emoji symbol={"✍🏼"} label={"fire"}/>
                </Typography>
                {console.log(errors.message)}
                {errors.message.length > 0 ?  
                    <Alert className={classes.alert} severity="error" >{errors.message}</Alert> : 
                    ""
                }
               
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={LABELS.USERNAME}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        onChange={(e) => {

                            console.log("Username onChange");

                            // problem - this calls useEffect even when there is no state change
                            setErrors((prevState) => ({
                                ...prevState,
                                message: ""
                            }));
                            
                            setUsername(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setErrors((prevState) => ({
                                ...prevState,
                                message: ""
                            }));
                            setPassword(e.target.value);
                        }}
                    />
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
                        {"Sign In"}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="body2" onClick={() => history.push(ROUTES.SIGN_UP)}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}