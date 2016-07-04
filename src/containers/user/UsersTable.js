import React, { Component } from 'react';
import { connect } from 'react-redux'
import userActions from '../../actions/user'
import {setActiveUser} from '../../actions/userPage'
import _ from 'lodash';
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ButtonCell} from '../../components/table/TableCells'

class UsersTable extends Component {

    constructor(props) {
        super(props);
        //this.eventDeleteUser = this.eventDeleteUser.bind(this);
    }

    componentDidMount() {
        console.log('usersTable componentDidMount');
        const {dispatch} = this.props;
        dispatch(userActions.fetch());
    }

    componentWillReceiveProps(nextProps) {
        console.log('usersTable componentWillReceiveProps');
        const { dispatch } = nextProps;
        //dispatch(userActions.fetch());
    }

    eventDeleteUser(user) {
        const {dispatch} = this.props;
        dispatch(userActions.delete(user));
    }

    eventEditUser(user) {
        const {dispatch} = this.props;
        dispatch(setActiveUser(user));
    }

    render() {
        console.log('usersTable render');
        const {users} = this.props;
        return (
            <div className="container-fluid">

                {users.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>
                }
                {users.length > 0 &&
                <Table
                    rowsCount={users.length}
                    rowHeight={50}
                    headerHeight={50}
                    width={900}
                    height={500}>
                    <Column
                        header={<Cell>Name</Cell>}
                        cell={<TextCell data={users} field="username" />}
                        width={300}
                    />
                    <Column
                        header={<Cell>Email</Cell>}
                        cell={<TextCell data={users} field="email" />}
                        width={300}
                    />
                    <Column
                        header={<Cell>Role</Cell>}
                        cell={<TextCell data={users} field="role" />}
                        width={100}
                    />
                    <Column
                        header={<Cell>Action</Cell>}
                        cell={
                        <ButtonCell
                             data={users}
                             eventDeleteUser={this.eventDeleteUser.bind(this)}
                             eventEditUser={this.eventEditUser.bind(this)}
                             field="id"
                        />}
                        width={200}
                    />
                </Table>
                }
            </div>
        );
    }
}

UsersTable.propTypes = {
    users: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const { users } = state;
    return {
        users: users || []
    };
};

export default connect(
    mapStateToProps
)(UsersTable);
