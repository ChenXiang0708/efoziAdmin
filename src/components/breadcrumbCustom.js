import React from 'react';
import { Breadcrumb } from 'antd';
import { Link,withRouter } from 'react-router-dom';
class BreadcrumbCustom extends React.Component {
    render() {
        let [matchModuleName,matchFunctionName,matchPathName,pathName] = [null,null,'',this.props.location.pathname];
        if (pathName !== '/') {
            if (pathName.split('/').length >= 4) {// 路由带参数的情况 /a/b/:name
                matchPathName = pathName.substr(0, pathName.lastIndexOf('/'))
            } else {
                matchPathName = pathName
            }
            let match = this.props.children.find(item => {
                let stringIndexOf = item.props.path.indexOf(':');//判断目前所在的路由是否存在:name的情况
                if (stringIndexOf !== -1) {
                    return item.props.path.substr(0, (stringIndexOf - 1)) == matchPathName
                } else {
                    return item.props.path == matchPathName
                }
            }).props
            matchModuleName = <Breadcrumb.Item>{match.title}</Breadcrumb.Item>
            matchFunctionName = <Breadcrumb.Item>{match.name}</Breadcrumb.Item>
        }
        return (
            <Breadcrumb>
                <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                {matchModuleName}
                {matchFunctionName}
            </Breadcrumb>
        )
    }
}

export default withRouter(BreadcrumbCustom);
