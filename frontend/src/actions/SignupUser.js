//

const signupUser = (data) => {
    let { user, user_stocks, user_videos } = data
    return {
        type: 'USER_SIGNUP',
        user: {
            firstName: user.first_name,
            lastName: user.last_name,
            id: user.id
        },
        trackedStocks: user_stocks,
        userVideoIds: user_videos
    }
}

export default signupUser