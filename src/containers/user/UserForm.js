import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = ['username', 'email', 'role', 'active', 'id'];
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import userActions from '../../actions/user';
import {clearActiveUser} from '../../actions/userPage';
import validate from '../../utils/validateUser'

import { initialize } from 'redux-form';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.resetForm = this.resetForm.bind(this);
    }

    handleSubmit(data) {
        debugger;
        const {dispatch} = this.props;
        if(data.id) {
            debugger;
            dispatch(userActions.update(data));
        } else {
            dispatch(userActions.create(data));
        }
    }

    resetForm(data) {
        console.log('Reset form!', data);
        this.props.dispatch(initialize('user', {}));
    }

    componentDidMount() {
        console.log('userForm componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('userForm componentWillReceiveProps');
    }

    render() {
        console.log('userForm render');
        const {
            fields: { username, email, role, active, id }, clearForm, handleSubmit} = this.props;
        const submitting = false;
        debugger;
        return (

            <form role="form" onSubmit={handleSubmit(this.handleSubmit)}>
                <input type="hidden" {...id}/>
                <div className="form-group has-danger">
                    <label className="control-label">Name</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Name" {...username}/>
                    </div>
                    {username.touched && username.error && <div className="help-block">{username.error}</div>}
                </div>
                <div className="form-group has-danger">
                    <label className="control-label">Email</label>
                    <div>
                        <input type="email" className="form-control" placeholder="Email" {...email}/>
                    </div>
                    {email.touched && email.error && <div className="help-block">{email.error}</div>}
                </div>
                <div className="form-group has-danger">
                    <label className="control-label">Roles</label>
                    <div>
                        <select
                            {...role}
                            className="form-control"
                            value={role.value || ''}>
                            <option></option>
                            <option value="admin">admin</option>
                            <option value="employee">employee</option>
                        </select>
                    </div>
                    {role.touched && role.error && <div className="help-block">{role.error}</div>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? <i/> : <i/>} {!id.value && 'Create'}  {id.value && 'Update'}
                    </button>

                    <button type="button" className="btn btn-danger" disabled={submitting} onClick={() => clearForm()}>
                        Clear
                    </button>
                </div>
            </form>

        )
    }
}

UserForm.propTypes = {
    fields: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired
    //handleSubmit: PropTypes.func.isRequired,
    //resetForm: PropTypes.func.isRequired,
    //submitting: PropTypes.bool.isRequired
};

/*const mapStateToProps = (state, ownProps) => {
    debugger;
    const { users } = state;
    //todo add to state userPage block and field id with active component, if null, then use default data


    return {
        initialValues: defaultUser
    };
};*/

UserForm = reduxForm({
        form: 'user',
        fields,
        validate
    },
    state => ({ // mapStateToProps
        initialValues: state.usersPage.selectedUser
    }),
    { clearForm: clearActiveUser }
)(UserForm);

export default UserForm;


