import React, { useState, useContext } from "react";
import * as ROUTES from "../constants/routes";
import { PersonIcon, PowerIcon } from "evergreen-ui";
import { FirebaseContext } from "../context/FirebaseContext";
import { useHistory } from "react-router-dom";
import ListCollectionLayout from "../layout/ListCollectionLayout";
import NewList from "../components/NewList";

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const SideBar = ({ children }) => {
    const firebaseContext = useContext(FirebaseContext);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();

    const toggleDrawer = () => {
        setOpen(!open);
    }


    const sideBarContent = [
        {
            label: "Profile",
            path: ROUTES.PROFILE,
            icon: <PersonIcon />,
            action: () => {
                toggleDrawer();
                history.push(ROUTES.PROFILE);
            }
        },
        {
            label: "SignOut",
            path: ROUTES.PROFILE,
            icon: <PowerIcon />,
            action: () => {
                toggleDrawer();
                firebaseContext.signOut();
            }
        },
    ];

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer} className={classes.drawer}>
                <List>
                    {
                        sideBarContent.map((item, index) => (
                            <ListItem button key={item.label} onClick={item.action}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <ListCollectionLayout />
                <ListItem>
                    <NewList />
                </ListItem>

            </Drawer>
        </div>
    );
};

export default SideBar;
