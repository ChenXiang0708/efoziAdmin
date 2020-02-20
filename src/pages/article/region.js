import React, { Component } from 'react';
import { Table,Divider,Tag ,Pagination,Modal} from 'antd';
import {ant} from '../../store';
import {article} from '../../api'
export default class ArticleCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta:''
        };
    }
    componentWillMount() {
        this.getList()
    }

    getList(page,length=10){
        article.list_region({page,length}).then(res=>{
            res.data.map((item,index)=>{
                item.key=index
            });

            this.setState({
                listData:res.data,
                meta:res.meta
            })
        })
    }

    deleteItem(itemId){
        ant.Confirm('确定要删除吗?',itemId, ()=>{
            article.delete_region(itemId).then(res=>{
                ant.Alert('success','删除成功');
                this.getList(1,this.state.pageSize)
            })
        })
    }

    render() {
        const columns = [
            { title: '姓名', width: 200, dataIndex: 'name' },
            {
                title: '操作', key: 'operation',
                render: (record) => <span>
                    <a>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.deleteItem.bind(this, record.id)}>删除</a>
                </span>,
            },
        ];
        return (
            <div className="ArticleCategory__container">
                <div className="ArticleCategory">
                    <Table columns={columns} pagination={false}
                           dataSource={this.state.listData} />
                </div>
            </div>
        );
    }
}


