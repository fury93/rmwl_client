import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import {UserMenu} from './Menu';
import './header.css';

export default class Header extends Component {

    render() {
        const {user, handleLogout} = this.props;
        const isUserAuth = user.user || false;
        if (!isUserAuth) {
            return null;
        }

        return (
            <div>
                {isUserAuth &&
                <UserMenu
                    user={user.user || 'Anonymous'}
                    handleLogout={handleLogout}
                />
                }
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
    location: React.PropTypes.object
};
