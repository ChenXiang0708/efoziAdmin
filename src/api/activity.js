import {ajax} from '../store';

export const list_activity = (params) => ajax('/admin/activity/list_activity',params,'GET');
export const create_activity = params => ajax('/admin/activity/create_activity',params,'POST');
export const update_activity = params => ajax('/admin/activity/update_activity',params,'POST');
export const delete_activity = (id) => ajax('/admin/activity/delete_activity',{id},'GET');
export const get_activity = (id) => ajax('/admin/activity/get_activity',{id},'GET');

export const list_type = () => ajax('/admin/activity/list_type','','GET');

export const get_type = (id) => ajax('/admin/activity/get_type',{id},'GET');
export const delete_type = (id) => ajax('/admin/activity/delete_type',{id},'GET');
export const create_type = (name) => ajax('/admin/activity/create_type',{name},'POST');

export const update_type = params => ajax('/admin/activity/update_type',params,'POST');








