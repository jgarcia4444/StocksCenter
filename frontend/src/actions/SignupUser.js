

const signupUser = (data) => {
    let { user, user_stocks } = data
    console.log(user_stocks)
    return {
        type: 'USER_SIGNUP',
        user: {
            firstName: user.first_name,
            lastName: user.last_name,
            id: user.id
        },
        trackedStock: user_stocks
    }
}

export default signupUser