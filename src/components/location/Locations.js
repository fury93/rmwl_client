import React, { Component } from 'react';

import LocationForm from '../../containers/location/LocationForm';
import LocationsTable from '../../containers/location/LocationsTable';


class Locations extends Component {

    render() {
        return (
            <div id="row">
                <div className="col-md-6">
                    <LocationsTable />
                </div>
                <div className="col-md-6">
                    <LocationForm/>
                </div>
            </div>
        );
    }
}

export default Locations;