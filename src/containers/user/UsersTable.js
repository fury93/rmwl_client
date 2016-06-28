import React, { Component } from 'react';
import { connect } from 'react-redux'
import userActions from '../../actions/user'
import _ from 'lodash';
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell} from '../../components/table/TableCells'
import {UserForm} from '../../components/user/UserForm'

class UsersTable extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(userActions.fetch());
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps;
        //dispatch(userActions.fetch());
    }

    handleSubmit(event) {
        //todo
    }

    resetForm(event) {
        //todo
    }

    render() {
        debugger;
        const {users} = this.props;
        /*const usersData = _.map(users, function (user) {
            return <li key={user.id}>{user.user}</li>;
        });*/

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
                        width={1000}
                        height={500}>
                        <Column
                            header={<Cell>Name</Cell>}
                            cell={<TextCell data={users} field="user" />}
                            width={300}
                        />
                        <Column
                            header={<Cell>Email</Cell>}
                            cell={<LinkCell data={users} field="email" />}
                            width={300}
                        />
                        <Column
                            header={<Cell>Role</Cell>}
                            cell={<LinkCell data={users} field="role" />}
                            width={300}
                        />
                    </Table>
                }

               /* <UserForm
                    fields={users}
                    submitting={false}
                    handleSubmit={this.handleSubmit()}
                    resetForm={this.resetForm()}
                />*/
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
