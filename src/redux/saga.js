import {all, put,  call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
// 
function* getList () {
    const list = yield call(() => {
        return axios.get('http://jsonplaceholder.typicode.com/users').then(o => o.data)
    })
    yield put({type: 'setList', list}) // 将或得到的数据用reducer设置到state
}
function* listenInit () {
    yield takeEvery('userList/init', getList) // 监听dispatch出来的action的type来执行其他的effect
}


// 
function* postRemoveUser (action) {
    let result = yield call((id) => axios.post('http://jsonplaceholder.typicode.com/users'), action.id)
console.log(result)
    result = true // 假设已成功
    if (result) {
        yield put({type: 'userList/removeListUser', id: action.id})
    }
}
function* listenRemove () {
    yield takeEvery('userList/remove', postRemoveUser)
}



export default function* rootSaga () {
    yield all([ // 合并所有saga
        listenInit(),
        listenRemove()
    ])
}
