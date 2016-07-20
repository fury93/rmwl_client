import React, { Component, PropTypes } from 'react';
import {UserMenu} from './Menu';
import {
    AUTH_SUCCESS,
} from '../../actions/auth';
import './header.css';

export default class Header extends Component {

    render() {
        const {auth, handleLogout} = this.props;
        const isUserAuth = auth.authStatus === AUTH_SUCCESS;

        if (!isUserAuth) {
            return null;
        }

        return (
            <div>
                {isUserAuth &&
                <UserMenu
                    user={auth.user ? auth.user.user : 'Anonymous'}
                    handleLogout={handleLogout}
                />
                }
            </div>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
    location: React.PropTypes.object
};
