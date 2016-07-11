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

export class ActionsCell extends Component {
    render() {
        const {rowIndex, field, data, eventDelete, eventEdit,  ...props} = this.props;
        const id = data[rowIndex][field];
        return (
            <Cell {...props}>
                <button type="button" className="btn btn-danger" onClick={() =>eventDelete(data[rowIndex])}>
                    Delete
                </button>
                <button type="button" className="btn btn-primary" onClick={() =>eventEdit(data[rowIndex])}>
                    Edit
                </button>
            </Cell>
        );
    }
}