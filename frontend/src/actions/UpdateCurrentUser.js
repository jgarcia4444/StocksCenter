
const updateCurrentUser = (json) => {
    const {user, user_stocks, user_video_ids} = json
    return {
        type: "GET_USER",
        currentUser: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
        }, 
        trackedStocks: user_stocks,
        userVideoIds: user_video_ids
    }
}

export default updateCurrentUser