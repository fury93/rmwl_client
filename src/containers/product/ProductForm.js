import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classNames from 'classnames';
import productActions from '../../actions/product/product';
import {clearActiveProduct} from '../../actions/product/productPage';
import { initialize } from 'redux-form';

export const fields = ['name', 'expiration_date', 'id', 'effective_date', 'vendor_id', 'status', 'code', 'cost'];
export const vendors = ['Vendor1', 'Vendor2', 'Vendor3', 'Super Vendor'];
export const statuses = ['Status1', 'Status2'];

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        const {dispatch} = this.props;

        if (data.id) {
            return dispatch(productActions.update(data));
        } else {
            return dispatch(productActions.create(data));
        }
    }

    resetForm(data) {
        console.log('Reset form!', data);
        this.props.dispatch(initialize('product', {}));
    }

    render() {
        console.log('productForm render');
        const {
            fields: { name, expiration_date, id, effective_date, vendor_id, status, code, cost},
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

                <div className={classNames('form-group', {'has-error': expiration_date.error})}>
                    <label className="control-label">Exp</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Exp" {...expiration_date}/>
                    </div>
                    {expiration_date.touched && expiration_date.error &&
                    <div className="help-block">{expiration_date.error}</div>}
                </div>

                <div className={classNames('form-group', {'has-error': effective_date.error})}>
                    <label className="control-label">Effective date</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Effective date" {...effective_date}/>
                    </div>
                    {effective_date.touched && effective_date.error &&
                    <div className="help-block">{effective_date.error}</div>}
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

                <div className={classNames('form-group', {'has-error': code.error})}>
                    <label className="control-label">Code</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Code" {...code}/>
                    </div>
                    {code.touched && code.error &&
                    <div className="help-block">{code.error}</div>}
                </div>

                <div className={classNames('form-group', {'has-error': cost.error})}>
                    <label className="control-label">Cost</label>
                    <div>
                        <input type="text" className="form-control" placeholder="Cost" {...cost}/>
                    </div>
                    {cost.touched && cost.error &&
                    <div className="help-block">{cost.error}</div>}
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

ProductForm.propTypes = {
    fields: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired
};

ProductForm = reduxForm({
        form: 'product',
        fields
    },
    state => ({ // mapStateToProps
        initialValues: state.productsPage.selectedProduct
    }),
    {clearForm: clearActiveProduct}
)(ProductForm);

export default ProductForm;


