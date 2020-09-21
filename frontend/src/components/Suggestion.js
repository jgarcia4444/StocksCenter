import React from 'react';

const Suggestion = (props) => {

    let {stock} = props
    return (
        <div key={stock.symbol} className="suggestion-conatiner">
            <h4 className="suggestion-stock-name">{stock.name}</h4>
            <small className="suggestion-stock-symbol">{stock.symbol}</small>
        </div>
    )
}

export default Suggestion;