import React, {useContext} from "react";
import {BrowserRouter as Router, Route, useLocation} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/Sidebar";
import ProfileLayout from "./layout/ProfileLayout";
import {FirebaseContext} from "./context/FirebaseContext";
import TaskCollectionLayout from "./layout/TaskCollectionLayout";
import EmailVerificationLayout from "./layout/EmailVerificationLayout";
import "./App.css";
import AccessLayout from "./layout/AccessLayout";

const showSideBar = (initialUserState, pathname) => {
    let shouldShow = true;
    switch (pathname) {
        case ROUTES.SIGN_IN:
        case ROUTES.SIGN_UP:
        case ROUTES.EMAIL_VERIFICATION:
            shouldShow = false;
            break;

        default:
            shouldShow = true;
            break;
    }

    return initialUserState !== null && initialUserState.emailVerified && shouldShow ? (
        <SideBar />
    ) : (
        <></>
    );
};

function App() {
    const location = useLocation();
    const firebaseContext = useContext(FirebaseContext);

    return (
        <div>
            {showSideBar(firebaseContext.initialUserState, location.pathname)}
            <Route
                exact
                path={ROUTES.SIGN_UP}
                render={(props) => (
                    <AccessLayout {...props} accessType={ROUTES.SIGN_UP} />
                )}
            />

            <Route
                exact
                path={ROUTES.SIGN_IN}
                render={(props) => (
                    <AccessLayout {...props} accessType={ROUTES.SIGN_IN} />
                )}
            />
            <Route
                exact
                path={ROUTES.EMAIL_VERIFICATION}
                component={EmailVerificationLayout}
            />

            <PrivateRoute exact path={ROUTES.HOME} component={TaskCollectionLayout} />
            <PrivateRoute exact path={ROUTES.LANDING} component={TaskCollectionLayout} />
            <PrivateRoute exact path={ROUTES.PROFILE} component={ProfileLayout} />
        </div>
    );
}

export default App;
