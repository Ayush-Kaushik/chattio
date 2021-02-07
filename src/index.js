import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ToDoProvider} from "./context/ToDoContext";
import {BrowserRouter as Router, Route, useLocation} from "react-router-dom";
import {FirebaseProvider} from "./context/FirebaseContext";
import * as serviceWorker from "./serviceWorker";
import {FireStoreProvider} from "./context/FireStoreContext";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./styles/Theme";
import DayjsUtils from "@date-io/dayjs";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

ReactDOM.render(
    <React.StrictMode>
        <FirebaseProvider>
            <FireStoreProvider>
                <ToDoProvider>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                        <ThemeProvider theme={theme}>
                            <Router>
                                <App />
                            </Router>
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </ToDoProvider>
            </FireStoreProvider>
        </FirebaseProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
