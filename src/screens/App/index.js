import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import { logoutUser } from '../../components/user/actions/logout'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ProductIcon from '@material-ui/icons/ShoppingCart';
import ProductAddIcon from '@material-ui/icons/AddShoppingCart';
import PartnerIcon from '@material-ui/icons/Group';
import PartnerAddIcon from '@material-ui/icons/GroupAdd';
import SupplierIcon from '@material-ui/icons/Person';
import SupplierAddIcon from '@material-ui/icons/PersonAdd';
import NoteLogIcon from '@material-ui/icons/EventNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

let styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "linear-gradient(160deg, #373990 0%, #F25232 100%)",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
})

class App extends Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    
    render() {
        const { classes, theme } = this.props;

        const OnlyAuthLinks = VisibleOnlyAuth(() =>
            <span>
                <li className="pure-menu-item">
                    <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/profile" className="pure-menu-link">Profile</Link>
                </li>
            </span>
        )

        const OnlyGuestLinks = HiddenOnlyAuth(() =>
            <span>
                <li className="pure-menu-item">
                    <Link to="/signup" className="pure-menu-link">Sign Up</Link>
                </li>
            </span>
        )

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}>
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                            Merchandise Check
                        </Typography>
                        <div>
                            <IconButton color="inherit" onClick={this.props.onClickSignout}>
                                <ExitToAppIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <List
                        component="nav"
                        // subheader={<ListSubheader component="div">Suppliers</ListSubheader>}
                    >
                        <ListItem button onClick={()=>browserHistory.push('/app/suppliers')}>
                        <ListItemIcon><SupplierIcon /></ListItemIcon>
                            <ListItemText primary="Suppliers" />
                        </ListItem>
                        <ListItem button onClick={()=>browserHistory.push('/app/suppliers/add')}>
                        <ListItemIcon><SupplierAddIcon /></ListItemIcon>
                            <ListItemText primary="Add a supplier" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        component="nav"
                        // subheader={<ListSubheader component="div">Products</ListSubheader>}
                    >
                        <ListItem button onClick={()=>browserHistory.push('/app/products')}>
                            <ListItemIcon><ProductIcon /></ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItem>
                        <ListItem button onClick={()=>browserHistory.push('/app/products/add')}>
                            <ListItemIcon><ProductAddIcon /></ListItemIcon>
                            <ListItemText primary="Add a product" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        component="nav"
                        // subheader={<ListSubheader component="div">Suppliers</ListSubheader>}
                    >
                        <ListItem button onClick={()=>browserHistory.push('/app/partner')}>
                        <ListItemIcon><PartnerIcon /></ListItemIcon>
                            <ListItemText primary="Partner" />
                        </ListItem>
                        <ListItem button onClick={()=>browserHistory.push('/app/partner/add')}>
                        <ListItemIcon><PartnerAddIcon /></ListItemIcon>
                            <ListItemText primary="Add a partner" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List
                        component="nav"
                        // subheader={<ListSubheader component="div">Suppliers</ListSubheader>}
                    >
                        <ListItem button onClick={()=>browserHistory.push('/app/log')}>
                        <ListItemIcon><NoteLogIcon /></ListItemIcon>
                            <ListItemText primary="Note log merchandises" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
    onClickSignout: (event)=>{
        event.preventDefault();
        dispatch(logoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(App))