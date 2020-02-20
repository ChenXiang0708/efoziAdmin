import React from 'react'
import { Layout, Row, Col, BackTop } from 'antd';
import { BreadcrumbCustom, Search } from '../../components'
import './index.scss'
import IndexMenu from './indexMenu'
import IndexHead from './indexHead'
import IndexContent from './indexContent'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFold: false
        };
    }

    isFold = (fold) => {
        this.setState({
            isFold: fold
        })
    }

    render() {

        return (
            <div className='Index__container'>
                <Layout style={{ minHeight: '100vh' }}>
                    <IndexMenu isFold={this.isFold} style={{ position: "fixed", zIndex: "999" }} />
                    <Layout style={{ marginLeft: this.state.isFold ? "80px" : "200px" }}>
                        <IndexHead />
                        <Layout.Content style={{ margin: '0 16px' }}>
                            <Row className='content__header' >
                                <Col offset={1} span={6}>
                                    <BreadcrumbCustom children={this.props.children} />
                                </Col>
                                <Col offset={8} span={9}>
                                    <Search />
                                </Col>
                            </Row>

                            <div className="content__match" >
                                {this.props.match.pathname == '/' ? <IndexContent /> : null}
                                {this.props.children}
                            </div>
                        </Layout.Content>
                        <BackTop />

                    </Layout>
                </Layout>
            </div>
        );
    }
}

