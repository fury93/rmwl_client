import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './home.css';

class Home extends Component {
    render() {
        const {username} = this.props;

        return (
            <div>
                Hello {username}!
            </div>
        );
    }
}

Home.propTypes = {
    username: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        username: state.auth.user.user
    };
}

export default connect(mapStateToProps)(Home);
