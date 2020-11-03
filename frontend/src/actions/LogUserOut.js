const logUserOut = () => {

    return {
        type: 'LOGOUT_USER',
        action: {
            id: localStorage.getItem("userId")
        }
    }

}

export default logUserOut;