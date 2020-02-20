import React, {Component} from 'react';

import {article, image} from '../../api'

import {Statistic, Button, Select, Upload, Icon, Card, Row, Col} from 'antd';
import {ant} from '../../store';
import {createForm} from 'rc-form';
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

    }


    render() {

        return (
            <div className="IndexContent__container">
                <div className='IndexContent'>


                    <Row span={4}>
                        <Col span={3}>
                            <Card>
                                <Statistic
                                    title="文章"
                                    value={1128}
                                    valueStyle={{color: '#3f8600'}}
                                />
                            </Card>
                        </Col>
                        <Col span={3}>
                            <Card>
                                <Statistic
                                    title="用户"
                                    value={93}
                                    valueStyle={{color: '#cf1322'}}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row span={4}>
                        <Col span={3}>
                            <Card>
                                <Statistic
                                    title="活动"
                                    value={93}
                                    valueStyle={{color: '#cf1322'}}
                                />
                            </Card>
                        </Col>
                    </Row>


                </div>
            </div>
        );
    }
}

export default createForm()(ArticleCreate);

