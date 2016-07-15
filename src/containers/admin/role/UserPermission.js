import React, { Component } from 'react';
import CheckboxGroup from 'react-checkbox-group';
import { connect } from 'react-redux';
import {updateUserPermission, updatePermissionByUser} from '../../../actions/admin/userPermissionPage';

//need create one component for user and roles permission
class UserPermission extends Component {

    changeStatus = (newPermissions) => {
        const {dispatch, user} = this.props;
        dispatch(updatePermissionByUser(newPermissions, user.label));
    };

    savePermission = () => {
        const {dispatch, user, permissions} = this.props;
        dispatch(updateUserPermission(user.value, permissions))
    };

    render() {
        const {modules, permissions, user} = this.props;
        var modulesName = Object.keys(modules);

        return (
            <div className="row col-md-12">
                {
                    modulesName.map((name, index) =>
                        <div className="col-md-2" key={name + index}>
                            <h4>{name}</h4>

                            <CheckboxGroup
                                name={user.label + name}
                                value={permissions}
                                onChange={this.changeStatus}
                            >
                                {
                                    Checkbox => (
                                        <form>
                                            {
                                                modules[name].map((elem, i) =>
                                                    <div className="checkbox" key={user.label + elem.value + i}>
                                                        <Checkbox
                                                            value={elem.value}
                                                        /> {elem.name}
                                                    </div>
                                                )
                                            }
                                        </form>
                                    )
                                }
                            </CheckboxGroup>
                        </div>
                    )
                }


                <div className="row">
                    <div className="col-sm-offset-5 col-sm-2 text-center">
                        <input className="btn btn-lg btn-primary btn-block"
                               value="Update"
                               type="button"
                               onClick={this.savePermission}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

UserPermission.propTypes = {
    user: React.PropTypes.object.isRequired,
    permissions: React.PropTypes.array.isRequired,
    modules: React.PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
    var permissions = state.usersPermissionPage.usersPermission[props.user.label];

    return {
        permissions: permissions
    };
}

export default connect(mapStateToProps)(UserPermission);