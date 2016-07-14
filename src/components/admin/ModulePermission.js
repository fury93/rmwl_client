import React, { Component } from 'react';
import CheckboxGroup from 'react-checkbox-group';
import Permission from './Permission';
import { connect } from 'react-redux';
import {updatePermissionByRole} from '../../actions/admin/rolePage'

class ModulePermission extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
         selectedPermission: this.props.active
         }*/
    }

    changeStatus = (newPermissions) => {
        //temp hack. After dispatch component not rendering, but storage change
        //this.setState({selectedPermission: newPermissions});
        const {dispatch, roleName} = this.props;
        dispatch(updatePermissionByRole(newPermissions, roleName));
    };

    /*
     componentWillReceiveProps(nextProps) {
     debugger;
     }
     */

    /*
     shouldComponentUpdate(newData){
     debugger;
     }
     */

    render() {
        const {active, roles, roleName, moduleName, module} = this.props;
        //const {selectedPermission} = this.state;

        return (
            <div className="col-md-2">
                <h4>{moduleName}</h4>
                {/* value={roles[roleName]}*/}
                <CheckboxGroup
                    name={roleName}
                    value={roles}
                    onChange={this.changeStatus}
                >
                    {
                        Checkbox => (
                            <form>
                                {
                                    module.map((elem, i) =>
                                        <div className="checkbox">
                                            <Checkbox key={roleName + moduleName + i} value={elem.value}/> {elem.name}
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
    active: React.PropTypes.array.isRequired,
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