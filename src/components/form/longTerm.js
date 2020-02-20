import React, { Component } from 'react';
import {Slider, Divider, Input, Form, Button, Row, Col, Cascader, DatePicker, Switch} from 'antd';
import  {article,activity} from '../../api'
import { city } from "../../store"

class LongTerm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            scaleDisabled: true,
            costDisabled: true,
            activityItem: {},
            ActivityTypeList: [],
            activityType: '',
            cost: '',
            date: '',
            contactArray: [{ contact: '', phone: '' }]
        };
    }


    componentWillMount() {
        console.log(this)
        this.getActivityTypeList();
    }

    getActivityTypeList() {
        activity.list_type().then(res => {
            res.data.map((item, index) => {
                item.key = index
            });
            console.log(res.data)
            this.setState({
                ActivityTypeList: res.data
            });
        })
    }


    dateChange = (date, dateString) => {
        this.setState({
            date: dateString
        })
    };

    submit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
        });
    };

    handleScaleDisabled = (disabled) => {
        this.setState({ scaleDisabled: disabled });
        if (disabled) {
            this.props.form.setFieldsValue({
                scale: [0, 0]
            })
        } else {
            this.props.form.setFieldsValue({
                scale: void 0
            })
        }
    };
    handleCostDisabled = (disabled) => {
        this.setState({ costDisabled: disabled });
        if (disabled) {
            this.props.form.setFieldsValue({
                cost: 0
            })
        } else {
            this.props.form.setFieldsValue({
                cost: void 0
            })
        }
    }



    render() {
        const { getFieldProps, getFieldDecorator } = this.props.form;
        const columns = [
            { title: '分类', width: 200, dataIndex: 'name' },
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
            <div className="LongTerm">
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onSubmit={this.submit}>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="标题">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入标题' }],
                                })(<Input allowClear />)}
                            </Form.Item>
                            <Form.Item label="活动介绍">
                                {getFieldDecorator('introduce', {
                                    rules: [{ required: true, message: '请输入活动介绍' }],
                                })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Form.Item>
                            <Form.Item label="费用">
                                <Row>
                                    <Col span={3}>
                                        <Switch checkedChildren="免费" unCheckedChildren="选择"
                                            checked={this.state.costDisabled}
                                            onChange={this.handleCostDisabled} />
                                    </Col>
                                    <Col offset={1} span={20}>
                                        {getFieldDecorator('cost', {
                                            rules: [{ required: true, message: '请选择是否免费' }],
                                        })(
                                            <Slider max={2000} disabled={this.state.costDisabled} />
                                        )}
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="时间">
                                {getFieldDecorator('time', {
                                    rules: [{ required: true, message: '请选择活动开始时间-活动结束时间' }],
                                })(
                                    <DatePicker.RangePicker
                                        onChange={this.dateChange}
                                        format={'YYYY/MM/DD'}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="活动规模:">
                                <Row>
                                    <Col span={3}>
                                        <Switch checkedChildren="不限" unCheckedChildren="选择"
                                            checked={this.state.scaleDisabled}
                                            onChange={this.handleScaleDisabled} />
                                    </Col>
                                    <Col offset={1} span={20}>
                                        {getFieldDecorator('scale', {
                                            rules: [{ required: true, message: '请选择活动规模' }],
                                        })(
                                            <Slider range max={200} disabled={this.state.scaleDisabled} />
                                        )}
                                    </Col>
                                </Row>

                            </Form.Item>
                            <Form.Item label="城市">
                                {getFieldDecorator('city', {
                                    rules: [{ required: true, message: '请选择活动城市' }],
                                })(
                                    <Cascader options={city} placeholder="请选择省市区" />
                                )}
                            </Form.Item>
                            <Form.Item label="地点">
                                {getFieldDecorator('site', {
                                    rules: [{ required: true, message: '请输入具体地址' }],
                                })(<Input allowClear />)}
                            </Form.Item>
                            {this.state.contactArray.map((item, index) => (
                                <Form.Item key={index} label="联系">
                                    <Row>
                                        <Col span={10}>
                                            <Form.Item>
                                                {getFieldDecorator(`contact${index}`, {
                                                    rules: [{ required: true, message: '请输入联系人姓名' }],
                                                })(<Input placeholder="联系人姓名" />)}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item>
                                                {getFieldDecorator(`phone${index}`, {
                                                    rules: [{ required: true, message: '请输入联系方式' }],
                                                })(<Input placeholder="联系方式" />)}
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            {
                                                this.state.contactArray.length === index + 1 && this.state.contactArray.length !== 1 ?
                                                    <Button type="primary" icon="minus"
                                                        onClick={() => {
                                                            let { contactArray } = this.state;
                                                            contactArray.pop({ contact: '', phone: '' })
                                                            this.setState({
                                                                contactArray: contactArray
                                                            })
                                                        }}
                                                    /> :
                                                    index + 1 === 1 ? <Button type="primary" icon="plus"
                                                        onClick={() => {
                                                            let { contactArray } = this.state;
                                                            contactArray.push({
                                                                contact: '',
                                                                phone: ''
                                                            });
                                                            this.setState({
                                                                contactArray: contactArray
                                                            })
                                                        }}
                                                    /> : null

                                            }
                                        </Col>


                                    </Row>
                                </Form.Item>
                            ))}

                            <Form.Item label="寺院">
                                {getFieldDecorator('temple')(<Input allowClear />)}
                            </Form.Item>
                            ;
                                <Form.Item label="要求">
                                {getFieldDecorator('requirement')(<Input.TextArea
                                    autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Form.Item>
                            <Form.Item label="路线">
                                {getFieldDecorator('path')(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Form.Item>
                            <Form.Item label="备注">
                                {getFieldDecorator('remark')(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}
export default Form.create()(LongTerm);
