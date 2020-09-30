const defaultState = {
    currentUser: {},
    trackedStocks: []
}

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case "TRACK_QUOTE":
            console.log(action.type)
            return {
                currentUser: state.currentUser,
                trackedStocks: state.trackedStocks.concat(action.stock)
            }
        case "USER_SIGNUP":
            return {
                trackedStocks: action.trackedStocks,
                currentUser: action.user
            }
        case "GET_USER":
            console.log(action)
            return {
                trackedStocks: action.trackedStocks,
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