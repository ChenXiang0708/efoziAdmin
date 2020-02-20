import {ajax} from '../store';
import config from '../config'


export const login = (params) => ajax('/admin/session/login',params,'POST');
export const logout = (params) => ajax('/admin/session/logout',params,'GET');











