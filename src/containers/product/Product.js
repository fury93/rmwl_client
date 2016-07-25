import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ProductForm from '../../containers/product/ProductForm';
import ProductChart from  '../../components/product/ProductChart';
import InfoBlock from  '../../components/misc/InfoBlock';
import {setActiveProduct} from '../../actions/product/productPage';
import productActions from '../../actions/product/product';

class Product extends Component {

    componentWillMount() {
        console.log('componentWillMount Product');
        const { dispatch, products } = this.props;
        if (products.length == 0) {
            dispatch(productActions.fetch());
        } else {
            this.setProduct(products);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps Product');
        if (nextProps.products) {
            this.setProduct(nextProps.products);
        }
    }

    isProduct(products, id) {
        for (var key in products) {
            if (products[key].id == id) {
                return products[key];
            }
        }

        return false;
    }

    setProduct(products) {
        const {  dispatch, params } = this.props;
        var product = this.isProduct(products, params.productId);

        if (product) {
            dispatch(setActiveProduct(product));
        } else {
            browserHistory.push('/404');
        }
    }

    render() {
        const {product} = this.props;

        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Product description</h3>
                    </div>

                    <div className="panel-body">
                        <InfoBlock
                            data={product}
                        />
                    </div>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Product form</h3>
                    </div>

                    <div className="panel-body">
                        <ProductForm/>
                    </div>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Product history</h3>
                    </div>

                    <div className="panel-body">
                        HISTORY
                    </div>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Product charts</h3>
                    </div>

                    <div className="panel-body">
                        <ProductChart />
                    </div>
                </div>
            </div>
        );
    }
}

Product.propTypes = {
    products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        products: state.products || [],
        product: state.productsPage.selectedProduct
    };
};

export default connect(
    mapStateToProps
)(Product);
