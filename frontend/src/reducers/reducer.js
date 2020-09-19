const defaultState = {
    currentUser: {}
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
        default:
            return state
    }
}