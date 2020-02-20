import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router/index';
import 'antd/dist/antd.css';
import './styles/common.scss'
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <Routes />
    </ConfigProvider>
    , document.getElementById('root'));

