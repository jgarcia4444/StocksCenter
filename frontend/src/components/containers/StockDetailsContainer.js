import React, { Component } from 'react';
import StockDetails from '../StockDetails';

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
        let {symbol, name} = this.props.stock
        return (
            <div className="stock-details-container container">
                <div className="row">
                    <div className="col-4">
                        <small>Ticker</small>
                        <h5>{symbol}</h5>
                    </div>
                    <div className="col-8">
                        <small>Company Name</small>
                        <h5>{name}</h5>
                    </div>
                </div>
                {this.state.stockInfo ? <StockDetails stockInfo={this.state.stockInfo[0]} /> : null}
            </div>
        )
    }
}