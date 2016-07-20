import React, { Component } from 'react';
import { connect } from 'react-redux'
import userActions from '../../actions/user/user'
import {setActiveUser, resizeUserTable} from '../../actions/user/userPage'
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ActionsCell} from '../../components/table/TableCells'

import {tableDidMount, tableWillUnmount, getTableHeight, getTableWidth} from '../../utils/tableResize';

class UsersTable extends Component {

    constructor(props) {
        super(props);
        this.getTableHeight = getTableHeight.bind(this);
        this.getTableWidth = getTableWidth.bind(this);
        this.tableDidMount = tableDidMount.bind(this);
        this.tableWillUnmount = tableWillUnmount.bind(this);
    }

    componentDidMount() {
        this.tableDidMount();

        const {dispatch} = this.props;
        dispatch(userActions.fetch());
        setTimeout(this.handleWindowResize, 1000); // HACK. delay needed. Otherwise getTableWith and getTableHeight may throw error.
    }

    componentWillUnmount() {
        this.tableWillUnmount();
    }

    handleWindowResize = () => {
        const { dispatch } = this.props;
        dispatch(resizeUserTable(this.getTableWidth(), this.getTableHeight()));
    };


    eventDeleteUser(user) {
        const {dispatch} = this.props;
        dispatch(userActions.delete(user));
    }

    eventEditUser(user) {
        const {dispatch} = this.props;
        dispatch(setActiveUser(user));
    }

    render() {
        const {users, usersTableSize} = this.props;

        return (
            <div className="container-fluid">

                {users.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>
                }

                {users.length > 0 &&
                <div ref="TABLE_DIV">
                    <Table
                        rowsCount={users.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={usersTableSize.width}
                        height={usersTableSize.height}>

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
                        <ActionsCell
                             data={users}
                             eventDelete={this.eventDeleteUser.bind(this)}
                             eventEdit={this.eventEditUser.bind(this)}
                             field="id"
                        />}
                            width={200}
                        />
                    </Table>
                </div>
                }
            </div>
        );
    }
}

UsersTable.propTypes = {
    users: React.PropTypes.array.isRequired,
    usersTableSize: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.users || [],
        usersTableSize: state.usersPage.tableSize
    };
};

export default connect(
    mapStateToProps
)(UsersTable);
