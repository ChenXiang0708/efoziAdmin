export default function login(state = {
    isLogin : {

    },
}, action) {
    if (action.type === 'LOGIN_LOGIN') {
        state.isLogin = action
    }

    return {...state}
}