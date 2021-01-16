import React, {useContext, useState} from "react";
import {Paragraph, Heading} from "evergreen-ui";
import {Button, Paper, Container} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import {FirebaseContext} from "../context/FirebaseContext";
import {useHistory} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Emoji from "../components/Emoji";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        elevation: 3,
        padding: "5%",
        backgroundColor: "#1070CA",
    },
    alert: {
        width: "100%"
    },
    form: {
        width: "100%",
    }
}));

const EmailVerificationLayout = () => {
    const classes = useStyles();
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [sentEmail, setSentEmail] = useState(false);

    const successVerification = () => {
        return (
            <Button
                color="primary"
                onClick={(e) => {
                    history.push(ROUTES.HOME);
                }}
            >
                {"Let's get some work done!"}
            </Button>
        );
    };

    const askVerification = () => {
        return (
            <div>
                <Heading>
                    {"Verify your email address"}
                </Heading>
                <Paragraph
                    style={{
                        textAlign: "center",
                    }}
                >
                    {"Please confirm that you want to use this as your Get it done account." +
                        " Once its done, you'll be able to get your work done!"}
                </Paragraph>

                {sentEmail ? (
                    <Paragraph
                        style={{
                            marginBottom: "5%",
                        }}
                    >
                        {"Check your email, verify and refresh"}
                    </Paragraph>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            firebaseContext
                                .sendVerificationEmail()
                                .then((result) => {
                                    console.log(result);
                                    setSentEmail(true);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        {"Send Verification"}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <Container component="main" className={classes.root}>
        <CssBaseline />
            <Paper
                style={{
                    marginBottom: "5%",
                }}
            >
                <Heading size={900}>
                    Get it Done <Emoji symbol={"🔥"} label={"fire"} />
                </Heading>
            </Paper>
            {firebaseContext.initialUserState.emailVerified
                ? successVerification
                : askVerification(firebaseContext)}

            <Button
                onClick={(e) => {
                    firebaseContext.signOut();
                    history.push(ROUTES.SIGN_IN);
                }}
            >
                {"Cancel"}
            </Button>
        </Container>
    );
};

export default EmailVerificationLayout;
