import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = ['username',  'email', 'role', 'active'];

class UserForm extends Component {
    render() {
        const {
            fields: { username, email, role, active },
            handleSubmit,
            resetForm,
            submitting
            } = this.props;

        return (<form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <div>
                        <input type="text" placeholder="Name" {...username}/>
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <input type="email" placeholder="Email" {...email}/>
                    </div>
                </div>
                <div>
                    <label>Roles</label>
                    <div>
                        <select
                            {...role}
                            value={role || ''}>
                            <option value="admin">admin</option>
                            <option value="employee">employee</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label>
                        <input type="checkbox" {...active}/> Active status
                    </label>
                </div>
                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? <i/> : <i/>} Submit
                    </button>
                    <button type="button" disabled={submitting} onClick={resetForm}>
                        Clear
                    </button>
                </div>
            </form>
        )
    }
}
/*
UserForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};*/


export default reduxForm({
    form: 'user',
    fields
})(UserForm)
