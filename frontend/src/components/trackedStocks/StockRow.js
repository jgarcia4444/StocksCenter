import React from 'react';
import StockTile from '../trackedStocks/StockTile'
import './StockRow.css'

const StockRow = (props) => {
    let { stocks } = props
    return (
        <div className="row tracked-stocks-row">
            {stocks.map(stock => {
                return (
                    <div key={`${stock.user_id}${stock.id}`} className="col-4">
                        <StockTile key={stock.id} handleTrackedClick={props.handleTrackedClick} stock={stock} />
                    </div>
                )
            })}
        </div>
        
    )
}

export default StockRow;