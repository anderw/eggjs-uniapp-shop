import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
/**
* @Controller 菜单
*/
bp.prefix('/api/menu', 'MenuController')
export default class MenuController extends Controller {
    /** 分页列表 */
    @bp.get('/')
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.system.menu.list(ctx.query)
        ctx.success(list)
    }
    /** 不分页列表 */
    @bp.get('/list')
    public async list() {
        const { ctx } = this;
        let list = await ctx.service.system.menu.select()
        ctx.success(list)
    }
    /** 菜单树 */
    @bp.get('/tree')
    public async tree() {
        const { ctx } = this;
        let list = await ctx.service.system.menu.tree()
        ctx.success(list)
    }

    @bp.post('/save')
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        if(!params.parentId){delete params.parentId}
        let ret = await ctx.service.system.menu.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.system.menu.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.get('/:id')
    public async detail(){
        const { ctx } = this;
        const data = await ctx.service.system.menu.detail(ctx.params.id)
        
        ctx.success(data)
       
    }
}