import React, {Component} from 'react';

import {article} from '../../api'
import {Table, Divider, Tag, Pagination, Modal, Select, Icon, Button} from 'antd';
import {ant} from '../../store';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: '',
            pageSize: 10,
            placeList: []
        };
    }

    componentDidMount() {
        this.getList(1)
    }


    getList(page, length = this.state.pageSize) {
        article.list_article({page, length}).then(res => {
            let list_article = res.data;
            let meta = res.meta;
            article.list_region().then(res => {
                let list_place = res.data;
                for (let i = 0; i < list_article.length; i++) {
                    list_article[i].key = i;
                    for (let j = 0; j < list_place.length; j++) {
                        if (list_article[i].region_id == list_place[j].id) {
                            list_article[i].region_name = list_place[j].name;
                            continue;
                        }
                    }
                }
                this.setState({
                    placeList: list_place,
                    listData: list_article,
                    meta: meta
                })
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

    regionSelect(row, region_id) {
        article.update_region({id: row.id, region_id: region_id}).then(res => {
            ant.Alert('success', '更改文章位置成功')
        })
    }

    deleteItem(itemId) {
        ant.Confirm('确定要删除吗?', itemId, () => {
            article.delete_category(itemId).then(res => {
                ant.Alert('success', '删除成功');
                this.getList(1, this.state.pageSize)
            })
        })
    }

    updateItem(itemId) {
        this.props.history.push({pathname: `/article/update/${itemId}`});
    }

    render() {
        const columns = [
            {title: '标题', width: 200, dataIndex: 'title'},
            {title: '作者', width: 100, dataIndex: 'author'},
            {title: '文章分类', width: 100, dataIndex: 'category_name'},
            {title: '浏览量', dataIndex: 'pv'},
            {
                title: '文章位置', dataIndex: 'region_name', render: (record, row) =>
                    <Select  defaultValue={record} style={{width: 160}}
                            onChange={this.regionSelect.bind(this, row)}>
                        {this.state.placeList.map((item, index) => (
                            <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
            },
            {
                title: '操作', key: 'operation',
                render: (record) => <span>
                                <a onClick={this.updateItem.bind(this, record.id)}>修改</a>
                                <Divider type="vertical"/>
                                <a onClick={this.deleteItem.bind(this, record.id)}>删除</a>
                              </span>,
            },
        ];

        return (
            <div className="Article__container">
                <div className="Article">
                    <Table columns={columns} pagination={false}
                           expandedRowRender={record => <p style={{margin: 0}}>{record.content}</p>}
                           dataSource={this.state.listData}/>
                    <Pagination
                        className='pagination'
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        onChange={this.pageChange.bind(this)} defaultCurrent={this.state.pageIndex}
                        total={this.state.meta.total}/>
                </div>
            </div>
        );
    }
}


