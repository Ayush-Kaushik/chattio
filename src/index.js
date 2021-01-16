import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ToDoProvider} from "./context/ToDoContext";
import {FirebaseProvider} from "./context/FirebaseContext";
import * as serviceWorker from "./serviceWorker";
import {FireStoreProvider} from "./context/FireStoreContext";
import {ThemeProvider} from "@material-ui/core/styles";
import theme from "./styles/Theme";

ReactDOM.render(
    <React.StrictMode>
        <FirebaseProvider>
            <FireStoreProvider>
                <ToDoProvider>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </ToDoProvider>
            </FireStoreProvider>
        </FirebaseProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

serviceWorker.unregister();
