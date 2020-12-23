
const fetchStocks = () => {
    let apiKey = process.env.REACT_APP_STOCKS_API_KEY
    let baseUrl = "http://api.marketstack.com/v1"
    return (dispatch) => {
        dispatch({type: "FETCHING_STOCKS"});
        fetch(`${baseUrl}/tickers?access_key=${apiKey}`)
            .then(res => res.json())
            .then(json => dispatch({type: "ADD_STOCKS", stocks: json.data}))
    }
}

export default fetchStocks;