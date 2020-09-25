const defaultState = {
    currentUser: {},
    trackedStocks: []
}

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case "USER_LOGIN_ATTEMPT":
            console.log(action.type)
            return {
                currentUser: {
                    name: "Test"
                }
            }
        case "TRACK_QUOTE":
            console.log(action.type)
            return {
                ...state.currentUser,
                trackedStocks: state.trackedStocks.concat(action.stock)
            }
        case "USER_SIGNUP":
            console.log(action.type)
            return {
                ...state.trackedStocks,
                currentUser: action.user
            }
        default:
            return state
    }
}