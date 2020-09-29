import React, { Component } from 'react';
import { connect } from 'react-redux';
import StockTile from '../trackedStocks/StockTile';

class TrackedStocksContainer extends Component {

    // renderStockRows = () => {
    //     var rowIndexes = []
    //     this.props.trackedStocks.forEach((stock, i) => {
    //         if (i % 3 === 0) {
    //             rowIndexes.push(i)
    //         }
    //     });
    //     this.props.trackedStocks.map((stock, i) => {
    //         if (rowIndexes.includes(i)) {
    //             let columnStocks = this.props.trackedStocks.slice(i, i + 3)
    //             console.log(columnStocks)
    //             return (
    //                 <div key={stock.symbol + i} className="row">
    //                     {this.renderStockCols(columnStocks)}
    //                 </div>
    //             )
    //         }
    //     })
    // }

    // renderStockCols = (stocks) => {
    //     stocks.map(stock => {
    //         return (
    //             <div className="col-4">
    //                 <StockTile key={stock.id} stock={stock} />
    //             </div>
    //         )
    //     })
    // }

    render() {
        // let userObjectLength = Object.keys(this.props.currentUser).length
        return (
            <div className="tracked-stocks-container container">
                {this.renderStockRows()}

                testtttt
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