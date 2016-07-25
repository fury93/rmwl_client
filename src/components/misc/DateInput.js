import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './misc.css';

export default class DateInput extends Component{
    render() {
        const {field} = this.props;
        const selected = field.value ? moment(field.value) : null;

        return (
            <DatePicker
                className="form-control"
                {...field}
                dateFormat='MM/DD/YY'
                selected={selected}
            />
        );
    }
}
