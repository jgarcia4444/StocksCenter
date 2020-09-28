
const updateCurrentUser = (json) => {
    const {user} = json
    return {
        type: "GET_USER",
        currentUser: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
        }
    }
}

export default updateCurrentUser