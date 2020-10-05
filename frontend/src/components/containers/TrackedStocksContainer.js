import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockRow from '../trackedStocks/StockRow';
import './TrackedStocksContainer.css'
import StockDetails from '../stockDetails/StockDetails';
import deleteTrackedStock from '../actions/DeleteTrackedStock';

class TrackedStocksContainer extends Component {

    state = {
        stockInfo: null,
        stockFetchUrl: "http://api.marketstack.com/v1",
        dbFetchUrl: "http://localhost:3000",
        deletionMessage: "",
        showDeletionMessage: false
    }

    handleTrackedClick = (stock) => {
        let apiKey = process.env.REACT_APP_STOCKS_API_KEY
        fetch(`${this.state.stockFetchUrl}/eod/latest?access_key=${apiKey}&symbols=${stock.stock_symbol}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    ...this.state,
                    stockInfo: json.data[0]
                })
            })
    }

    handleSeeAllClick = () => {
        this.setState({
            ...this.state,
            stockInfo: null
        })
    }

    renderStocks = () => {
        return this.props.trackedStocks.map((stock, i) => {
            if (i % 3 === 0) {
                let stocks = this.props.trackedStocks.slice(i, i + 3)
                return <StockRow handleTrackedClick={this.handleTrackedClick} key={`${stock.stock_symbol}${stock.id}`} stocks={stocks} />
            } else {
                return null
            }
        })
    }

    untrackStock = () => {
        const userStockJson = JSON.stringify({
            user_id: this.props.currentUser.id,
            stock_symbol: this.state.stockInfo.symbol
        })
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: userStockJson
        }
        fetch(`${this.state.dbFetchUrl}/users/${this.props.currentUser.id}/user_stocks/${this.state.stockInfo.symbol}`, options)
            .then(res => res.json())
            .then(data => {
                if (data.stock_symbol) {
                    this.setState({
                        ...this.state,
                        showDeletionMessage: true,
                        deletionMessage: data.message,
                    })
                    setTimeout(this.setStockInfoToNull, 2250)
                    this.props.deleteTrackedStock(data.stock_symbol)
                } else {
//
                }
            })
    }

    setStockInfoToNull = () => {
        this.setState({
            ...this.state,
            stockInfo: null,
            showDeletionMessage: false
        })
    }

    render() {
        if ((this.props.trackedStocks !== undefined) && (!this.state.stockInfo)) {
            return (
                    <div>
                        <h4 id="tracked-stocks-title">Tracked Stocks</h4>
                        <div className="tracked-stocks-container">
                            {this.renderStocks()}
                        </div> 
                    </div> 
                    ) 
        } else if (this.state.stockInfo) {
            return (
                <div className="container">
                    <div id="tracked-stocks-title" className="row">
                        <div className="col-8">
                            <h4>Tracked Stocks</h4>
                        </div>
                        <div className="col-4">
                            <button onClick={this.handleSeeAllClick} className="btn btn-secondary">See all</button>
                        </div>
                    </div>
                    <div className="tracked-stocks-container">
                            <div className="row">
                            {this.state.showDeletionMessage ? 
                            <div className="alert alert-danger">{this.state.deletionMessage}</div> : null }
                            <button className="btn btn-danger untrack-button" onClick={this.untrackStock}>Untrack</button>
                            <div className="col-12">
                                <h4>{this.state.stockInfo.symbol} Stock details</h4>
                            </div>
                        </div>
                        <StockDetails stockInfo={this.state.stockInfo} />
                    </div> 
                </div>
            )
        } else {
            return (
               <div>
                    <h4 id="tracked-stocks-title">Tracked Stocks</h4>
                    <div className="tracked-stocks-container">
                        <p>No stocks tracked yet.</p>
                    </div> 
                </div> 
            )
             
        }
          
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
    { deleteTrackedStock }
)(TrackedStocksContainer);