import { Service } from 'egg';


/**
 * role Service
 */
export default class MessageService extends Service {

  /**
   * 列表
   * @param params - 列表查询参数
   */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.LogMessage.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1)
        })
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        let results = { code: 400, message: "失败", }
        await ctx.model.LogMessage.upsert(options).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }

    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.LogMessage.findOne({where: {id}})
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.LogMessage.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }

}
