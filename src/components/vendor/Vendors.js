import React, { Component } from 'react';

import VendorForm from '../../containers/vendor/VendorForm';
import VendorsTable from '../../containers/vendor/VendorsTable';


class Vendors extends Component {

    render() {
        return (
            <div id="row">
                <div className="col-md-6">
                    <VendorsTable />
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

export default Vendors;