import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockRow from '../trackedStocks/StockRow';
import StockTile from '../trackedStocks/StockTile';

class TrackedStocksContainer extends Component {


    renderStocks = () => {
        return this.props.trackedStocks.map((stock, i) => {
            console.log(stock)
            if (i % 3 === 0) {
                let stocks = this.props.trackedStocks.slice(i, i + 3)
                return <StockRow key={`${stock.stock_symbol}${stock.id}`} stocks={stocks} />
            } else {
                return null
            }
        })
    }

    render() {
        // let userObjectLength = Object.keys(this.props.currentUser).length
        return (
            <div className="tracked-stocks-container container">
                {this.renderStocks()}
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