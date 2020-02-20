import React, {Component} from 'react';
import {Table, Divider, Button, Modal, Input} from 'antd';
import {ant} from '../../store';
import {activity} from '../../api'
export default class ArticleCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,

            createTypeName: '',
            updateTypeName: '',
            updateDetail:''
        };
    }

    componentWillMount() {
        this.getList()
    }

    getList() {
        activity.list_type().then(res => {
            res.data.map((item, index) => {
                item.key = index
            });

            this.setState({
                listData: res.data
            })
        })
    }

    createType = () => {
        if (this.state.createTypeName === '') {
            ant.Alert('fail', '请输入内容');
            return
        }
        activity.create_type(this.state.createTypeName).then(res => {
            ant.Alert('success', '创建成功');
            this.getList();
            this.setState({
                createVisible: false,
                createTypeName: ''
            })
        })
    }

    deleteItem(itemId) {
        ant.Confirm('确定要删除吗?', itemId, () => {
            activity.delete_type(itemId).then(res => {
                ant.Alert('success', '删除成功');
                this.getList(1, this.state.pageSize)
            })
        })
    }
    updateType=()=>{
        console.log(this.state.updateDetail)
        if (this.state.updateTypeName === '') {
            ant.Alert('fail', '请输入内容');
            return
        }
        activity.update_type({name:this.state.updateTypeName,id:this.state.updateDetail.id}).then(res => {
            ant.Alert('success', '修改成功');
            this.getList();
            this.setState({
                updateVisible: false,
                updateTypeName: ''
            })
        })
    }


    render() {
        const columns = [
            {title: '姓名', width: 200, dataIndex: 'name'},
            {
                title: '操作', key: 'operation',
                render: (record) => <span>
                    <a onClick={() => {
                            this.setState({
                                updateVisible: true,
                                updateDetail:record,
                                updateTypeName:record.name
                            })
                        }
                    }>修改</a>
                    <Divider type="vertical"/>
                    <a onClick={this.deleteItem.bind(this, record.id)}>删除</a>
                </span>,
            },
        ];
        return (
            <div className="ArticleCategory__container">
                <div className="ArticleCategory">

                    <Modal
                        visible={this.state.updateVisible}
                        title="修改活动详情"
                        width={300}
                        onOk={this.updateType}
                        onCancel={() => {
                            this.setState({
                                updateVisible: false
                            })
                        }}
                    >
                        <Input
                            value={this.state.updateTypeName}
                            onChange={(e) => {
                                this.setState({
                                    updateTypeName: e.target.value,
                                });
                            }}
                            placeholder='请输入活动类型' allowClear/>
                    </Modal>

                    <Modal
                        visible={this.state.createVisible}
                        title="新增活动"
                        width={300}
                        onOk={this.createType}
                        onCancel={() => {
                            this.setState({
                                createVisible: false
                            })
                        }}
                    >
                        <Input
                            value={this.state.createTypeName}
                            onChange={(e) => {
                                this.setState({
                                    createTypeName: e.target.value,
                                });
                            }}
                            placeholder='请输入活动类型' allowClear/>
                    </Modal>

                    <Button type="primary" className='topCreateBtn' onClick={() => {
                        this.setState({
                            createVisible: true
                        })
                    }}>新增</Button>
                    <Table columns={columns} pagination={false}
                           dataSource={this.state.listData}/>
                </div>
            </div>
        );
    }
}


