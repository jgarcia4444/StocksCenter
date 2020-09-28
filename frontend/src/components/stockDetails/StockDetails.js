import React from 'react';
import './StockDetails.css'

const StockDetails = (props) => {
    let {
        open, 
        close,
        high,
        low,
        volume,
        date
    } = props.stockInfo

    const formatNumArray = (arr) => {
        var counter = 0
        let formattedArray = arr.map((num, i) => {
            if (counter === 2 && i !== arr.length - 1) {
                counter = 0
                if (arr.length % 3 === 0) {
                    return num + ','
                } else {
                    return "," + num 
                }
            } else {
                counter += 1
                return num
            }
        })
        return formattedArray;
    }

    const formattedVolume = () => {

        let numString = volume.toString()
        
        if (numString.length % 3 === 0) {
            let numArray = numString.split("")
            let formattedArray = formatNumArray(numArray)
            return formattedArray.join("")
        } else {
            let numArray = numString.split("").reverse()
            let reverseNumArray = formatNumArray(numArray)
            return reverseNumArray.reverse().join("")
        }
    }

    const formatDate = () => {
        let newDate = new Date(date)
        let formattedDate = newDate.toDateString()
        return formattedDate
    }

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
                                <p>${open}</p>
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
                                <p>${close}</p>
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
                                <p>${high}</p>
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
                                <p>${low}</p>
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
                                <p>{formattedVolume()}</p>
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
                                <p>{formatDate()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StockDetails;