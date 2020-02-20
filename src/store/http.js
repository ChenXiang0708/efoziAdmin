import axios from 'axios';
import qs from 'qs';
import {ant} from '../store';

axios.interceptors.request.use(config => {
    if (config.url === "/admin/session/login") {
        return config;
    }
    let token = window.sessionStorage.getItem("token");
    if (token) {
        config.headers.token = token;
        return config;
    }
}, error => {
    return Promise.reject(error);
});

export default function ajax(_url, _data, _options) {
    let options = null;
    let data = '';
    let params = '';
    if (Object.prototype.toString.call(_data) === "[object FormData]") {
        options = {
            method: 'POST',
            header: {'Content-Type': 'multipart/form-data'}
        };
        data = _data
    } else {
        options = _options || {
            method: 'POST',
            dataType: 'json',
            header: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        if (options === 'GET')
            params = _data;
        else
            data = qs.stringify(_data, {indices: false});
    }

    return new Promise((resolve, reject) => {
        axios({
            url: _url,
            method: options.method || options,
            headers: options.header,
            params: params,
            data: data,
            withCredentials: true,
            paramsSerializer: params => {
                return qs.stringify(params, {indices: false})
            }
        })
            .then(response => {
                if ((response.data && response.data.status) == 'success') {
                    resolve(response.data);
                } else {
                    console.log(response.data.code)
                    failStatus(response.data.code, response.data.message)
                    // reject(response);
                }

            }).catch(error => {
            console.log(22222222)
            failStatus(error.response);
            return error.response
        })
    })
}


const failStatus = function (status, message = '') {
    switch (status) {
        case 400:
            ant.Alert('fail', 'HTTP Status 400（请求错误）');
            break;
        case 401:
            ant.Alert('fail', '登录超时');
            setTimeout(() => {
                window.location.href = '#/login';
            }, 1500)
            break;
        case 403:
            ant.Alert('fail', 'HTTP Status 403（用户无权限访问该资源，请求失败）');
            break;
        case 404:
            ant.Alert('fail', 'HTTP Status 404 (Not Found)');
            break;
        case 500:
            if (message) {
                ant.Alert('fail', message);
            } else {
                ant.Alert('fail', 'HTTP Status 500（服务器内部错误）');
            }
            break;
        case 502:
            ant.Alert('fail', 'HTTP Status 502（网关错误）');
            break;
        case 503:
            ant.Alert('fail', 'HTTP Status 503（服务不可用）');
            break;
        case 504:
            ant.Alert('fail', 'HTTP Status 504（网关超时）');
            break;
    }
}


