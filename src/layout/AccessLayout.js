import React from 'react';
import background from "../assets/images/background.jpg";
import CssBaseline from '@material-ui/core/CssBaseline';
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as ROUTES from "../constants/routes";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#1070CA",
    },
    form: {
        width: '100%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AccessLayout(props) {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    {props.accessType === ROUTES.SIGN_IN ? <SignInForm/> : <SignUpForm />}
                </div>
            </Grid>
        </Grid>
    );
}
