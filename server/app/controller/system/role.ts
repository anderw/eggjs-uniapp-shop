import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
/**
* @Controller 角色
*/
bp.prefix('/api/role', 'RoleController')
export default class RoleController extends Controller {
    /** 分页列表 */
    @bp.get('/')
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.system.role.list(ctx.query)
        ctx.success(list)
    }
    /** 不分页列表 */
    @bp.get('/list')
    public async list() {
        const { ctx } = this;
        let list = await ctx.service.system.role.select()
        ctx.success(list)
    }


    @bp.post('/save')
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.system.role.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.system.role.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.get('/:id')
    public async detail(){
        const { ctx } = this;
        const data = await ctx.service.system.role.detail(ctx.params.id)
        
        ctx.success(data)
       
    }
    /**获取角色菜单 */
    @bp.get('/:id/menu')
    public async menu(){
        const { ctx } = this;
        const data = await ctx.service.system.role.getMenus(ctx.params.id)
        ctx.success(data)
    }
    /**新增、保存角色菜单 */
    @bp.post('/:id/menu')
    public async menuSave(){
        const { ctx } = this;
        await ctx.service.system.role.saveMenuTree(ctx.params.id,ctx.request.body).then(()=>{
            ctx.success()
        }).catch(err=>{
            ctx.fail(400,err.message)
        })
    }
    /**获取角色权限 */
    @bp.get('/:id/permission')
    public async permission(){
        const { ctx } = this;
        const data = await ctx.service.system.role.getPermission(ctx.params.id)
        ctx.success(data)
    }
    /**新增、保存角色权限 */
    @bp.post('/:id/permission')
    public async permissionSave(){
        const { ctx } = this;
        await ctx.service.system.role.savePermission(ctx.params.id,ctx.request.body).then(()=>{
            ctx.success()
        }).catch(err=>{
            ctx.fail(400,err.message)
        })
    }

    

}