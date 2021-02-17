import { createStore } from 'redux';

const initialState = {
    id: "not logged in",
    username: "not logged in",
    email: "not logged in",
    loggedin: false
 }

const Reducer = (state , payload) => {
    const { type, id, username, email, loggedin } = payload;

    switch(type) {
        case 'CurrentUser':
            return state = {id, username, email, loggedin};
        default:
            return state = initialState;
    }
    return state;
}

export default createStore(Reducer);