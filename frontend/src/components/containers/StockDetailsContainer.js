import React, { Component } from 'react';
import StockDetails from '../stockDetails/StockDetails';
import trackQuote from '../actions/TrackQuote'
import { connect } from 'react-redux';

class StockDetailsContainer extends Component {

    state = {
        stockInfo: null,
        BaseUrl: "http://api.marketstack.com/v1",
        showTrackedAlert: false,
        trackingMessage: "is now saved in your tracked stocks.",
        duplicate: false
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
        let { stock } = this.props
        let { id } = this.props.currentUser
        
        const jsonUserStock = JSON.stringify({
            user_id: id,
            stock_symbol: stock.symbol
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: jsonUserStock
        }
        fetch(`http://localhost:3000/users/${id}/user_stocks`, options)
        .then(res => res.json())
        .then(data => {
            if (data.userStocks) {
                this.props.trackQuote(this.props.stock)
                this.setState({
                    ...this.state,
                    showTrackedAlert: true,
                    duplicate: false,
                    trackingMessage: "is now saved in your tracked stocks."
                })
            } else {
                this.setState({
                    ...this.state,
                    trackingMessage: data.message,
                    showTrackedAlert: true,
                    duplicate: true
                })
            }
            
        })
    }

    dismissAlert = () => {
        this.setState({
            showTrackedAlert: false,
            duplicate: false,
            trackingMessage: "is now saved in your tracked stocks."
        })
    }

    render() {
        let {symbol, name} = this.props.stock
        return (
            <div className="stock-details-container container">
                <div style={{display: this.state.showTrackedAlert ? 'block' : 'none'}} className={this.state.duplicate ? "alert alert-danger alert-dismissible fade show" : "alert alert-primary alert-dismissible fade show"}>
                    {name} {this.state.trackingMessage}
                    <button onClick={this.dismissAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
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

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(
    mapStateToProps, 
    { trackQuote }
)(StockDetailsContainer)