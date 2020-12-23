const defaultState = {
    currentUser: {},
    stocks: [],
    trackedStocks: [],
    userVideoIds: [],
    videosToDisplay: [],
    loading: false
}

//

export default function reducer(state = defaultState, action) {
    var stocks;
    switch(action.type) {
        case "FETCHING_STOCKS":
            return {
                ...state,
                loading: true
            }
        case "ADD_STOCKS":
            return {
                ...state,
                loading: false,
                stocks: action.stocks
            }
        case "TRACK_STOCK":
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
                ...state,
                userVideoIds: action.userVideoIds,
                trackedStocks: action.trackedStocks,
                currentUser: action.user
            }
        case "GET_USER":
            if (action.trackedStocks.length > 0) {
                stocks = action.trackedStocks
            } else {
                stocks = []
            }
            return {
                ...state,
                userVideoIds: action.userVideoIds,
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
                userVideoIds: state.userVideoIds.concat(action.videoId)
            }
        case "UNLIKE_VIDEO":
            return {
                ...state,
                userVideoIds: state.userVideoIds.filter(videoId => videoId !== action.videoId)
            }
        case 'DELETE_STOCK':
            return {
                currentUser: state.currentUser,
                trackedStocks: state.trackedStocks.filter(stock => stock.stock_symbol !== action.stock_symbol)
            }
        case 'REMOVE_DISPLAYED_VIDEO':
            return {
                ...state,
                videosToDisplay: state.videosToDisplay.filter(video => video.id.videoId !== action.videoId)
            }
            case "LOAD_VIDEOS_TO_DISPLAY":
                return {
                    ...state,
                    videosToDisplay: action.videosToDisplay
                }
        default:
            return state
    }
}