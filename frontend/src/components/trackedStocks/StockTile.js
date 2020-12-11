import React from 'react';
import './StockTile.css';

const StockTile = (props) => {
    let { stock } = props
    return (
        <div onClick={() => props.handleTrackedClick(stock)} className="col-4">
            <div className="stock-tile">
                <h4 className="tracked-stock-symbol">
                    {stock.stock_symbol}
                </h4>
            </div>
            
        </div>
    )
}

export default StockTile;
