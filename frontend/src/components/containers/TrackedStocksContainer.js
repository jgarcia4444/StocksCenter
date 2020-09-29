import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockRow from '../trackedStocks/StockRow';
import StockTile from '../trackedStocks/StockTile';
import './TrackedStocksContainer.css'
class TrackedStocksContainer extends Component {


    renderStocks = () => {
        return this.props.trackedStocks.map((stock, i) => {
            if (i % 3 === 0) {
                let stocks = this.props.trackedStocks.slice(i, i + 3)
                return <StockRow key={`${stock.stock_symbol}${stock.id}`} stocks={stocks} />
            } else {
                return null
            }
        })
    }

    render() {
        return (
            <div>
               <h4 id="tracked-stocks-title">Tracked Stocks</h4>
                <div className="tracked-stocks-container">
                    {this.props.trackedStocks.length > 0 ? this.renderStocks() : <p>No stocks tracked yet.</p> }
                </div> 
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
    null
)(TrackedStocksContainer);