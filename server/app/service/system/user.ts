import { Service } from 'egg';
const crypto = require('crypto');


/**
 * User Service
 */
export default class UserService extends Service {

  /**
   * 列表
   * @param params - 列表查询参数
   */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.SystemUser.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1),
            include:[
                {
                    model: this.app.model.SystemRole,
                    as: 'role',//这里的 as需要与之前定义的as名字相同
                }
            ]
        })
        return list;
    }
    
  /**
   * 保存
   * @param data - 列表查询参数
   */
    public async save(options: any) {
        const { ctx } = this
        const {  password } = options
        let results = { code: 400, message: "失败", }
        await ctx.model.SystemUser.findOne({
            where: { username:options.username, },// 查询条件 
        }).then(async result => {
            if (!result) {
                const hash = crypto.createHash('md5');
                options.password = hash.update(password).digest('hex')
                await ctx.model.SystemUser.create(options).then(() => {
                    results = { code: 0, message: "添加成功", }
                }).catch(err => {
                    results = {
                        code: 400,
                        message: err,
                    }
                })
            } else {
                results = {
                    code: 400,
                    message: "该账号已存在",
                }
            }
        })

        return results
    }
    /**更新 */
    public async update(options: any) {
        const { ctx } = this
        let results = { code: 500, message: "失败", }
        await ctx.model.SystemUser.update(options,{
            where:{id: ctx.session.user.id}
        }).then(() => {
            results = { code: 0, message: "更新成功", }
        }).catch(err => {
            results = { code: 500, message: err, }
        })
        return results
    }
    /**
     * 登录
     * @param options - 参数
     */
    public async login(options: any) {
        const { ctx } = this
        const { username, password } = options
        let results = {  code: 400, message: "失败",token:'' }
        await ctx.model.SystemUser.findOne({
            where: {
                username, // 查询条件
            },
        }).then(async result => {
            if (result) {
                const hash = crypto.createHash('md5');
                options.password = hash.update(password).digest('hex')
                
                await ctx.model.SystemUser.findOne({where: options,}).then((data) => {
                    if(!data){
                        return (results = { code: 400, message: "帐号或密码错误", token: '' })
                    }
                    /*
                    * sign({根据什么生成token})
                    * app.config.jwt.secret 配置的密钥
                    * {expiresIn:'24h'} 过期时间
                    */
                    const token = this.app.jwt.sign({ user: data }, this.config.jwt.secret,{expiresIn:'24h'});
                    ctx.session.user = data
                    results = {  code: 0, message: "登录成功",token }
                }).catch(err => {
                    results = { code: 400, message: err, token: '' }
                })
            } else {
                results = { code: 400, message: "账号不存在", token: '' }
            }
        })
        return results
    }

    public async detail(id){
        let data = await this.app.model.SystemUser.findOne({where: {id}})
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.SystemUser.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }
    // 登录查询个人信息
    async getUserInfo (options) {
        const { ctx } = this
        let userInfo:any = {};
        await ctx.model.SystemUser.findOne({
            where: options,
            include: [
                {model: this.app.model.SystemRole,as: 'role'},
                {model: this.app.model.SystemFile,as: 'avatar'}
            ]
        }).then(async res => {
            var permissions = res.dataValues.role && await ctx.model.SystemRolePermission.findAll({where: {roleId: res.dataValues.role.dataValues.id}}) ||[];
            res.dataValues.permissions = permissions||[]
            userInfo = res
        })
        if(userInfo.type==2){//如果是商家，则将商家信息一并查询
            const merchantModel = await ctx.model.Merchant.findOne({
                where:{userId:userInfo.id},
                include:[
                    {model: this.app.model.SystemFile,as: 'logo'}
                ]
            });
            userInfo.setDataValue("merchant",merchantModel)
        }
        return userInfo
    }
    // 获取菜单
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
}
