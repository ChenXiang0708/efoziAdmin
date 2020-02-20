export default function user(state = {list: []}, action) {
    if (action.type === 'setList') {
        state.list = action.list
    }
    if (action.type === 'userList/removeListUser') { // 原生的reducer只能靠action的type来判断执行哪个方法来修改数据。dvajs能够解决这个问题。
        state.list = state.list.filter(o => o.id !== action.id)
    }
    return {...state}
}