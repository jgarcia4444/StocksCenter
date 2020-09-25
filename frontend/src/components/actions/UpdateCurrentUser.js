
const updateCurrentUser = (json) => {
    return {
        type: "GET_USER",
        currentUser: {
            id: json.id,
            firstName: json.first_name,
            lastName: json.last_name,
        }
    }
}

export default updateCurrentUser