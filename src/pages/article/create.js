import React, { Component } from 'react';

import {article} from '../../api'

import *as image from '../../api/image'
import { Table, Divider, Tag, Pagination, Modal, Input, Form, Button, Select, Upload, Icon, message, Row, Col } from 'antd';
import { ant } from '../../store';
import { createForm } from 'rc-form';
import E from 'wangeditor'

class ArticleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleCategory: {},
            categoryList: [],
            loading: false,
            uploadReturnUrl: '',
            base64Url: '',
            richText: ''
        };
    }

    componentDidMount() {
        article.list_category().then(res => {
            this.setState({
                categoryList: res.data,
            })
        })
        const elem = this.refs.editorElem
        const editor = new E(elem);
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.onchange = html => {

            this.setState({
                richText: html
            })
        }
        editor.create();

    }
    submit = e => {
        e.preventDefault();
        if (this.state.uploadReturnUrl === '') {
            ant.Alert('fail', '请上传文章配图');
            return
        }
        if (this.state.richText === ''||this.state.richText ==="<p><br></p>") {
            ant.Alert('fail', '请填写文章内容');
            return
        }

        this.props.form.validateFields((err, values) => {
            console.log(this.state.richText)
            let params = Object.assign({}, values, { content: this.state.richText, inset: this.state.uploadReturnUrl });

            if (!err) {
                article.create_article(params).then(res => {
                    ant.Alert("success", '添加成功')
                })
            } else {
                ant.Alert('fail', '添加失败')
            }
        });
    };

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('图片格式仅支持JPG/PNG格式');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能大于2MB');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    base64Url: imageUrl,
                    loading: false,
                    uploadReturnUrl: info.file.response.data[0].url
                })
            );
        }
    };

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="ArticleUpdate__container">
                <div className='ArticleUpdate'>
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.submit}>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="标题">
                                    <Input allowClear {...getFieldProps('title', {
                                        rules: [{ required: true }]
                                    })} />
                                </Form.Item>
                                <Form.Item label="作者" >
                                    <Input allowClear {...getFieldProps('author', {
                                        rules: [{ required: true }]
                                    })} />
                                </Form.Item>

                                <Form.Item label="分类" >
                                    <Select {...getFieldProps('category_id', {
                                        rules: [{ required: true }]
                                    })}
                                        wrapperCol={{ span: 12, offset: 10 }}
                                    >
                                        {
                                            this.state.categoryList.map((item, key) => (
                                                <Select.Option key={key} value={item.id}>{item.name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Upload
                                    name="inset"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    action="/admin/article/upload"
                                    showUploadList={false}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {this.state.base64Url ? <img src={this.state.base64Url} alt="avatar" style={{ width: '100%' }} /> :
                                        <div>
                                            <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                            <div className="ant-upload-text">Upload</div>
                                        </div>}
                                </Upload>
                            </Col>
                        </Row>
                        <div style={{
                            "position": "relative",
                            "zIndex": "1"
                        }} ref="editorElem"></div>
                        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default createForm()(ArticleCreate);

