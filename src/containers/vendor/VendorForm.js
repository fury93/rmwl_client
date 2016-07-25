import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classNames from 'classnames';
import vendorActions from '../../actions/vendor/vendor';
import {clearActiveVendor} from '../../actions/vendor/vendorPage';
import { initialize } from 'redux-form';

export const fields = ['name', 'address', 'id', 'description', 'contact_info', 'status'];

class VendorForm extends Component {

    handleSubmit = (data) => {
        const {dispatch} = this.props;

        if (data.id) {
            return dispatch(vendorActions.update(data));
        } else {
            return dispatch(vendorActions.create(data));
        }
    };

    render() {
        const {
            fields: { name, address, id, description, contact_info, status},
            clearForm,
            handleSubmit,
            vendorStatus,
            isClear
            } = this.props;
        const submitting = false;

        return (
            <form role="form" onSubmit={handleSubmit(this.handleSubmit)}>

                <input type="hidden" {...id}/>

                <div className={classNames('form-group', {'has-error': name.error})}>
                    <label className="control-label">Name</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Name" {...name}/>
                    </div>
                    {name.touched && name.error && <div className="help-block">{name.error}</div>}
                </div>

                <div className={classNames('form-group', {'has-error': address.error})}>
                    <label className="control-label">Address</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Address" {...address}/>
                    </div>
                    {address.touched && address.error &&
                    <div className="help-block">{address.error}</div>}
                </div>

                <div className={classNames('form-group', {'has-error': contact_info.error})}>
                    <label className="control-label">Contact info</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Contact info" {...contact_info}/>
                    </div>
                    {contact_info.touched && contact_info.error &&
                    <div className="help-block">{contact_info.error}</div>}
                </div>

                <div className={classNames('form-group', {'has-error': status.error})}>
                    <label className="control-label">Status</label>
                    <div>
                        <select {...status} className="form-control">
                            <option value="">Select status...</option>
                            {vendorStatus.map((status, key) => <option value={status} key={status}>{status}</option>)}
                        </select>
                    </div>
                    {status.touched && status.error && <div className="help-block">{status.error}</div>}
                </div>

                <div className={classNames('form-group', {'has-error': description.error})}>
                    <label className="control-label">Description</label>
                    <div>
                        <textarea className="form-control"
                            {...description}
                                  value={description.value || ''}/>
                    </div>
                    {description.touched && description.error &&
                    <div className="help-block">{description.error}</div>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? <i/> : <i/>} {!id.value && 'Create'} {id.value && 'Update'}
                    </button>
                    {isClear &&
                    <button type="button" className="btn btn-danger" disabled={submitting} onClick={() => clearForm()}>
                        Clear
                    </button>
                    }

                </div>

            </form>
        )
    }
}

VendorForm.propTypes = {
    fields: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired,
    isClear: PropTypes.bool
};

VendorForm = reduxForm({
        form: 'vendor',
        fields
    },
    state => ({
        initialValues: state.vendorsPage.selectedVendor,
        vendorStatus: state.auth.vendorStatus || []
    }),
    {clearForm: clearActiveVendor}
)(VendorForm);

export default VendorForm;


