import React, { Component } from 'react';
import StockDetails from '../StockDetails';
import trackQuote from '../actions/TrackQuote'
import { connect } from 'react-redux';

class StockDetailsContainer extends Component {

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

    handleTrackStockClick = () => {
        // More to come
        // Should send dispatch to redux store of the stock symbol and be stored into the logged in users tracked stocks
        this.props.trackQuote(this.props.stock)
    }

    render() {
        let {symbol, name} = this.props.stock
        return (
            <div className="stock-details-container container">
                <div className="row">
                    <div className="col-6">
                        <button onClick={this.handleTrackStockClick} className="btn btn-primary">Track stock</button>
                    </div>
                </div>
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

export default connect(
    null, { trackQuote }
)(StockDetailsContainer)