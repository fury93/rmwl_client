import React, { Component } from 'react';
import { connect } from 'react-redux'

import UserForm from '../../containers/user/UserForm';
import UserTable from '../../components/user/UsersTable';

class Users extends Component {

    render() {
        console.log('render users');
        return (
            <div id="row">
                <div className="col-md-6">
                    <UserTable {...this.props} />
                </div>
                <div className="col-md-6">
                    <UserForm/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users || [],
        usersTableSize: state.usersPage.tableSize
    };
};

export default connect(
    mapStateToProps
)(Users);