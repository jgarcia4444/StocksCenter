import React from 'react';
import './StockTile.css';

const StockTile = (props) => {
    let { stock } = props
    return (
        <div onClick={() => props.handleTrackedClick(stock)} className="stock-tile">
            <h4>
                {stock.stock_symbol}
            </h4>
        </div>
    )
}

export default StockTile;
