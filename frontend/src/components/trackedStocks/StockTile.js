import React from 'react';

const StockTile = (props) => {
    let { stock } = props
    return (
        <div className="stock-tile">
            <h4>
                {stock.stock_symbol}
            </h4>
        </div>
    )
}

export default StockTile;
