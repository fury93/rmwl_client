import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationForm from './LocationForm';
import LocationsTable from '../../components/location/LocationsTable';

class Locations extends Component {

    render() {
        return (
            <div id="row">
                <div className="col-md-6">
                    <LocationsTable {...this.props} />
                </div>
                <div className="col-md-6">
                    <LocationForm/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        locations: state.locations || [],
        locationsTableSize: state.locationsPage.tableSize
    };
};

export default connect(
    mapStateToProps
)(Locations);