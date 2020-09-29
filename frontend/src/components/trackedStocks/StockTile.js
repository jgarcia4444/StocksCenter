import React from 'react';

const StockTile = (props) => {
    let { stock } = props
    return (
        <div className="stock-tile">
            <h4>
                {stock.symbol}
            </h4>
        </div>
    )
}

export default StockTile;
