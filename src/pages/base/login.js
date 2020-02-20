import React,{Component} from "react";
import './login.scss'
import {session} from '../../api'

import md5 from "blueimp-md5";
import {ant} from "../../store";

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'123',
            password:'123'
        }
    }

    login = () => {
        session.login({username:this.state.username,password:md5(this.state.password)}).then(res=>{
            sessionStorage.setItem("token",res.data[0].token);
            sessionStorage.setItem("isLogin",true);
            this.props.history.push({pathname: `/`});
            ant.Alert('success','欢迎回来!')
        })
    };

    changeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    changePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="Login">
                    <div className="title">后台登录</div>
                    <input onChange={this.changeUsername.bind(this)} className="Login__input username" type="text"     placeholder="用户名" />
                    <input onChange={this.changePassword.bind(this)} className="Login__input password" type="password" placeholder="密码"/>
                    <button className="loginBtn" onClick={this.login}>登录</button>
                </div>
            </div>
        );
    }
}

export default Login;





