import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import {loadRolesPermission, updatePermission} from '../../../actions/admin/rolePage';
import RolePermission from './RolePermission';

import './role.css';

class RolesPage extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(loadRolesPermission());
    }

    savePermission = () => {
        const {dispatch, roles} = this.props;
        dispatch(updatePermission(roles))
    };

    render() {
        const {roles, modules} = this.props;
        var tabs = Object.keys(roles);

        return (
            <div>
                {tabs.length > 0 &&
                <div className="raw col-md-12">
                    <Tabs id="roles-tabs">
                        {
                            tabs.map((elem, index) =>
                                <Tab eventKey={index} key={index} title={elem}>
                                    <RolePermission
                                        role={elem}
                                        modules={modules}
                                    />
                                </Tab>
                            )
                        }
                    </Tabs>
                </div>
                }

                {tabs.length > 0 &&
                <div className="row">
                    <div className="col-sm-offset-5 col-sm-2 text-center">
                        <input className="btn btn-lg btn-primary btn-block"
                               value="Update"
                               type="button"
                               onClick={this.savePermission}
                        />
                    </div>
                </div>
                }

                {
                    !tabs.length && <div>Roles not found</div>
                }

            </div>
        );
    }
}

RolesPage.propTypes = {
    roles: React.PropTypes.object.isRequired,
    modules: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        roles: state.rolesPage.roles,
        modules: state.rolesPage.modules
    };
}

export default connect(mapStateToProps)(RolesPage);

