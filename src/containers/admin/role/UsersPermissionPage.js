import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {loadUserPermission, updateUserPermission} from '../../../actions/admin/userPermissionPage';
import RolePermission from './RolePermission';
import userActions from '../../../actions/user/user';
import UserPermission from './UserPermission';

import './role.css';

class UsersPermissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValues: [],
            selectActive: null
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(userActions.fetch());
    }

    componentWillReceiveProps(nextProps) {
        const {users} = nextProps;
        var options = this.getOptions(users);
        this.setState({selectValues: options});
    }

    //Get options for select
    getOptions = (users) => {
        var values = [];

        for (var i = 0; i < users.length; i++) {
            values.push({
                value: users[i].id,
                label: users[i].username
            });
        }

        return values;
    };

    changeUser = (active) => {
        const {dispatch, usersPermission} = this.props;
        this.setState({selectActive: active});
        if(active && active.value && !usersPermission[active.label]) {
            dispatch(loadUserPermission(active.value));
        }
    };

    render() {
        const {users, usersPermission, usersModules} = this.props;
        const {selectValues, selectActive} = this.state;
        if(selectActive && usersPermission && usersModules) {
            var userPermissions = usersPermission[selectActive.label];
            var userModules = usersModules[selectActive.label];
        }

        console.log('render');
        return (
            <div>
                {users.length > 0 &&
                <div className="row col-md-4">
                    <Select
                        name="form-field-name"
                        options={selectValues}
                        value={selectActive}
                        onChange={this.changeUser}
                    />
                </div>
                }

                {users.length === 0 &&
                    <div className="alert alert-warning">Oops, nothing to show.</div>
                }

                {
                    selectActive && userPermissions && userModules &&
                    <UserPermission
                        user={selectActive}
                        permissions={userPermissions}
                        modules={userModules}
                    />
                }
            </div>
        );
    }
}

UsersPermissionPage.propTypes = {
    usersPermission: React.PropTypes.object.isRequired,
    usersModules: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        usersPermission: state.usersPermissionPage.usersPermission,
        usersModules: state.usersPermissionPage.usersModules,
        users: state.users
    };
}

export default connect(mapStateToProps)(UsersPermissionPage);

