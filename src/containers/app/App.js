import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { logout } from '../../actions/auth';
import Spinner from'react-spinkit';


import './app.css';

class App extends Component {

    handleLogout() {
        const { user, dispatch } = this.props;
        dispatch(logout(user));
        browserHistory.push('/login');
    }

    render() {
        const { auth, spinner } = this.props;

        return (
            <div className="container-fluid">
                <Header location={this.props.location} auth={auth} handleLogout={() => this.handleLogout()}/>
                {
                    spinner &&
                    <div className="spinner-global">
                        <Spinner spinnerName='three-bounce'/>
                    </div>
                }

                <div className="appContent">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.object.isRequired,
    spinner: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

App.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const { auth, app } = state;

    return {
        auth,
        spinner: app.spinner
    };
};

export default connect(
    mapStateToProps
)(App);
