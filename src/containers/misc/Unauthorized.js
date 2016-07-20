import React, { Component } from 'react';

export default class Unauthorized extends Component {
    render() {
        return (
            <div className="container">
                <h1>401!</h1>
                <p>Oops, you must be logged.</p>
            </div>
        );
    }
}
