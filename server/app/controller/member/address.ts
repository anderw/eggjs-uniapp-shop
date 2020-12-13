import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const requireLogin = require('../../middleware/requireLogin')()
/**
* @Controller 用户地址
*/
bp.prefix('/api/member/address', 'AddressController')
export default class AddressController extends Controller {
    /** 分页列表 */
    @bp.get('/',requireLogin)
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.member.address.list(ctx.query)
        ctx.success(list)
    }
    /** 不分页列表 */
    @bp.get('/list',requireLogin)
    public async list() {
        const { ctx } = this;
        let list = await ctx.service.member.address.select()
        ctx.success(list)
    }


    @bp.post('/save',requireLogin)
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.member.address.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    @bp.del('/:id',requireLogin)
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.member.address.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.get('/:id',requireLogin)
    public async detail(){
        const { ctx } = this;
        const data = await ctx.service.member.address.detail(ctx.params.id)
        
        ctx.success(data)
       
    }
    

}