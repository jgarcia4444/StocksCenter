import React, { Component } from 'react';

export default class StockDetailsContainer extends Component {


    render() {
        return (
            <div className="stock-details-container">
                <h3>{this.props.stock.symbol}</h3>
                <p>{this.props.stock.name}</p>
            </div>
        )
    }
}