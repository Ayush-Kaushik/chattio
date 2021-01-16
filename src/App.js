import React, {useContext} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/Sidebar";
import ProfileLayout from "./layout/ProfileLayout";
import {FirebaseContext} from "./context/FirebaseContext";
import TaskCollectionLayout from "./layout/TaskCollectionLayout";
import EmailVerificationLayout from "./layout/EmailVerificationLayout";
import "./App.css";
import AccessLayout from "./layout/AccessLayout";

const showSideBar = (initialUserState) => {
    if (initialUserState) {
        return initialUserState.emailVerified === true ? <SideBar/> : <></>;
    }

    return <></>;
};

function App() {
    const firebaseContext = useContext(FirebaseContext);

    return (
        <div>
            <Router>
                {showSideBar(firebaseContext.initialUserState)}
                <Route exact path={ROUTES.SIGN_UP} render={
                    (props) => (
                        <AccessLayout {...props} accessType={ROUTES.SIGN_UP} />
                    )
                }/>

                <Route exact path={ROUTES.SIGN_IN} render={
                    (props) => (
                        <AccessLayout {...props} accessType={ROUTES.SIGN_IN} />
                    )
                }/>
                <Route
                    exact
                    path={ROUTES.EMAIL_VERIFICATION}
                    component={EmailVerificationLayout}
                />
                <PrivateRoute
                    exact
                    path={ROUTES.HOME}
                    component={TaskCollectionLayout}
                />
                <PrivateRoute
                    exact
                    path={ROUTES.LANDING}
                    component={TaskCollectionLayout}
                />
                <PrivateRoute
                    exact
                    path={ROUTES.PROFILE}
                    component={ProfileLayout}
                />
            </Router>
        </div>
    );
}

export default App;
