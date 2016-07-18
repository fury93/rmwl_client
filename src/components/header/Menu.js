import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import { Link, IndexLink } from 'react-router';
import { browserHistory } from 'react-router';
import 'rc-menu/assets/index.css';
import animate from 'css-animation';
import './header.css';

const USER_LOGOUT_KEY = 'user-logout';

export class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: []
        }
    }

    onClick = (info) => {
        console.log('click ', info);
        if (info.key === USER_LOGOUT_KEY) {
            this.props.handleLogout();
        } else {
            this.setState({
                openKeys: info.keyPath.slice(1)
            });
            browserHistory.push(info.key);
        }
    };

    onOpen = (info) => {
        console.log('onOpen', info);
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    };

    onClose = (info) => {
        this.onOpen(info);
    };

    getMenu = () => {
        const isUsersPage = true;
        const {user, handleLogout} = this.props;

        return (
            <Menu
                onClick={this.onClick}
                onOpen={this.onOpen}
                onClose={this.onClose}
                openKeys={this.state.openKeys}
                mode="horizontal"
                openAnimation="slide-up"
            >
                {/*<MenuItem key="home">
                 <IndexLink to="/" className="navbar-brand">
                 <div title="Home" className="brand"/>
                 Home
                 </IndexLink>
                 </MenuItem> */}
                <MenuItem key="/">HOME</MenuItem>
                <MenuItem key="/#/cheduler">SCHEDULER</MenuItem>
                <MenuItem key="/#/pos">POS</MenuItem>
                <SubMenu key="patient" title="PATIENT INTAKE">
                    <MenuItem key="/#/patient/new">NEW PATIENT</MenuItem>
                    <MenuItem key="/#/patient/returning">RETURNING</MenuItem>
                    <MenuItem key="/#/patient/lookup">LOOKUP</MenuItem>
                </SubMenu>
                <SubMenu key="intranet" title="INTRANET">
                    <MenuItem key="/#/intranet/store">STORE LOCATOR</MenuItem>
                    <MenuItem key="/#/intranet/resources">ADDITIONAL RESOURCES</MenuItem>
                </SubMenu>
                <SubMenu key="reporting" title="REPORTING">
                    <MenuItem key="/#/reporting/coupon">COUPON SUMMARY</MenuItem>
                    <MenuItem key="/#/reporting/discount">DISCOUNT</MenuItem>
                    <MenuItem key="/#/reporting/product">PRODUCT SUMMARY</MenuItem>
                    <MenuItem key="/#/reporting/referal">REFERAL</MenuItem>
                </SubMenu>
                <SubMenu key="inventory" title="INVENTORY">
                    <MenuItem key="/inventory/products">PRODUCT MANAGEMENT</MenuItem>
                    <MenuItem key="/inventory/vendors">VENDOR MANAGEMENT</MenuItem>
                    <MenuItem key="/#/inventory/forecasting">FORECASTING</MenuItem>
                </SubMenu>
                <SubMenu key="admin" title="ADMIN">
                    <MenuItem key="/admin/users">USER CREATION</MenuItem>
                    <MenuItem key="/admin/roles">USER ROLE CREATION</MenuItem>
                    <MenuItem key="/admin/users-permission">USERS PERMISSION</MenuItem>
                    <MenuItem key="/#/admin/service">ADD SERVICE</MenuItem>
                    <MenuItem key="/#/admin/coupon">COUPON CREATION</MenuItem>
                    <MenuItem key="/#/admin/referral">REFERRAL CREATION</MenuItem>
                    <MenuItem key="/#/admin/discount">DISCOUNT CREATION</MenuItem>
                </SubMenu>

                <SubMenu key="user" title={user} className="menu-logout">
                    <MenuItem key={USER_LOGOUT_KEY}>LOGOUT</MenuItem>
                </SubMenu>
            </Menu>
        );
    };

    render() {
        return (<div>
            {this.getMenu()}
        </div>);
    }
}

UserMenu.propTypes = {
    user: React.PropTypes.string.isRequired,
    handleLogout: React.PropTypes.func.isRequired
};
