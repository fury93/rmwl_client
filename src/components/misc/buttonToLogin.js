import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class ButtonToLogin extends Component {
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

ButtonToLogin.propTypes = {
    value: PropTypes.string.isRequired
};

export default ButtonToLogin;
