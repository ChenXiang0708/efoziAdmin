import {combineReducers} from 'redux'
import userRender from './user'
import articleRender from './article'
import loginRender from './login'
const allReducers = {
    userRender,articleRender,loginRender
}

export default combineReducers(allReducers)
