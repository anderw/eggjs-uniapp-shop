import { Service } from 'egg';

/**
 * role Service
 */
export default class FavService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        const { ctx } = this
        let {page = 1, pageSize = this.config.pageSize} = options
        const where = {userId: ctx.session.user.id};
        let list = await this.app.model.UserFav.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1),
            where: where,
            include:[
                {model: this.app.model.Good, as:'good',include:[{model:this.app.model.SystemFile,as:'thumbnailImage'}]}
            ]
        })
        return list;
    }
    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async select() {
        let list = await this.app.model.UserFav.findAll()
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        let results = { code: 400, message: "失败", }
        options.userId = ctx.session.user.id;
        
        await ctx.model.UserFav.upsert(options).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }
    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.UserFav.findOne({where: {id}})
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.UserFav.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }

}
