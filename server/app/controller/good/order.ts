import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const requireLogin = require('../../middleware/requireLogin')()
/**
* @Controller 角色
*/
bp.prefix('/api/order', 'OrderController')
export default class OrderController extends Controller {
    /** 分页列表 */
    @bp.get('/',requireLogin)
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.good.order.list(ctx.query)
        ctx.success(list)
    }
    /** 不分页列表 */
    @bp.get('/list',requireLogin)
    public async list() {
        const { ctx } = this;
        let list = await ctx.service.good.order.select()
        ctx.success(list)
    }
    @bp.post('/save',requireLogin)
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.good.order.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    @bp.del('/:id',requireLogin)
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.good.order.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.get('/:id',requireLogin)
    public async detail(){
        const { ctx } = this;
        const data = await ctx.service.good.order.detail(ctx.params.id)
        
        ctx.success(data)
       
    }
    

}