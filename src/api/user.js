import {ajax} from '../store';
import config from '../config'


export const list_user = (params) => ajax('/admin/user/list_user',params,'GET');
export const delete_user = (id) => ajax('/admin/user/delete_user',{id},'GET');
export const get_user = (id) => ajax('/admin/user/get_user',{id},'GET');











