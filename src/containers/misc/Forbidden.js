import React, { Component } from 'react';

export default class Forbidden extends Component {
    render() {
        return (
            <div className="container">
                <h1>403!</h1>
                <p>Oops, you don't have access to this action.</p>
            </div>
        );
    }
}
