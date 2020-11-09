
const updateCurrentUser = (json) => {
    const {user, user_stocks, user_videos} = json
    return {
        type: "GET_USER",
        currentUser: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
        }, 
        trackedStocks: user_stocks,
        userVideoIds: user_videos
    }
}

export default updateCurrentUser