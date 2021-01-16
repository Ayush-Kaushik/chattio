import React, { useContext, useEffect } from "react";
import { FireStoreContext } from "../context/FireStoreContext";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {List} from '@material-ui/icons';

const ListCollectionLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);
    const fireBaseContext = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        if (fireBaseContext.initialUserState) {
            fireStoreContext.streamList();
        }
    }, []);

    return (
        <>
            {fireStoreContext.initialStore.list.map((item) => {
                return (
                    <ListItem
                        key={item.id}
                        onClick={() => {
                            fireStoreContext.streamListTasks(item.id);
                            history.push(ROUTES.HOME);
                        }}
                    >
                        <ListItemIcon><List /></ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                );
            })}
        </>
    );
};

export default ListCollectionLayout;
