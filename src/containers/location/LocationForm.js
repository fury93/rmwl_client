import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classNames from 'classnames';
import locationActions from '../../actions/location/location';
import {clearActiveLocation} from '../../actions/location/locationPage';
import { initialize } from 'redux-form';

export const fields = ['name', 'address', 'id', 'description', 'cell_number'];

class LocationForm extends Component {

    handleSubmit = (data) => {
        const {dispatch} = this.props;

        if (data.id) {
            return dispatch(locationActions.update(data));
        } else {
            return dispatch(locationActions.create(data));
        }
    };

    render() {
        const {
            fields: { name, address, id, description, cell_number},
            clearForm,
            handleSubmit
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

                <div className={classNames('form-group', {'has-error': cell_number.error})}>
                    <label className="control-label">Cell number</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Cell number" {...cell_number}/>
                    </div>
                    {cell_number.touched && cell_number.error &&
                    <div className="help-block">{cell_number.error}</div>}
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

                    <button type="button" className="btn btn-danger" disabled={submitting} onClick={() => clearForm()}>
                        Clear
                    </button>
                </div>

            </form>
        )
    }
}

LocationForm.propTypes = {
    fields: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired
};

LocationForm = reduxForm({
        form: 'location',
        fields
    },
    state => ({
        initialValues: state.locationsPage.selectedLocation
    }),
    {clearForm: clearActiveLocation}
)(LocationForm);

export default LocationForm;


