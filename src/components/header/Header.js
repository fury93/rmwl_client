import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import './header.css';

export default class Header extends Component {
    onLogoutClick(event) {
        event.preventDefault();
        this.props.handleLogout();
    }

    render() {
        const { user } = this.props;
        const pathname = this.props.location.pathname;
        const isLoginPage = pathname.indexOf('login') > -1;
        const isUsersPage = pathname.indexOf('users') > -1;
        const isReposPage = pathname.indexOf('repos') > -1;
        const isUserList = pathname.indexOf('users-list') > -1;
        const isProductsPage = pathname.indexOf('products') > -1;

        return (
            !isLoginPage &&
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <IndexLink to="/" className="navbar-brand">
                                <div title="Home" className="brand"/>
                                Home
                            </IndexLink>

                            <ul className="nav navbar-nav">
                                <li title="Github Users with over 1000 Followers"
                                    className={isUsersPage ? 'nav-item active' : 'nav-item'}>
                                    <Link className="nav-link" to="/users">Most Followed Users</Link>
                                </li>
                                <li title="Github Repos with over 10000 Stars"
                                    className={isReposPage ? 'nav-item active' : 'nav-item'}>
                                    <Link className="nav-link" to="/repos">Most Starred Repos</Link>
                                </li>
                                <li title="Users List"
                                    className={isUserList ? 'nav-item active' : 'nav-item'}>
                                    <Link className="nav-link" to="/users-list">Users List</Link>
                                </li>
                                <li title="Products"
                                    className={isProductsPage ? 'nav-item active' : 'nav-item'}>
                                    <Link className="nav-link" to="/products">Products</Link>
                                </li>
                             </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown nav-item">
                                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"
                                       role="button" aria-haspopup="true" aria-expanded="false">
                                        <span className="fa fa-user header_fa"></span>{user || 'Anonymous'}<span
                                        className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={ event => this.onLogoutClick(event)}>
                                                <i className="fa fa-sign-out header_fa"/>Log out
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.string,
    handleLogout: PropTypes.func.isRequired,
    location: React.PropTypes.object
};
