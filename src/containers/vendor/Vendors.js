import React, { Component } from 'react';
import { connect } from 'react-redux';

import VendorForm from './VendorForm';
import VendorsTable from '../../components/vendor/VendorsTable';

class Vendors extends Component {

    render() {
        return (
            <div id="row">
                <div className="col-md-6">
                    <VendorsTable {...this.props} />
                </div>
                <div className="col-md-6">
                    <VendorForm
                        isClear={true}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        vendors: state.vendors || [],
        vendorsTableSize: state.vendorsPage.tableSize,
    };
};

export default connect(
    mapStateToProps
)(Vendors);