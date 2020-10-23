const defaultState = {
    currentUser: {},
    trackedStocks: []
}

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case "TRACK_STOCK":
            var stocks;
            if (state.trackedStocks) {
                stocks = state.trackedStocks
            } else {
                stocks = []
            }
            return {
                currentUser: state.currentUser,
                trackedStocks: stocks.concat(action.stock)
            }
        case "USER_SIGNUP":
            return {
                trackedStocks: action.trackedStocks,
                currentUser: action.user
            }
        case "GET_USER":
            console.log(action)
            var stocks;
            if (action.trackedStocks.length > 0) {
                stocks = action.trackedStocks
            } else {
                stocks = []
            }
            return {
                trackedStocks: stocks,
                currentUser: action.currentUser
            }
        case "LOGOUT_USER":
            localStorage.removeItem("userId");
            return {
                trackedStocks: [],
                currentUser: {}
            }
        case 'DELETE_STOCK':
            return {
                currentUser: state.currentUser,
                trackedStocks: state.trackedStocks.filter(stock => stock.stock_symbol !== action.stock_symbol)
            }
            
        default:
            return state
    }
}