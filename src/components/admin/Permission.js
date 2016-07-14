import React, { Component } from 'react';
import CheckboxGroup from 'react-checkbox-group';

export  default class Permission extends Component {
    render() {
        const {name, value, ...props} = this.props;
        debugger;
        return (
            <div class="checkbox">
                <label>
                    <Checkbox value={value}/> {name}
                </label>
            </div>
        );
    }
}