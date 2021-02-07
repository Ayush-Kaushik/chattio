import React, {useState, useContext} from "react";
import * as ROUTES from "../constants/routes";
import {Person, Power} from "@material-ui/icons";
import {FirebaseContext} from "../context/FirebaseContext";
import {useHistory} from "react-router-dom";
import ListCollectionLayout from "../layout/ListCollectionLayout";
import NewList from "../components/NewList";
import MenuIcon from "@material-ui/icons/Menu";

import {
    IconButton,
    Toolbar,
    AppBar,
    CssBaseline,
    Drawer,
    List,
    Divider,
    Typography,
    Button,
    Icon,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 36,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const SideBar = () => {
    const firebaseContext = useContext(FirebaseContext);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const topBarContent = [
        {
            label: "Profile",
            path: ROUTES.PROFILE,
            icon: <Person />,
            action: () => {
                history.push(ROUTES.PROFILE);
            },
        },
        {
            label: "SignOut",
            path: ROUTES.PROFILE,
            icon: <Power />,
            action: () => {
                firebaseContext.signOut();
            },
        },
    ];

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Task Lists
                    </Typography>

                    {topBarContent.map((item, index) => (
                        <Button color="inherit" key={item.label} onClick={item.action}>
                            <Icon>{item.icon}</Icon>
                            {item.label}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer} className={classes.drawer}>
                <ListCollectionLayout />
                <ListItem>
                    <NewList />
                </ListItem>
            </Drawer>
        </div>
    );
};

export default SideBar;
