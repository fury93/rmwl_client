import React, { Component, PropTypes } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

export class TextCell extends Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
}

export class LinkCell extends Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        const link = data[rowIndex][field];
        return (
            <Cell {...props}>
                <a href={link}>{link}</a>
            </Cell>
        );
    }
}