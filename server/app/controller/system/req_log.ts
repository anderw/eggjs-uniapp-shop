import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
/**
* @Controller 消息日志
*/
bp.prefix('/api/system/reqlog', 'MessageController')
export default class MessageController extends Controller {
    /** 分页列表 */
    @bp.get('/')
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.system.reqLog.list(ctx.query)
        ctx.success(list)
    }

    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.system.reqLog.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    

}