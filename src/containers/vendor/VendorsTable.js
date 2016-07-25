import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import vendorActions from '../../actions/vendor/vendor'
import {setActiveVendor, resizeVendorTable} from '../../actions/vendor/vendorPage'
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ActionsCell, TextCellFormat} from '../../components/table/TableCells'

import {tableDidMount, tableWillUnmount, getTableHeight, getTableWidth} from '../../utils/tableResize';

class VendorsTable extends Component {

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
        dispatch(vendorActions.fetch());
        setTimeout(this.handleWindowResize, 1000);
    }

    componentWillUnmount() {
        this.tableWillUnmount();
    }

    handleWindowResize = () => {
        const { dispatch } = this.props;
        dispatch(resizeVendorTable(this.getTableWidth(), this.getTableHeight()));
    };

    eventDeleteVendor = (vendor) => {
        const {dispatch} = this.props;
        dispatch(vendorActions.delete(vendor));
    };

    eventEditVendor = (vendor) => {
        const {dispatch} = this.props;
        dispatch(setActiveVendor(vendor));
    };

    render() {
        const {vendors, vendorsTableSize} = this.props;

        return (
            <div className="container-fluid">

                {vendors.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>
                }

                {vendors.length > 0 &&
                <div ref="TABLE_DIV">
                    <Table
                        rowsCount={vendors.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={vendorsTableSize.width}
                        height={vendorsTableSize.height}>

                        <Column
                            header={<Cell>Name</Cell>}
                            cell={<TextCell data={vendors} field="name" />}
                            width={200}
                        />
                        <Column
                            header={<Cell>Address</Cell>}
                            cell={<TextCell data={vendors} field="address" />}
                            width={200}
                        />
                        <Column
                            header={<Cell>Contact info</Cell>}
                            cell={<TextCell data={vendors} field="contact_info" />}
                            width={300}
                        />
                        <Column
                            header={<Cell>Status</Cell>}
                            cell={<TextCell data={vendors} field="status" />}
                            width={100}
                        />
                        <Column
                            header={<Cell>Action</Cell>}
                            cell={
                                <ActionsCell
                                     data={vendors}
                                     eventEdit={this.eventEditVendor}
                                     eventDelete={this.eventDeleteVendor}
                                     field="id"
                                />
                            }
                            width={200}
                        />
                    </Table>
                </div>
                }
            </div>
        );
    }
}

VendorsTable.propTypes = {
    vendors: PropTypes.array.isRequired,
    vendorsTableSize: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        vendors: state.vendors || [],
        vendorsTableSize: state.vendorsPage.tableSize
    };
};

export default connect(
    mapStateToProps
)(VendorsTable);
