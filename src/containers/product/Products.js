import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductForm from '../../containers/product/ProductForm';
import ProductsTable from '../../components/product/ProductsTable';

class Products extends Component {

    render() {
        console.log('render products');
        return (
            <div id="row">
                <div className="col-md-6">
                    <ProductsTable {...this.props}/>
                </div>
                <div className="col-md-6">
                    <ProductForm
                        isClear={true}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products || [],
        productsTableSize: state.productsPage.tableSize
    };
};

export default connect(
    mapStateToProps
)(Products);