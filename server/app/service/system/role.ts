import { Service } from 'egg';
import configPermission from '../../config/permission';

/**
 * role Service
 */
export default class RoleService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.SystemRole.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1)
        })
        return list;
    }
    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async select() {
        let list = await this.app.model.SystemRole.findAll()
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        let results = { code: 400, message: "失败", }
        await ctx.model.SystemRole.upsert(options).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }

    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.SystemRole.findOne({where: {id}})
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.SystemRole.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }
    // 获取角色菜单
    async getMenuTree (roleId:number) {
        const { ctx } = this
        let list = await ctx.model.SystemRoleMenu.findAll({
            where: {roleId: roleId},
            include:[
                {model: this.app.model.SystemMenu,as: 'menu'}
            ]
        })
        list = list.map(item=>item.menu);
        let result:Array<any> = [];
        let find = (menus,parentId)=>{
            list.filter(item=>item.parentId==parentId).map(item=>{
                item.dataValues.children = [];
                find(item.dataValues.children,item.id);
                menus.push(item);
            })
        }
        find(result,null);
        return result
    }
    // 获取角色菜单
    async getMenus (roleId:number) {
        const { ctx } = this
        let list = await ctx.model.SystemRoleMenu.findAll({
            where: {roleId: roleId},
            include:[
                {model: this.app.model.SystemMenu,as: 'menu'}
            ]
        })
        list = list.map(item=>item.menu);
        return list
    }
    async saveMenuTree(roleId:number,menus: object){
        /**先将树形菜单checked为true的菜单取出来 */
        let checkedIds:number[] =[];
        let checked = (menus)=>{
            for(let i=0;i<menus.length;i++){
                if(menus[i].checked){
                    checkedIds.push(menus[i].id)
                }
                if(menus[i].children && menus[i].children.length){
                    checked(menus[i].children)
                }
            }
        }
        checked(menus);
        let roleMenus = checkedIds.map(a=>({roleId: roleId,menuId:a}));
        /**删除原来角色对应菜单，再重新保存一份新的 */
        await this.ctx.model.SystemRoleMenu.destroy({
            where: {roleId: roleId}
        })
        return await this.ctx.model.SystemRoleMenu.bulkCreate(roleMenus);

    }
    // 获取角色菜单
    async getPermission (roleId:number) {
        const { ctx } = this
        let list = await ctx.model.SystemRolePermission.findAll({
            where: {roleId: roleId},
            include:[
                {model: this.app.model.SystemPermission,as:'permission'}
            ]
        })
        let listAll = await ctx.model.SystemPermission.findAll();
        return listAll.map(item=>{
            var current = list.find(a=>a.permissionId==item.id)
            item.dataValues.checked = current?true:false;
            item.dataValues.actions = item.actions.split(',').map(a=>({
                action: a,
                name: configPermission.actionNames[a],
                checked: current && current.actions.indexOf(a)>-1 ||false
            }));
            return item;
        })
        //查询所有
        // return list.map(item=>{
        //     item.actions = item.permission && item.permission.actions.split(',').map(a=>({action:a,checked: item.actions.indexOf(a)>-1})) ||[];
        //     delete item.dataValues.permission;
        //     return item;
        // })
    }
    async savePermission(roleId:number,menus: any){
        /**先将树形菜单checked为true的菜单取出来 */
        let checkeds:any[] = menus.filter(a=>a.checked).map(item=>{
            return {
                roleId: roleId,
                permissionId: item.id,
                actions: item.actions.filter(a=>a.checked).map(a=>a.action).join(',')
            }
        });
        
        /**删除原来角色对应菜单，再重新保存一份新的 */
        await this.ctx.model.SystemRolePermission.destroy({
            where: {roleId: roleId}
        })
        return await this.ctx.model.SystemRolePermission.bulkCreate(checkeds);

    }

}
