const defaultState = {
    currentUser: {},
    trackedStocks: [],
    userVideoIds: []
}

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case "TRACK_STOCK":
            var stocks;
            if (state.trackedStocks.length > 0) {
                stocks = state.trackedStocks
            } else {
                stocks = []
            }
            return {
                ...state,
                currentUser: state.currentUser,
                trackedStocks: stocks.concat(action.stock)
            }
        case "USER_SIGNUP":
            return {
                userVideoIds: action.userVideoIds,
                trackedStocks: action.trackedStocks,
                currentUser: action.user
            }
        case "GET_USER":
            var stocks;
            if (action.trackedStocks.length > 0) {
                stocks = action.trackedStocks
            } else {
                stocks = []
            }
            return {
                ...state,
                trackedStocks: stocks,
                currentUser: action.currentUser
            }
        case "LOGOUT_USER":
            localStorage.removeItem("userId");
            return {
                ...defaultState
            }
        case 'LOAD_USER_VIDEOS':
            return {
                ...state,
                userVideoIds: action.userVideoIds
            }
        case "LIKE_VIDEO":
            return {
                ...state,
                userVideoIds: this.state.userVideoIds.concat(action.videoId)
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