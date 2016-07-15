import React, { Component } from 'react';
import CheckboxGroup from 'react-checkbox-group';
import { connect } from 'react-redux';
import {updatePermissionByRole} from '../../../actions/admin/rolePage'

//todo it's container
class ModulePermission extends Component {

    changeStatus = (newPermissions) => {
        const {dispatch, roleName} = this.props;
        dispatch(updatePermissionByRole(newPermissions, roleName));
    };

    render() {
        const {roles, roleName, moduleName, module} = this.props;

        return (
            <div className="col-md-2">
                <h4>{moduleName}</h4>

                <CheckboxGroup
                    name={roleName + moduleName}
                    value={roles}
                    onChange={this.changeStatus}
                >
                    {
                        Checkbox => (
                            <form>
                                {
                                    module.map((elem, i) =>
                                        <div className="checkbox" key={roleName + elem.value + i}>
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
        );
    }
}

ModulePermission.propTypes = {
    moduleName: React.PropTypes.string.isRequired,
    roleName: React.PropTypes.string.isRequired,
    module: React.PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
    var roles = state.rolesPage.roles[props.roleName];

    return {
        roles: roles
    };
}

export default connect(mapStateToProps)(ModulePermission);