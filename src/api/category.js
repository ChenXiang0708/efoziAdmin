import {ajax} from '../store';
import config from '../config'


export const list_category = () => ajax('/admin/category/list_category','','GET');

export const get_category = (id) => ajax('/admin/category/get_category',{id},'GET');











