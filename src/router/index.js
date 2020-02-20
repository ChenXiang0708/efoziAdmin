
import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import {asyncComponent} from '../store'

import { Provider } from 'react-redux'
import store from '../redux/index'

const Index = asyncComponent(() => import('../pages/index/index'));
const Error = asyncComponent(() => import('../pages/base/404'));
const Login = asyncComponent(() => import('../pages/base/login'));

const UserList = asyncComponent(() => import('../pages/user/user'))
const CreateUser = asyncComponent(() => import('../pages/user/create'))
const CarouseList = asyncComponent(() => import('../pages/carousel/carousel'))
const ArticleList = asyncComponent(() => import('../pages/article/article'))
const ArticleUpdate = asyncComponent(() => import('../pages/article/update'))
const ArticleCreate = asyncComponent(() => import('../pages/article/create'))
const ArticleCategory = asyncComponent(() => import('../pages/article/category'))
const ArticleRegion = asyncComponent(() => import('../pages/article/region'))

const ActivityList = asyncComponent(() => import('../pages/activity/activity'))
const ActivityCreate = asyncComponent(() => import('../pages/activity/create'))
const ActivityCategory = asyncComponent(() => import('../pages/activity/type'))

export default () => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/" render={({ history, location, match }) => (
                    sessionStorage.getItem("isLogin") ? (
                        <Index history={history} location={location} match={location}>
                            <Route title='用户' name='用户列表' path="/user/list" component={UserList} />
                            <Route title='用户' name='新增用户'  path="/user/create" component={CreateUser} />
                            <Route title='轮播' name='轮播管理'  path="/carousel/index" component={CarouseList} />
                            <Route title='文章' name='文章列表'  path="/article/list" component={ArticleList} />
                            <Route title='文章' name='修改文章'  path="/article/update/:id" component={ArticleUpdate} />
                            <Route title='文章' name='新增文章'  path="/article/create" component={ArticleCreate} />
                            <Route title='文章' name='文章分类'  path="/article/category" component={ArticleCategory} />
                            <Route title='文章' name='布局管理'  path="/article/region" component={ArticleRegion} />
                            <Route title='活动' name='活动列表'  path="/activity/list" component={ActivityList} />
                            <Route title='活动' name='新增活动'  path="/activity/create" component={ActivityCreate} />
                            <Route title='活动' name='修改活动'  path="/activity/update/:id" component={ActivityCreate} />
                            <Route title='活动' name='活动分类'  path="/activity/category" component={ActivityCategory} />
                        </Index>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login"
                                }}
                            />
                        )
                )}>

                </Route>
                <Route exact component={Error} />
            </Switch>
        </HashRouter>
    </Provider>
)




