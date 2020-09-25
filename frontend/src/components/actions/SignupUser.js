

const signupUser = (user) => {
    return {
        type: 'USER_SIGNUP',
        user: {
            firstName: user.first_name,
            lastName: user.last_name,
            id: user.id
        }
    }
}

export default signupUser