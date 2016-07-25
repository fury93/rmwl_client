import React, { Component, PropTypes } from 'react';
import {
    AUTH_SUCCESS,
} from '../../actions/auth';
import './footer.css';

export default class Footer extends Component {
    render() {
        const {auth} = this.props;
        const isUserAuth = auth.authStatus === AUTH_SUCCESS;

        if (!isUserAuth) {
            return null;
        }

        return (
            <div>
                {isUserAuth &&
                <footer className="footer">
                    <p className="text-xs-center text-center">
                        RMWL {new Date().getFullYear()}
                    </p>
                </footer>
                }
            </div>
        );
    }
}

Footer.propTypes = {
    auth: PropTypes.object.isRequired
};



