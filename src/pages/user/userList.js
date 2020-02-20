import React, { Component } from "react";
import { Table, Divider, Tag,message } from 'antd';
import {user_item} from '../../api/index'
import { Alert  } from 'antd';
import ajax from '../../store/http';
import axios from "axios";
import config from "../../config";
export default class UserList extends Component {
    constructor(props){
        super(props);
        this.state={
            userList:[]
        }
    }

    componentDidMount() {
        axios({
            url:'http://localhost:1111/admin/user/items',
        }).then(res=>{
            let result=[];
            res.data.data.map(item=>{
                result.push({
                    key:item.id,
                    name:item.username,
                    address:item.petname,
                    age:item.petname,
                })
            })

            this.setState({
                userList:result
            })
        })


    }




    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
        <a>删除</a>
        <Divider type="vertical" />
        <a>查看</a>
      </span>
                ),
            },
        ];


        return (
            <div>
                <Table columns={columns} dataSource={this.state.userList} />
                {/*<Table columns={columns} dataSource={data} />*/}
            </div>
        );
    }
}

