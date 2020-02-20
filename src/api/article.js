import {ajax} from '../store';
import config from '../config'


export const list_article = (params) => ajax('/admin/article/list_article',params,'GET');
export const delete_article = (id) => ajax('/admin/article/delete_article',{id},'GET');
export const get_article = (id) => ajax('/admin/article/get_article',{id},'GET');
export const create_article = params => ajax('/admin/article/create_article',params,'POST');
export const update_article = params => ajax('/admin/article/update_article',params,'POST');

export const list_category = (params) => ajax('/admin/article/list_category',params,'GET');
export const get_category = (id) => ajax('/admin/article/get_category',{id},'GET');
export const delete_category = (id) => ajax('/admin/article/delete_category',{id},'GET');


export const list_region = () => ajax('/admin/article/list_region','','GET');
export const update_region = params => ajax('/admin/article/update_region',params,'POST');
export const delete_region = (id) => ajax('/admin/article/delete_region',{id},'GET');





