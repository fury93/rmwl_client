import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classNames from 'classnames';
import { Router, browserHistory } from 'react-router';
import productActions from '../../actions/product/product';
import {clearActiveProduct} from '../../actions/product/productPage';
import DateInput from '../../components/misc/DateInput';
import {zeroTime} from '../../utils/utils';

export const fields = ['id', 'vendor_id', 'name', 'code', 'description', 'status', 'unit_of_measure', 'product_class',
    'uom', 'cost', 'cost_per_unit', 'price_per_unit', 'effective_date', 'expiration_date', 'locations'];
export const vendors = ['Vendor1', 'Vendor2', 'Vendor3', 'Super Vendor'];
export const statuses = ['Status1', 'Status2'];
export const productClasses = ['Class1', 'Class2'];
export const unitsOfMeasure = ['G', 'Mg', 'Kg'];
//export const locationList = [{id: 1, name: 'Location1'}, {id: 2, name: 'Location2'}];

var TODAY = zeroTime(new Date());

class ProductForm extends Component {

    handleSubmit = (data) => {
        const {dispatch} = this.props;

        if (data.id) {
            return dispatch(productActions.update(data));
        } else {
            return dispatch(productActions.create(data));
        }
    };

    render() {
        const {
            fields: { id, vendor_id, name, code, description, status, unit_of_measure, product_class, uom,
                cost, cost_per_unit, price_per_unit, effective_date, expiration_date, locations},
            clearForm,
            handleSubmit,
            isClear,
            locationList
            } = this.props;
        const submitting = false;

        return (
            <form role="form" onSubmit={handleSubmit(this.handleSubmit)}>

                <input type="hidden" {...id}/>

                <div className="col-md-6">

                    <div className={classNames('form-group', {'has-error': name.error})}>
                        <label className="control-label">Name</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Name" {...name}/>
                        </div>
                        {name.touched && name.error && <div className="help-block">{name.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': effective_date.error})}>
                        <label className="control-label">Effective date</label>
                        <div>
                            <div>
                                <DateInput
                                    field={effective_date}
                                    placeholder="Effective date"
                                    min={effective_date.value || TODAY}
                                />
                            </div>
                        </div>
                        {effective_date.touched && effective_date.error &&
                        <div className="help-block">{effective_date.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': status.error})}>
                        <label className="control-label">Status</label>
                        <div>
                            <select {...status} className="form-control">
                                <option value="">Select status...</option>
                                {statuses.map(status => <option value={status} key={status}>{status}</option>)}
                            </select>
                        </div>
                        {status.touched && status.error && <div className="help-block">{status.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': product_class.error})}>
                        <label className="control-label">Product Class</label>
                        <div>
                            <select {...product_class} className="form-control">
                                <option value="">Select product class...</option>
                                {productClasses.map(productClass =>
                                    <option value={productClass} key={productClass}>{productClass}</option>)}
                            </select>
                        </div>
                        {product_class.touched && product_class.error &&
                        <div className="help-block">{product_class.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': cost.error})}>
                        <label className="control-label">Cost</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Cost" {...cost}/>
                        </div>
                        {cost.touched && cost.error &&
                        <div className="help-block">{cost.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': cost_per_unit.error})}>
                        <label className="control-label">Cost Per Unit</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Cost Per Unit" {...cost_per_unit}/>
                        </div>
                        {cost_per_unit.touched && cost_per_unit.error &&
                        <div className="help-block">{cost_per_unit.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': price_per_unit.error})}>
                        <label className="control-label">Price Per Unit</label>
                        <div>
                            <input type="text" className="form-control"
                                   placeholder="Price Per Unit" {...price_per_unit}/>
                        </div>
                        {price_per_unit.touched && price_per_unit.error &&
                        <div className="help-block">{cost_per_unit.error}</div>}
                    </div>

                </div>

                <div className="col-md-6">

                    <div className={classNames('form-group', {'has-error': code.error})}>
                        <label className="control-label">Code</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Code" {...code}/>
                        </div>
                        {code.touched && code.error &&
                        <div className="help-block">{code.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': expiration_date.error})}>
                        <label className="control-label">Exp</label>
                        <div>
                            <DateInput
                                field={expiration_date}
                                placeholder="Exp"
                                min={expiration_date.value || TODAY}
                            />
                        </div>
                        {expiration_date.touched && expiration_date.error &&
                        <div className="help-block">{expiration_date.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': vendor_id.error})}>
                        <label className="control-label">Vendor</label>
                        <div>
                            <select {...vendor_id} className="form-control">
                                <option value="">Select vendor...</option>
                                {vendors.map((vendor, key) => <option value={key} key={vendor}>{vendor}</option>)}
                            </select>
                        </div>
                        {vendor_id.touched && vendor_id.error && <div className="help-block">{vendor_id.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': unit_of_measure.error})}>
                        <label className="control-label">Unit of measure</label>
                        <div>
                            <select {...unit_of_measure} className="form-control">
                                <option value="">Select unit of measure...</option>
                                {unitsOfMeasure.map(unitOfMeasure =>
                                    <option value={unitOfMeasure} key={unitOfMeasure}>{unitOfMeasure}</option>)}
                            </select>
                        </div>
                        {unit_of_measure.touched && unit_of_measure.error &&
                        <div className="help-block">{unit_of_measure.error}</div>}
                    </div>

                    {/* TODO LOCATIONS*/}
                    <div className={classNames('form-group', {'has-error': locations.error})}>
                        <label className="control-label">Locations</label>
                        <div>
                            <select multiple {...locations} className="form-control">
                                {locationList.map(location =>
                                    <option value={location.value} key={location.label}>{location.label}</option>)}
                            </select>
                        </div>
                        {locations.touched && locations.error &&
                        <div className="help-block">{locations.error}</div>}
                    </div>

                    <div className={classNames('form-group', {'has-error': description.error})}>
                        <label className="control-label">Description</label>
                        <div>
                        <textarea className="form-control" rows="10"
                            {...description}
                                  value={description.value || ''}/>
                        </div>
                        {description.touched && description.error &&
                        <div className="help-block">{description.error}</div>}
                    </div>
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

ProductForm.propTypes = {
    fields: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired,
    isClear: PropTypes.bool
};

ProductForm = reduxForm({
        form: 'product',
        fields
    },
    state => ({
        initialValues: state.productsPage.selectedProduct,
        locationList: state.auth.locations
    }),
    {clearForm: clearActiveProduct}
)(ProductForm);

export default ProductForm;


