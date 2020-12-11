import axios from '@/api';
export default{
    list:(params)=>axios.get('/api/role',{params}),
    select:(params)=>axios.get('/api/role/list',{params}),
    detail:(id)=>axios.get('/api/role/'+id),
    save:(opt)=>axios.post('/api/role/save',opt),
    remove:(id)=>axios.delete('/api/role/'+id),
    //角色菜单保存
    menuSave:(id,opt)=>axios.post('/api/role/'+id+'/menu',opt),
    //角色菜单列表
    menuList:(id)=>axios.get('/api/role/'+id+'/menu'),
    //角色权限列表
    authList:(id)=>axios.get('/api/role/'+id+'/permission'),
    //角色权限保存
    authSave:(id,opt)=>axios.post('/api/role/'+id+'/permission',opt),
}