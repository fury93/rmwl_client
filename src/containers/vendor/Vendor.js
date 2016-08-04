import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import VendorForm from '../../containers/vendor/VendorForm';
import InfoBlock from  '../../components/misc/InfoBlock';
import {setActiveVendor} from '../../actions/vendor/vendorPage';
import vendorActions from '../../actions/vendor/vendor';

class Vendor extends Component {

    componentWillMount() {
        const { dispatch, vendors } = this.props;

        if (vendors.length == 0) {
            dispatch(vendorActions.fetch());
        } else {
            this.setVendor(vendors);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vendors) {
            this.setVendor(nextProps.vendors);
        }
    }

    isVendor(vendors, id) {
        for (var key in vendors) {
            if (vendors[key].id == id) {
                return vendors[key];
            }
        }

        return false;
    }

    setVendor(vendors) {
        const {  dispatch, params } = this.props;
        var vendor = this.isVendor(vendors, params.vendorId);

        if (vendor) {
            dispatch(setActiveVendor(vendor));
        } else {
            browserHistory.push('/404');
        }
    }

    render() {
        const {vendor} = this.props;

        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Vendor description</h3>
                    </div>

                    <div className="panel-body">
                        <InfoBlock
                            data={vendor}
                        />
                    </div>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Vendor form</h3>
                    </div>

                    <div className="panel-body">
                        <VendorForm/>
                    </div>
                </div>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Vendor history</h3>
                    </div>

                    <div className="panel-body">
                        HISTORY
                    </div>
                </div>
            </div>
        );
    }
}

Vendor.propTypes = {
    vendors: PropTypes.array.isRequired,
    vendor: PropTypes.array.isObject
};

const mapStateToProps = (state) => {
    return {
        vendors: state.vendors || [],
        vendor: state.vendorsPage.selectedVendor
    };
};

export default connect(
    mapStateToProps
)(Vendor);
