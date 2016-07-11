import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    checkAuth,
    changeAuthStatus,
    AUTH_INIT,
    AUTH_SUCCESS,
    AUTH_FAILED
} from '../../actions/auth';

class RestrictPage extends Component {

    componentWillMount() {
        console.log('componentWillMount RestrictPage');
        const { user, dispatch, authStatus } = this.props;

        if (!authStatus) {
            dispatch(changeAuthStatus(AUTH_INIT));
            dispatch(checkAuth());
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps RestrictPage');
        const { user, dispatch, authStatus } = nextProps;
        const { router } = this.context;

        if (authStatus == AUTH_FAILED) {
            const path = this.props.location.pathname;
            router.push(`/login?redirect=${path}`);
        }
    }

    render() {
        const { user, authStatus } = this.props;

        if (authStatus == AUTH_SUCCESS) {
            return this.props.children;
        }

        return null;
    }
}

RestrictPage.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object,
    location: PropTypes.object
};

RestrictPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        authStatus: state.auth.authStatus
    };
}

export default connect(mapStateToProps)(RestrictPage);
