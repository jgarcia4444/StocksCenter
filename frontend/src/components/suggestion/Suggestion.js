import React from 'react';
import './Suggestion.css'

const Suggestion = (props) => {

    let {stock} = props

    return (
        <div onClick={() => props.handleClick(stock)} key={stock.symbol} className="suggestion-conatiner container">
            <div className="row">
                <div className="col-4">
                    <small>Ticker</small>
                    <h6>{stock.symbol}</h6>
                </div>
                <div className="col-8">
                    <small>Company Name</small>
                    <h6>{stock.name}</h6>
                </div>
            </div>
        </div>
    )
}

export default Suggestion;