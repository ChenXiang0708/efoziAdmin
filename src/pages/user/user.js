import React, {Component} from 'react';
import {user} from '../../api'
import { Table,Divider,Tag ,Pagination,Modal} from 'antd';
import {ant} from '../../store';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta:''
        };
    }
    componentWillMount() {
        this.getList(1)
    }

    getList(page,length=10){
        user.list_user({page,length}).then(res=>{
            res.data.map((item,index)=>{
                item.key=index
            });
        
            this.setState({
                listData:res.data,
                meta:res.meta
            })
        })
    }

    pageChange(page){
        this.getList(page)
    }

    onShowSizeChange(page, pageSize) {
        console.log(page)
        console.log(pageSize)
        // this.getList(page,pageSize)
    }

    deleteItem(itemId){
        ant.Confirm('确定要删除吗?',itemId, ()=>{

            this.getList(2)
            // user.delete_user(itemId).then(res=>{
            //     Alert('success','删除成功');
            //     this.getList(1)
            // })
        })
    }

    render() {

        const columns = [
            {title: '姓名',width: 200,dataIndex: 'name'},
            {title: 'sex',width: 100,dataIndex: 'sex'},
            {title: '操作',key: 'operation',
                render: (record) => <span>
                                <a>修改</a>
                                <Divider type="vertical" />
                                <a onClick={this.deleteItem.bind(this,record.id)}>删除</a>
                              </span>,
            },
        ];
        return (
            <div className="Article__container">
                <div className="Article">
                    <Table columns={columns} pagination={false}
                           expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}
                           dataSource={this.state.listData} />

                    <Pagination
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        onChange={this.pageChange.bind(this)}  defaultCurrent={this.state.pageIndex} total={this.state.meta.total} />
                   
                </div>
            </div>
        );
    }
}


