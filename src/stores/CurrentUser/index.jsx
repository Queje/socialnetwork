const CurrentUser = ({id, username, email}) => {
    return {
        type: 'CurrentUser',
        id: id,
        username: username,
        email: email,
    }
}

export default CurrentUser;