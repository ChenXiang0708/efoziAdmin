import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class IndexMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }


    isCollapsed = () => {
        if (document.body.clientWidth < 800) {
            this.setState({
                collapsed: true,
            })
            this.props.isFold(true)
        } else {
            this.setState({
                collapsed: false,
            })
            this.props.isFold(false)
        }

    }

    componentDidMount() {
        window.addEventListener('resize', this.isCollapsed)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.isCollapsed)
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
        this.props.isFold(collapsed)
    };

    render() {
        return (
            <Sider className='menu' collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className='adminName'>
                    <img className='logo' src={require('../../images/base/logo.png')} alt="" />
                    <span style={{ display: !this.state.collapsed ? "block" : "none" }}>佛子网</span>
                </div>
                <Menu
                    defaultSelectedKeys={['index']}
                    defaultOpenKeys={['article']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="index">
                        <Link to="/">
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="user"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>用户</span>
                            </span>
                        }
                    >
                        <Menu.Item key="user1">新增用户</Menu.Item>
                        <Menu.Item key="user2"><Link to="/user/list">用户列表</Link></Menu.Item>
                    </SubMenu>


                    <SubMenu
                        key="article"
                        title={
                            <span>
                                <Icon type="snippets" />
                                <span>文章</span>
                            </span>
                        }
                    >
                        <Menu.Item key="article1"><Link to="/article/create">新增文章</Link></Menu.Item>
                        <Menu.Item key="article2"><Link to="/article/list">文章列表</Link></Menu.Item>
                        <Menu.Item key="article3"><Link to="/article/category">文章分类</Link></Menu.Item>
                        <Menu.Item key="article4"><Link to="/article/region">文章位置</Link></Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="activity"
                        title={
                            <span>
                                <Icon type="snippets" />
                                <span>活动</span>
                            </span>
                        }
                    >
                        <Menu.Item key="activity1"><Link to="/activity/create">新增活动</Link></Menu.Item>
                        <Menu.Item key="activity2"><Link to="/activity/list">活动列表</Link></Menu.Item>
                        <Menu.Item key="activity3"><Link to="/activity/category">活动分类</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}




export default withRouter(IndexMenu);
