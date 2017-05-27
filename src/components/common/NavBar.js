/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



class NavBar extends React.Component {
    constructor(){
        super();

        this.state = {
            open: false
        }
    }
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render(){
        return (
            <div>
                <AppBar
                    title="Reto Zapopan"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <Toolbar style={{backgroundColor:'red'}}>
                        <ToolbarTitle text="Menú" />
                    </Toolbar>
                    <Link to="/">
                        <MenuItem onTouchTap={this.handleClose}>Inicio</MenuItem>
                    </Link>
                    <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }

}

NavBar.propTypes = {};

export default NavBar;