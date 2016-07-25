import React, { Component } from 'react';

import ProductForm from '../../containers/product/ProductForm';
import ProductsTable from '../../containers/product/ProductsTable';

class Products extends Component {

    render() {
        console.log('render products');
        return (
            <div id="row">
                <div className="col-md-12">
                    <ProductsTable />
                </div>
            </div>
        );
    }
}

export default Products;