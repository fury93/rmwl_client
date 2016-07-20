import React, { Component } from 'react';
import { connect } from 'react-redux'
import productActions from '../../actions/product/product'
import {setActiveProduct, resizeProductTable} from '../../actions/product/productPage'
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ActionsCell, TextCellFormat} from '../../components/table/TableCells'
import {vendors} from './ProductForm';

import {tableDidMount, tableWillUnmount, getTableHeight, getTableWidth} from '../../utils/tableResize';

class ProductsTable extends Component {

    constructor(props) {
        super(props);
        this.getTableHeight = getTableHeight.bind(this);
        this.getTableWidth = getTableWidth.bind(this);
        this.tableDidMount = tableDidMount.bind(this);
        this.tableWillUnmount = tableWillUnmount.bind(this);
    }

    componentDidMount() {
        this.tableDidMount();

        const {dispatch} = this.props;
        dispatch(productActions.fetch());
        setTimeout(this.handleWindowResize, 1000);
    }

    componentWillUnmount() {
        this.tableWillUnmount();
    }

    handleWindowResize = () => {
        const { dispatch } = this.props;
        dispatch(resizeProductTable(this.getTableWidth(), this.getTableHeight()));
    };

    eventDeleteProduct = (product) => {
        const {dispatch} = this.props;
        dispatch(productActions.delete(product));
    };

    eventEditProduct = (product) => {
        const {dispatch} = this.props;
        dispatch(setActiveProduct(product));
    };

    render() {
        const {products, productsTableSize} = this.props;

        return (
            <div className="container-fluid">

                {products.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>
                }

                {products.length > 0 &&
                <div ref="TABLE_DIV">
                    <Table
                        rowsCount={products.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={productsTableSize.width}
                        height={productsTableSize.height}>

                        <Column
                            header={<Cell>Name</Cell>}
                            cell={<TextCell data={products} field="name" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Exp</Cell>}
                            cell={<TextCell data={products} field="expiration_date" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Eff</Cell>}
                            cell={<TextCell data={products} field="effective_date" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Vendor</Cell>}
                            cell={
                        <TextCellFormat
                           data={products}
                           field="vendor_id"
                           collection={vendors}
                           />
                        }
                            width={100}
                        />
                        <Column
                            header={<Cell>Status</Cell>}
                            cell={<TextCell data={products} field="status" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Code</Cell>}
                            cell={<TextCell data={products} field="code" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Cost</Cell>}
                            cell={<TextCell data={products} field="cost" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Action</Cell>}
                            cell={
                        <ActionsCell
                             data={products}
                             eventEdit={this.eventEditProduct}
                             eventDelete={this.eventDeleteProduct}
                             field="id"
                        />}
                            width={200}
                        />
                    </Table>
                </div>
                }
            </div>
        );
    }
}

ProductsTable.propTypes = {
    products: React.PropTypes.array.isRequired,
    productsTableSize: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        products: state.products || [],
        productsTableSize: state.productsPage.tableSize
    };
};

export default connect(
    mapStateToProps
)(ProductsTable);
