
const updateCurrentUser = (json) => {
    const {user, user_stocks} = json
    return {
        type: "GET_USER",
        currentUser: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
        }, 
        trackedStocks: user_stocks
    }
}

export default updateCurrentUser