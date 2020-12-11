import React, { Component } from 'react';
import StockDetails from '../stockDetails/StockDetails';
import trackStock from '../../actions/TrackStock';
import deleteTrackedStock from '../../actions/DeleteTrackedStock';
import { connect } from 'react-redux';

class StockDetailsContainer extends Component {

    state = {
            stockInfo: null,
            BaseUrl: "http://api.marketstack.com/v1",
            showTrackedAlert: false,
            trackingMessage: "is now saved in your tracked stocks.",
            notSignedIn: false,
            isTracked: false,
            showDeletionMessage: false,
            deletionMessage: ""
        }
    
    checkIfStockTracked = () => {
        let trackedStocksNames = this.props.trackedStocks.map(stock => stock.stock_symbol)
        if (trackedStocksNames.includes(this.props.stock.symbol)) {
            return true
         } else {
             return false
         }
    }

    componentDidMount() {
        this.fetchStockInfo()
    }

    fetchStockInfo = () => {
        let key = process.env.REACT_APP_STOCKS_API_KEY
        let { stock } = this.props
        let isTracked = this.checkIfStockTracked()
        fetch(`${this.state.BaseUrl}/eod/latest?access_key=${key}&symbols=${stock.symbol}`)
        .then(res => res.json())
        .then(json => this.setState({
                ...this.state,
                stockInfo: json.data,
                isTracked: isTracked
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
                        trackingMessage: "is now saved in your tracked stocks."
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
            trackingMessage: "is now saved in your tracked stocks."
        })
    }

    handleUntrackClick = () => {
        this.props.deleteTrackedStock(this.props.stock.symbol)
        this.setState({
            ...this.state,
            isTracked: false
        })
        this.persistTrackedStockRemoval()
    }

    persistTrackedStockRemoval = () => {
        let userID = this.props.currentUser.id;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_stock: {
                    user_id: userID,
                    stock_symbol: this.props.stock.symbol
                }
            })
        }
        fetch(`http://localhost:3000/users/${userID}/user_stocks/${this.props.stock.symbol}`, options)
            .then(res => res.json())
            .then(data => {
                if (data.stock_symbol) {
                    this.setState({
                        ...this.state,
                        showDeletionMessage: true,
                        deletionMessage: data.message,
                    })
                    setTimeout(this.resetStockDetailsContainer, 2250)
                }
            })
    }

    resetStockDetailsContainer = () => {
        this.setState({
            ...this.state,
            stockInfo: null,
            showDeletionMessage: false,
            deletionMessage: ""
        })
        window.location.reload()
    }

    render() {
        let {symbol, name} = this.props.stock
        return (
            <div className="stock-details-container container">
                <div style={{display: this.state.showTrackedAlert ? 'block' : 'none'}} className="alert alert-primary alert-dismissible fade show">
                    {this.state.notSignedIn ? "" : name} {this.state.trackingMessage}
                    <button onClick={this.dismissAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div style={{display: this.state.showDeletionMessage ? 'block' : 'none'}} className="alert alert-danger alert-dismissible fade show">
                    {this.state.deletionMessage}
                    <button onClick={this.dismissAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="row">
                    <div className="col-6">
                        {
                            this.state.isTracked ?
                            <button className="btn btn-danger" onClick={this.handleUntrackClick}>Untrack Stock</button>
                            :
                            <button onClick={this.handleTrackStockClick} className="btn btn-primary">Track stock</button>
                        }
                        
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
        currentUser: state.currentUser,
        trackedStocks: state.trackedStocks
    }
}

export default connect(
    mapStateToProps, 
    { trackStock,
    deleteTrackedStock }
)(StockDetailsContainer)