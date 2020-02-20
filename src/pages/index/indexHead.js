import React from 'react'
import screenfull from 'screenfull';
import *as session from '../../api/session'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
const { Header } = Layout;

class IndexHead extends React.Component {
    logout = () => {
        session.logout().then(res => {
            sessionStorage.removeItem("isLogin");
            sessionStorage.removeItem("token");
            this.props.history.push(`/login`);
        })
    };

    screenFull = () => {
        screenfull.request();
    };
    render() {
        const menus = (
            <Menu>
                <Menu.Item key="0" onClick={this.screenFull}>11
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" onClick={this.logout}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <Icon onClick={this.screenFull} className='full' type="fullscreen" />
                <Dropdown overlay={menus}>
                    <Avatar icon="user" />
                </Dropdown>
            </Header>
        );
    }
}

export default withRouter(IndexHead);