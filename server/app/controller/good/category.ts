import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
/**
* @Controller 商品分类
*/
bp.prefix('/api/goodCategory', 'GoodCategoryController')
export default class GoodCategoryController extends Controller {
    /** 分页列表 */
    @bp.get('/')
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.good.category.list(ctx.query)
        ctx.success(list)
    }
    /** 不分页列表 */
    @bp.get('/list')
    public async list() {
        const { ctx } = this;
        let list = await ctx.service.good.category.select(ctx.query)
        ctx.success(list)
    }
    /** 不分页列表,树形，用于类型选择框 */
    @bp.get('/tree')
    public async tree() {
        const { ctx } = this;
        let list = await ctx.service.good.category.select(ctx.query);
        var getChildren = (parentId)=>{
            var results = list.filter(a=>a.parentId==parentId);
            for(let i=0;i<results.length;i++){
                var cur = results[i];
                var children = getChildren(cur.id)
                children.length?cur.setDataValue("children", children):false
            }
            return results
        }
        var tree = getChildren(null);
        
        ctx.success(tree)
    }


    @bp.post('/save')
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.good.category.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.good.category.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.get('/:id')
    public async detail(){
        const { ctx } = this;
        const data = await ctx.service.good.category.detail(ctx.params.id)
        
        ctx.success(data)
       
    }
    

}