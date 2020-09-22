import React, { Component } from 'react';

export default class StockDetailsContainer extends Component {

    state = {
        stockInfo: null,
        BaseUrl: "http://api.marketstack.com/v1",
    }

    componentDidMount() {
        let key = process.env.REACT_APP_STOCKS_API_KEY
        let { stock } = this.props
        fetch(`${this.state.BaseUrl}/eod/latest?access_key=${key}&symbols=${stock.symbol}`)
        .then(res => res.json())
        .then(json => this.setState({
                ...this.state,
                stockInfo: json.data
            }))

    }

    render() {
        return (
            <div className="stock-details-container">
                <h3>{this.props.stock.symbol}</h3>
                <p>{this.props.stock.name}</p>
            </div>
        )
    }
}