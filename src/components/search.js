import React from 'react';
import {Input, Select } from 'antd';
import { Link, withRouter } from 'react-router-dom';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSearchValue: 'article',
            selectSearchList: [{ name: '文章', value: 'article' }, { name: '活动', value: 'activity' }, { name: '用户', value: 'user' }]
        }
    }
    search = (value) => {
        if (value === '') {
            return false
        }
        this.props.history.push({ pathname: `/${this.state.selectSearchValue}/list`, state: { value } })
    };

    selectSearch = (value) => {
        this.setState({
            selectSearchValue: value
        })
    };
    render() {
        return (
            <Input.Group compact>
                <Select defaultValue={this.state.selectSearchValue} onChange={this.selectSearch}>
                    {this.state.selectSearchList.map((item, key) => (
                        <Select.Option key={key} value={item.value}>{item.name}</Select.Option>
                    ))}
                </Select>
                <Input.Search style={{ width: '80%' }} placeholder="请输入搜索内容" onSearch={this.search} enterButton />
            </Input.Group>
        )
    }
}

export default withRouter(Search);
