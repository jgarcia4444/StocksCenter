import React from 'react';

const StockDetails = (props) => {

    let {
        open, 
        close,
        high,
        low,
        volume,
        date
    } = props.stockInfo

    return (
        <div className="stock-details container">
            <div className="row">
                <div className="col-6">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h6>Open</h6>
                            </div>
                            <div className="col-12">
                                <p>{open}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h6>Close</h6>
                            </div>
                            <div className="col-12">
                                <p>{close}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h6>High</h6>
                            </div>
                            <div className="col-12">
                                <p>{high}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h6>Low</h6>
                            </div>
                            <div className="col-12">
                                <p>{low}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h6>Volume</h6>
                            </div>
                            <div className="col-12">
                                <p>{volume}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h6>Date</h6>
                            </div>
                            <div className="col-12">
                                <p>{date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StockDetails;