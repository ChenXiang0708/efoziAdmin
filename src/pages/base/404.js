import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './404.scss'

export default class ExamError extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="error__container">
                <div className="error">
                    <img  className='error__image'
                         src={require('../../images/base/404.png')} alt=""/>
                        <div className="error__content">
                            <p className="error__tips">您访问的页面不见了！</p>

                            <Link to={'/main'}><p className="error__handle">返回首页</p></Link>
                        </div>
                </div>
            </div>
        );
    }
}


