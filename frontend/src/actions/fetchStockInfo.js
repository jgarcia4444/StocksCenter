import fetchStocks from "./fetchStocks"

const fetchStockInfo = (stock) => {
    let key = process.env.REACT_APP_STOCKS_API_KEY
    let baseUrl = "http://api.marketstack.com/v1"
    return (dispatch) => {
        dispatch({type: "FETCHING__SUGGESTED_STOCK_DETAILS"});
        fetch(`${baseUrl}/eod/latest?access_key=${key}&symbols=${stock.symbol}`)
        .then(res => res.json())
        .then(json => dispatch({type: "FETCHED_SUGGESTED_STOCK_INFO", stockInfo: json.data[0]}))
    }
}

export default fetchStockInfo;