import React from 'react';
import StockTile from '../trackedStocks/StockTile'

const StockRow = (props) => {
    let { stocks } = props
    return (
        <div className="row">
            {stocks.map(stock => {
                return (
                    <div key={`${stock.user_id}${stock.id}`} className="col-4">
                        <StockTile stock={stock} />
                    </div>
                )
            })}
        </div>
    )
}

export default StockRow;