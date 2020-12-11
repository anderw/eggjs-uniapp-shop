/**
 * @description     公共api接口
 *
 * @author          
 * @email           
 * @phone           
 * @create          2019-02-12 11:00
 * */

import axios from '../index';
import {genNonDuplicateID} from '@/utils/index';
import menu from './menu'

export default{
    menu
}
/**
 * @description     设置语言
 *
 * @return      [ Object ]              必反，返回菜单数组
 *
 * */
 export function setLanguage(lan){
 	return axios.get('/language?locale='+lan);
 }
 /**
 * @description         主机操作触发事件
 *
 * params  {Object}       opt   参数对象 必含属性eventIds
 * @return {}
 * */
 // var tracerTime = 0;
 export function eventTracer(opt){
 	return axios.get('/eventTracer',{params:opt});
 }

/**
 * @description     文件上传
 *
 * @return      [ Object ]              必反，返回菜单数组
 *
 * */
export function fileUpload(formData,currFile,progressCallback,singleLoading){

    return axios({
        method: 'post',
        url: '/api/file/upload?random='+genNonDuplicateID(6),
        headers: {
        'Content-Type': 'multipart/form-data'
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
            if(!currFile) return
            currFile['percent'] = (progressEvent.loaded / progressEvent.total * 100 | 0);
            if(progressCallback && typeof progressCallback == 'function'){
                progressCallback(currFile['percent']);
            }

            if(singleLoading){
                singleLoading['percent'] = (progressEvent.loaded / progressEvent.total * 100 | 0);
                if(progressCallback && typeof progressCallback == 'function'){
                    progressCallback(singleLoading['percent']);
                }
            }
        }
    })

    // return axios.post('/hyperone/file/upload?random='+genNonDuplicateID(6),formData);
}
/**
 * @description     文件删除
 *
 * @return      [ Object ]
 *
 * */
export function deleteUpload(opt){
    return axios.delete('/file/'+opt.id);
}


//获取当前系统版本
export function getCurrentVersion(){
    return axios.get('/version');
}