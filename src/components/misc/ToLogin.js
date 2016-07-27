import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class ToLogin extends Component {
    goToLogin = () => {
        browserHistory.push('/login');
    };

    render() {
        const {value} = this.props;

        return (
            <div className="form-group">
                <input className="btn btn-lg btn-success btn-block"
                       value={value}
                       type="submit"
                       onClick={this.goToLogin}
                />
            </div>
        );
    }
}

ToLogin.propTypes = {
    value: PropTypes.string.isRequired
};

export default ToLogin;
