import {message, Modal} from 'antd';
export  function Alert(type,content) {
        if(type==='info'){
            message.info(content);
        }
        if(type==='success'){
            message.success(content);
        }
        if(type==='fail'){
            message.error(content);
        }
}

export  function Confirm(content,index,callback) {

    Modal.confirm({
        title: '提示',
        content: content,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            callback(index)
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}