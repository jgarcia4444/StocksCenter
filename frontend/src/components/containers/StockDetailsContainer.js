import React, { Component } from 'react';
import StockDetails from '../stockDetails/StockDetails';
import trackStock from '../../actions/TrackStock'
import { connect } from 'react-redux';

class StockDetailsContainer extends Component {

    state = {
        stockInfo: null,
        BaseUrl: "http://api.marketstack.com/v1",
        showTrackedAlert: false,
        trackingMessage: "is now saved in your tracked stocks.",
        duplicate: false,
        notSignedIn: false
    }

    componentDidMount() {
        this.fetchStockInfo()
    }

    fetchStockInfo = () => {
        let key = process.env.REACT_APP_STOCKS_API_KEY
        let { stock } = this.props
        fetch(`${this.state.BaseUrl}/eod/latest?access_key=${key}&symbols=${stock.symbol}`)
        .then(res => res.json())
        .then(json => this.setState({
                ...this.state,
                stockInfo: json.data
        }))
    }

    setupJSONUserStock = () => {
        let { stock } = this.props
        let { id } = this.props.currentUser
        return JSON.stringify({
            user_stock: {
                user_id: id,
                stock_symbol: stock.symbol
            }
        })
    }

    postTrackedStockToBackend = (userId, options) => {
        fetch(`http://localhost:3000/users/${userId}/user_stocks`, options)
            .then(res => res.json())
            .then(data => {
                if (data.userStocks) {
                    this.props.trackStock(this.props.stock)
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
                        duplicate: true,
                    })  
                }
        })
    }

    handleTrackStockClick = () => {
        const jsonUserStock = this.setupJSONUserStock()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: jsonUserStock
        }
        if (this.props.currentUser.id) {
            this.postTrackedStockToBackend(this.props.currentUser.id, options)
        } else {
            this.promptUserToSignIn()
        }
    }

    promptUserToSignIn = () => {
        this.setState({
            ...this.state,
            trackingMessage: "You must have an account and be signed in to track stocks.",
            showTrackedAlert: true,
            notSignedIn: true
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
                    {this.state.notSignedIn ? "" : name} {this.state.trackingMessage}
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
    { trackStock }
)(StockDetailsContainer)