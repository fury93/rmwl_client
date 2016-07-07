import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    recoveryPassword,
    changeRecoveryPassStatus,
    RECOVERY_PASS_FAILURE,
    RECOVERY_PASS_SUCCESS
} from '../../actions/auth';
import { Router, Route, Link, browserHistory } from 'react-router'

class RecoveryPassword extends Component {

/*    componentWillReceiveProps(nextProps) {
        const {recoveryPassword} = nextProps;
        if (recoveryPassword && recoveryPassword.status === RECOVERY_PASS_SUCCESS) {
            this.context.router.replace('/');
         }
    }*/

    sendEmail = (event) => {
        event.preventDefault();
        const email = this.refs.email.value;
        if (email) {
            this.props.dispatch(recoveryPassword(email));
        } else {
            this.props.dispatch(changeRecoveryPassStatus(RECOVERY_PASS_FAILURE, 'Email can\'t be empty'));
        }
    };

    render() {
        const { recoveryPassword } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">

                                        <form className="form">
                                            <fieldset>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-envelope color-blue"></i>
                                                        </span>

                                                        <input className="form-control"
                                                               id="emailInput"
                                                               placeholder="email address"
                                                               type="email"
                                                               ref="email"
                                                        />
                                                    </div>
                                                </div>

                                                {
                                                    recoveryPassword.msg &&
                                                    recoveryPassword.status === RECOVERY_PASS_SUCCESS &&
                                                    <div className="alert alert-danger">
                                                        {recoveryPassword.msg}
                                                    </div>
                                                }

                                                {
                                                    recoveryPassword.msg &&
                                                    recoveryPassword.status === RECOVERY_PASS_SUCCESS &&
                                                    <div className="alert alert-success">
                                                        {recoveryPassword.msg}
                                                    </div>
                                                }

                                                <div className="form-group">
                                                    <input className="btn btn-lg btn-primary btn-block"
                                                           value="ОК"
                                                           type="submit"
                                                           onClick={this.sendEmail}
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

RecoveryPassword.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

RecoveryPassword.propTypes = {
    recoveryPassword: PropTypes.object
};

function mapStateToProps(state) {
    return {recoveryPassword: state.auth.recoveryPassword};
}

export default connect(mapStateToProps)(RecoveryPassword);
