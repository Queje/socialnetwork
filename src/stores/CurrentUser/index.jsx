const CurrentUser = ({id, username, email, loggedin}) => {
    return {
        type: 'CurrentUser',
        id: id,
        username: username,
        email: email,
        loggedin: loggedin
    }
}

export default CurrentUser;