import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import {
    changeUserPassword,
    changePasswordStatus,
    CHANGE_PASS_FAILURE,
    CHANGE_PASS_SUCCESS
} from '../../actions/auth';

class ChangePassword extends Component {

    componentWillReceiveProps(nextProps) {
        const {changePassword} = nextProps;
        //todo temp logic
        if (changePassword && changePassword.status === CHANGE_PASS_SUCCESS) {
            setTimeout(function () {
                this.context.router.replace('/');
            }, 2000);
        }
    }

    submitPassword = (event) => {
        event.preventDefault();
        const password1 = this.refs.password1.value;
        const password2 = this.refs.password2.value;
        var { token } = this.props.location.query;

        if (passwordValidation()) {
            this.props.dispatch(changeUserPassword(password1, token));
        } else {
            this.props.dispatch(changePasswordStatus(CHANGE_PASS_FAILURE, 'Password not correct'));
        }

        function passwordValidation() {
            return (password1 && password1 === password2);
        }

    };

    render() {
        const { changePassword } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center">Enter new password</h2>
                                    <div className="panel-body">

                                        <form className="form">
                                            <fieldset>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>

                                                        <input className="form-control"
                                                               id="new-password"
                                                               placeholder="password"
                                                               type="password"
                                                               ref="password1"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>

                                                        <input className="form-control"
                                                               id="new-password-repeat"
                                                               placeholder="repeat password"
                                                               type="password"
                                                               ref="password2"
                                                        />
                                                    </div>
                                                </div>

                                                {
                                                    changePassword.msg &&
                                                    changePassword.status === CHANGE_PASS_FAILURE &&
                                                    <div className="alert alert-danger">
                                                        {changePassword.msg}
                                                    </div>
                                                }

                                                {
                                                    changePassword.msg &&
                                                    changePassword.status === CHANGE_PASS_SUCCESS &&
                                                    <div className="alert alert-success">
                                                        {changePassword.msg}
                                                    </div>
                                                }

                                                <div className="form-group">
                                                    <input className="btn btn-lg btn-primary btn-block"
                                                           value="Change"
                                                           type="submit"
                                                           onClick={this.submitPassword}
                                                    />
                                                </div>
                                            </fieldset>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ChangePassword.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

ChangePassword.propTypes = {
    changePassword: PropTypes.object
};

function mapStateToProps(state) {
    return {changePassword: state.auth.changePassword};
}

export default connect(mapStateToProps)(ChangePassword);
