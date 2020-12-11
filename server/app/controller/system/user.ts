import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const requireLogin = require('../../middleware/requireLogin')()
/**
* @Controller 用户
*/
bp.prefix('/api/user', 'UserController')
export default class UserController extends Controller {
    /** 分页列表 */
    @bp.get('/')
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.system.user.list(ctx.query)
        ctx.success(list)
    }

    @bp.post('/login')
    public async login(){
        const { ctx } = this;
        let {username,password} = ctx.request.body;
        let {code,message,token} = await ctx.service.system.user.login({username,password})
        if(code==0){
            ctx.success(token)
        }else{
            ctx.fail(code,message);
        }
    }
    @bp.get('/logout',requireLogin)
    public async logout(){
        const { ctx } = this;
        ctx.session=null
        ctx.success();
    }

    @bp.post('/save')
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.system.user.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.post('/update')
    public async update(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.system.user.update(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.system.user.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.code, ret.message)
        }
    }
    
    @bp.get('/info',requireLogin)
    public async info(){
        const { ctx } = this;
        let user = ctx.session.user;
        const userInfo = await ctx.service.system.user.getUserInfo({id: user.id})
        return ctx.success(userInfo);
    }
    @bp.get('/detail/:id')
    public async detail(){
        const { ctx } = this;
        const userInfo = await ctx.service.system.user.detail(ctx.params.id)
        return ctx.success(userInfo);
    }
    @bp.get('/menu',requireLogin)
    public async menu(){
        const { ctx } = this;
        let user = ctx.session.user;
        const list = await ctx.service.system.user.getMenuTree(user.roleId)
        ctx.success(list);
    }
}