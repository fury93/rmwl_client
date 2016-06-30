import React, { Component } from 'react';
//import { connect } from 'react-redux';

import UserForm from '../../containers/user/UserForm';
import UserTable from '../../containers/user/UsersTable';
import userActions from '../../actions/user';


class Users extends Component {

    render() {
        console.log('render users');
        return (
            <div id="row">
                <div className="col-md-6">
                    <UserTable />
                </div>
                <div className="col-md-6">
                    <UserForm/>
                </div>
            </div>
        );
    }
}

export default Users;