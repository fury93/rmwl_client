import React, { Component } from 'react';
import ModulePermission from './ModulePermission';
import { connect } from 'react-redux';

class RolePermission extends Component {

    render() {
        const {modules, role} = this.props;
        var modulesName = Object.keys(modules);

        return (
            <div class="row">
                {
                    modulesName.map((name, index) =>
                        <ModulePermission
                            module={modules[name]}
                            moduleName={name}
                            roleName={role}
                            key={index}
                        />
                    )
                }
            </div>
        );
    }
}

RolePermission.propTypes = {
    modules: React.PropTypes.object.isRequired,
    role: React.PropTypes.string.isRequired
};

export default RolePermission;
//export default connect()(RolePermission);