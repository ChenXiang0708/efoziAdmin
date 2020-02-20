import React, { Component } from 'react';

import { activity } from '../../api'
import { Table, Divider, Pagination } from 'antd';
import { ant } from '../../store';

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: '',
            pageSize: 10,
            placeList: [],
            pagination: false
        };
    }

    componentDidMount() {
        this.getList(1)
    }


    getList(page, length = this.state.pageSize) {
        activity.list_activity({ page, length }).then(res => {
            let list_activity = res.data;
            list_activity.map(item => {
                item.key = item.id;
                item.cost = item.cost == 0 ? '免费' : item.cost + '元';
                item.scale = item.scale == 0 ? '不限' : item.scale + '人';
                let area = item.city.split(',');
                if (area[0] == area[1]) area.shift();
                item.city = area
            })
            let meta = res.meta;
            this.setState({
                placeList: res.data,
                listData: list_activity,
                meta: meta,
                pagination: list_activity.length == 0 ? true : false
            })
        })
    }

    pageChange(page) {
        this.getList(page)
    }

    onShowSizeChange(page, pageSize) {
        this.setState({
            pageSize: pageSize
        });
        this.getList(page, pageSize)
    }
    deleteItem(itemId) {
        ant.Confirm('确定要删除吗?', itemId, () => {
            activity.delete_activity(itemId).then(res => {
                ant.Alert('success', '删除成功');
                this.getList(1, this.state.pageSize)
            })
        })
    }

    updateItem(itemId) {
        this.props.history.push({ pathname: `/activity/update/${itemId}` });
    }

    render() {
        const columns = [
            { title: '标题', width: 200, dataIndex: 'title' },
            // { title: '发布者', width: 100, dataIndex: 'issue' },
            { title: '开始时间', width: 150, dataIndex: 'start_time' },
            { title: '截止时间', width: 150, dataIndex: 'end_time' },
            { title: '城市', width: 200, dataIndex: 'city' },
            { title: '费用', dataIndex: 'cost' },
            { title: '规模', dataIndex: 'scale' },
            { title: '浏览量', dataIndex: 'pv' },
            {
                title: '操作', key: 'operation',
                render: (record) => <span>
                    <a onClick={this.updateItem.bind(this, record.id)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.deleteItem.bind(this, record.id)}>删除</a>
                </span>,
            },
        ];

        return (
            <div className="Activity__container">
                <div className="Activity">
                    <Table columns={columns} pagination={false}
                        expandedRowRender={record => <div>
                            <p style={{ margin: 0 }}>要求:{record.requirement}</p>
                            <br/> 
                            <p style={{ margin: 0 }}>备注:{record.remark}</p>
                            </div>}
                        dataSource={this.state.listData} />
                    <Pagination
                        className='pagination'
                        hideOnSinglePage={this.state.pagination}
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        onChange={this.pageChange.bind(this)} defaultCurrent={this.state.pageIndex}
                        total={this.state.meta.total} />
                </div>
            </div>
        );
    }
}


