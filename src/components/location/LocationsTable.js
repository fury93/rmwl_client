import React, { Component, PropTypes } from 'react';
import locationActions from '../../actions/location/location';
import {setActiveLocation, resizeLocationTable} from '../../actions/location/locationPage'
import {Table, Column, Cell} from 'fixed-data-table';
import {TextCell, LinkCell, ActionsCell, TextCellFormat} from '../../components/table/TableCells'

import {tableDidMount, tableWillUnmount, getTableHeight, getTableWidth} from '../../utils/tableResize';

class LocationsTable extends Component {

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
        dispatch(locationActions.fetch());
        setTimeout(this.handleWindowResize, 1000);
    }

    componentWillUnmount() {
        this.tableWillUnmount();
    }

    handleWindowResize = () => {
        const { dispatch } = this.props;
        dispatch(resizeLocationTable(this.getTableWidth(), this.getTableHeight()));
    };

    eventDeleteLocation = (location) => {
        const {dispatch} = this.props;
        dispatch(locationActions.delete(location));
    };

    eventEditLocation = (location) => {
        const {dispatch} = this.props;
        dispatch(setActiveLocation(location));
    };

    render() {
        const {locations, locationsTableSize} = this.props;

        return (
            <div className="container-fluid">

                {locations.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>
                }

                {locations.length > 0 &&
                <div ref="TABLE_DIV">
                    <Table
                        rowsCount={locations.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={locationsTableSize.width}
                        height={locationsTableSize.height}>

                        <Column
                            header={<Cell>Name</Cell>}
                            cell={<TextCell data={locations} field="name" />}
                            width={200}
                        />
                        <Column
                            header={<Cell>Address</Cell>}
                            cell={<TextCell data={locations} field="address" />}
                            width={200}
                        />
                        <Column
                            header={<Cell>Cell number</Cell>}
                            cell={<TextCell data={locations} field="cell_number" />}
                            width={200}
                        />
                        <Column
                            header={<Cell>Action</Cell>}
                            cell={
                                <ActionsCell
                                     data={locations}
                                     eventEdit={this.eventEditLocation}
                                     eventDelete={this.eventDeleteLocation}
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

LocationsTable.propTypes = {
    locations: PropTypes.array.isRequired,
    locationsTableSize: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default LocationsTable;
