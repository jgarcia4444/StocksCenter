import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockRow from '../trackedStocks/StockRow';
import './TrackedStocksContainer.css'
import StockDetails from '../stockDetails/StockDetails';

class TrackedStocksContainer extends Component {

    state = {
        stockInfo: null,
        fetchUrl: "http://api.marketstack.com/v1",
    }

    handleTrackedClick = (stock) => {
        let apiKey = process.env.REACT_APP_STOCKS_API_KEY
        fetch(`${this.state.fetchUrl}/eod/latest?access_key=${apiKey}&symbols=${stock.stock_symbol}`)
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

    render() {
        if ((this.props.trackedStocks.length > 0) && (!this.state.stockInfo)) {
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
                            <h4 >Tracked Stocks</h4>
                        </div>
                        <div className="col-4">
                            <button onClick={this.handleSeeAllClick} className="btn btn-secondary">See all</button>
                        </div>
                    </div>
                    <div className="tracked-stocks-container">
                        <div className="row">
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
    null
)(TrackedStocksContainer);