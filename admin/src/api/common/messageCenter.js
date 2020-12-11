/**
 * @description     审计日志
 *
 * @author          
 * @email           
 * @phone           
 * @create          2019-09-17 11：00
 * */

import axios from '@/api';

export default{
    list:()=>axios.get('/messageCenter/'+id),
    remove:(id)=>axios.post('/messageCenter/readOrDelete',id)
}