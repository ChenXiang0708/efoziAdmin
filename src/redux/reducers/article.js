export default function article(state = {list: []}, action) {
    if (action.type === 'setList') {
        state.list = action.list
    }
    if (action.type === 'articleList/removeListArticle') { // 原生的reducer只能靠action的type来判断执行哪个方法来修改数据。dvajs能够解决这个问题。
        state.list = state.list.filter(o => o.id !== action.id)
    }
    return {...state}
}