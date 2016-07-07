import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Router, Route, Link, browserHistory } from 'react-router'

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        //this.handleLogin = this.handleLogin.bind(this);
        this.rememberChange = this.rememberChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps Login');
        if (nextProps.user) {
            // logged in, let's show redirect if any, or show home
            try {
                const redirect = this.props.location.query.redirect;
                this.context.router.replace(redirect);
            } catch (err) {
                this.context.router.replace('/');
            }
        }
    }

    //Arrow, instead bind in constructor
    handleLogin = (event) => {
        event.preventDefault();
        const username = this.refs.username;
        const password = this.refs.password;
        const rememberMe = false;//todo
        console.log('handleLogin');
        this.props.dispatch(login(username.value, password.value, rememberMe));
    };

    rememberChange() {
        debugger;
        this.props.remember = !this.props.remember;
    }

    render() {
        const { user, loginError } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h2 className="text-center">Please Log in</h2>
                                <div className="panel-body">
                                    <form className="form">

                                        <div className="form-group">
                                            <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="glyphicon glyphicon-user"/>
                                            </span>
                                                <input type="text" ref="username" className="form-control"
                                                       placeholder="Username (hint: demo)" required autoFocus/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="glyphicon glyphicon-envelope"/>
                                            </span>
                                                <input type="password" ref="password" className="form-control"
                                                       placeholder="Password (hint: demo)" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="checkbox">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                    /> Remember me
                                                </label>
                                            </div>
                                        </div>

                                        {
                                            !user && loginError &&
                                            <div className="alert alert-danger">
                                                {loginError.message}.
                                            </div>
                                        }
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block" onClick={this.handleLogin}>
                                                <i className="fa fa-sign-in"/>{' '}Log in
                                            </button>
                                        </div>

                                        <div className="form-group text-center">
                                            <Link to={`/recovery-password`}>Forgot password</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Login.propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object
};

Login.defaultProps = {
  remember: true
};

function mapStateToProps(state) {
    const { auth } = state;
    if (auth) {
        return {user: auth.user, loginError: auth.loginError};
    }

    return {user: null};
}

export default connect(mapStateToProps)(Login);
