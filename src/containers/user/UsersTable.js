import React, { Component } from 'react';
import { connect } from 'react-redux'
import userActions from '../../actions/user/user'
import {setActiveUser, resizeUserTable} from '../../actions/user/userPage'
import _ from 'lodash';
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ActionsCell} from '../../components/table/TableCells'

class UsersTable extends Component {

    constructor(props) {
        super(props);
        //this.eventDeleteUser = this.eventDeleteUser.bind(this);
    }

    componentDidMount() {
        /*const win = window;
        if (win.addEventListener) {
            win.addEventListener('resize', _.throttle(this.handleWindowResize, 250), false);
        } else if (win.attachEvent) {
            win.attachEvent('onresize', _.throttle(this.handleWindowResize, 250));
        } else {
            win.onresize = this.handleWindowResize;
        }*/

        console.log('usersTable componentDidMount');
        const {dispatch} = this.props;
        dispatch(userActions.fetch());
    }

/*
    componentWillUnmount() {
        const win = window;
        if (win.removeEventListener) {
            win.removeEventListener('resize', _.throttle(this.handleWindowResize, 250), false);
        } else if (win.removeEvent) {
            win.removeEvent('onresize', _.throttle(this.handleWindowResize, 250), false);
        } else {
            win.onresize = null;
        }
    }

    getTableWidth() {
        try {
            const node = this.refs.TABLE_DIV;
            return node.clientWidth;
        } catch (err) {
            return 2000;
        }
    }

    getTableHeight() {
        try {
            const node = this.refs.TABLE_DIV;
            return node.clientHeight;
        } catch (err) {
            return 1200;
        }
    }

    handleWindowResize() {
        const { dispatch } = this.props;
        dispatch(resizeUserTable(this.getTableWidth(), this.getTableHeight()));
    }
*/

    componentWillReceiveProps(nextProps) {
        console.log('usersTable componentWillReceiveProps');
        const { dispatch } = nextProps;
        //dispatch(userActions.fetch());
    }

    eventDeleteUser(user) {
        debugger;
        const {dispatch} = this.props;
        dispatch(userActions.delete(user));
    }

    eventEditUser(user) {
        debugger;
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
                        <ActionsCell
                             data={users}
                             eventDelete={this.eventDeleteUser.bind(this)}
                             eventEdit={this.eventEditUser.bind(this)}
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
