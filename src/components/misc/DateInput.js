import React, { Component, PropTypes } from 'react';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateInput extends Component{
    render() {
        debugger;
        //const selected = this.props.value ? moment(this.props.value) : null;
        return (
            <DatePicker
                {...this.props}
                dateFormat='MM/DD/YY'
                className="form-control"
                selected={this.props.value}
            />
        );
    }
}
