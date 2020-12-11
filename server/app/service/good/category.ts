import { Service } from 'egg';

/**
 * role Service
 */
export default class CategoryService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.GoodCategory.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1),
            include:[
                {model: this.app.model.GoodCategory,as: 'parent'},
                {model: this.app.model.SystemFile,as: 'image'},
            ]
        })
        return list;
    }
    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async select() {
        let list = await this.app.model.GoodCategory.findAll()
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        let results = { code: 400, message: "失败", }
        if(!options.parentId){
            delete options.parentId;
        }
        await ctx.model.GoodCategory.upsert(options).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }

    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.GoodCategory.findOne({where: {id}})
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.GoodCategory.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }

}
