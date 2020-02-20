import React, { Component } from 'react';
import { Slider, Input, Form, Button, Row, Col, Cascader, DatePicker, Switch, Select } from 'antd';
import { activity } from '../../api'
import { city, ant } from "../../store"
import moment from 'moment';
class ActivityCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            visible: true,
            scaleDisabled: true,
            costDisabled: true,
            activityItem: {},
            ActivityTypeList: [],
            activityType: '',
            cost: '',
            date: [],
            updateShowDate: [],//更改时参加时间显示.只用到一次
            contactArray: [{ contact: '', phone: '' }]
        };
    }


    componentWillMount() {
        if (this.props.match.params.id) {
            activity.get_activity(this.props.match.params.id).then(res => {
                let activityItem = res.data[0];
                activityItem.city = activityItem.city.split(',');
                activityItem.contact = activityItem.contact.split(',');
                activityItem.phone = activityItem.phone.split(',');

                let arr = []
                activityItem.contact.forEach((item, index) => {
                    arr.push({ [`contact${index}`]: activityItem.contact[index], [`phone${index}`]: activityItem.phone[index] })
                    setTimeout(() => {
                        this.props.form.setFieldsValue({ [`contact${index}`]: activityItem.contact[index], [`phone${index}`]: activityItem.phone[index] })
                    }, 0)
                })
                this.setState({
                    id: this.props.match.params.id,
                    scaleDisabled: activityItem.scale == 0 ? true : false,
                    costDisabled: activityItem.cost == 0 ? true : false,
                    contactArray: arr,
                    updateShowDate: [moment(activityItem.start_time, "YYYY-MM-DD HH:mm"), moment(activityItem.end_time, "YYYY-MM-DD HH:mm")],
                    date: [activityItem.start_time, activityItem.end_time],
                    activityItem
                })
            })
        }
        this.getActivityTypeList();
    }

    getActivityTypeList() {
        activity.list_type().then(res => {
            res.data.map((item, index) => {
                item.key = index
            });
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

            if (!err) {
                let [contact, phone] = [[], []];
                for (let i = 0; i < 3; i++) {
                    if (values[`contact${i}`] && values[`phone${i}`]) {
                        contact.push(values[`contact${i}`])
                        phone.push(values[`phone${i}`])
                    }
                    delete values[`contact${i}`]
                    delete values[`phone${i}`]
                }
                values.contact = contact
                values.phone = phone
                values.start_time = this.state.date[0]
                values.end_time = this.state.date[1];
                delete values.time;

                console.log(values)
                if (this.state.id) {
                    values.id = this.state.id
                    activity.update_activity(values).then(res => {
                        ant.Alert('success', '更新成功');
                    })
                } else {
                    activity.create_activity(values).then(res => {
                        ant.Alert('success', '发布成功');
                        this.props.history.push('/activity/list')
                    })
                }
            }
        });
    };

    handleScaleDisabled = (disabled) => {
        this.setState({ scaleDisabled: disabled });
        this.props.form.setFieldsValue({
            scale: 0
        })
    };
    handleCostDisabled = (disabled) => {
        this.setState({ costDisabled: disabled });
        this.props.form.setFieldsValue({
            cost: 0
        })
    }

    isZero = (state, num) => {
        let disable = `${state}Disabled`
        if (num == 0) {
            this.setState({
                [disable]: true
            })
        } else {
            this.setState({
                [disable]: false
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ShortTerm">
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onSubmit={this.submit}>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="活动类型">
                                {getFieldDecorator('type_id', {
                                    rules: [{ required: true, message: '请选择活动类型' }],
                                    initialValue: this.state.activityItem.type_id
                                })(
                                    <Select>
                                        {this.state.ActivityTypeList.map((item, index) =>
                                            <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="标题">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入标题' }],
                                    initialValue: this.state.activityItem.title
                                })(<Input allowClear />)}
                            </Form.Item>
                            <Form.Item label="活动介绍">
                                {getFieldDecorator('introduce', {
                                    rules: [{ required: true, message: '请输入活动介绍' }],
                                    initialValue: this.state.activityItem.introduce
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
                                            initialValue: this.state.activityItem.cost || 0
                                        })(
                                            <Slider max={2000} onChange={this.isZero.bind(this, 'cost')}
                                                disabled={this.state.costDisabled} />
                                        )}
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="时间">
                                {getFieldDecorator('time', {
                                    rules: [{ required: true, message: '请选择活动开始时间-活动结束时间' }],
                                    initialValue: this.state.id ? this.state.updateShowDate : this.state.date
                                })(
                                    <DatePicker.RangePicker

                                        showTime={{ format: 'HH:mm' }}
                                        onChange={this.dateChange}
                                        format="YYYY-MM-DD HH:mm"
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
                                            initialValue: this.state.activityItem.scale || 0
                                        })(
                                            <Slider max={200} onChange={this.isZero.bind(this, 'scale')} disabled={this.state.scaleDisabled} />
                                        )}
                                    </Col>
                                </Row>

                            </Form.Item>
                            <Form.Item label="城市">
                                {getFieldDecorator('city', {
                                    rules: [{ required: true, message: '请选择活动城市' }],
                                    initialValue: this.state.activityItem.city
                                })(
                                    <Cascader options={city} placeholder="请选择省市区" />
                                )}
                            </Form.Item>
                            <Form.Item label="地点">
                                {getFieldDecorator('site', {
                                    rules: [{ required: true, message: '请输入具体地址' }],
                                    initialValue: this.state.activityItem.site
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
                                                            if (contactArray.length > 3) return false
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
                                {getFieldDecorator(`temple`, {
                                    initialValue: this.state.activityItem.temple || ''
                                })(<Input allowClear />)}
                            </Form.Item>
                            <Form.Item label="要求">
                                {getFieldDecorator(`requirement`, {
                                    initialValue: this.state.activityItem.requirement || ''
                                })(<Input.TextArea
                                    autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Form.Item>
                            <Form.Item label="路线">
                                {getFieldDecorator(`path`, {
                                    initialValue: this.state.activityItem.requirement || ''
                                })(<Input.TextArea
                                    autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Form.Item>
                            <Form.Item label="备注">
                                {getFieldDecorator(`remark`, {
                                    initialValue: this.state.activityItem.requirement || ''
                                })(<Input.TextArea
                                    autosize={{ minRows: 2, maxRows: 6 }} />)}
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
export default Form.create()(ActivityCreate);


