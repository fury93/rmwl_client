import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classNames from 'classnames';
import productActions from '../../actions/product/product';
import {clearActiveProduct} from '../../actions/product/productPage';
//import validate from '../../utils/validateUser'

import { initialize } from 'redux-form';

export const fields = ['name', 'expiration_date', 'id'];

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        const {dispatch} = this.props;

        if(data.id) {
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
            fields: { name, expiration_date, id}, clearForm, handleSubmit} = this.props;
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
                    {expiration_date.touched && expiration_date.error && <div className="help-block">{expiration_date.error}</div>}
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

ProductForm.propTypes = {
    fields: PropTypes.object.isRequired,
    clearForm: PropTypes.func.isRequired
};

ProductForm = reduxForm({
        form: 'product',
        fields,
    },
    state => ({ // mapStateToProps
        initialValues: state.productsPage.selectedProduct
    }),
    { clearForm: clearActiveProduct }
)(ProductForm);

export default ProductForm;


