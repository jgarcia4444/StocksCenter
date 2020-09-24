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
                currentUser: {
                    id: 1,
                    name: "Test"
                },
                trackedStocks: state.trackedStocks.concat(action.stock)
            }
        default:
            return state
    }
}