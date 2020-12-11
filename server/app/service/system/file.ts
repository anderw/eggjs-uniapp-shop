import { Service } from 'egg';
const fs = require('mz/fs');
/**
 * role Service
 */
export default class FileService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.SystemFile.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1)
        })
        return list;
    }
    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async select() {
        let list = await this.app.model.SystemFile.findAll()
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        let results = { code: 400, message: "失败", }
        await ctx.model.SystemFile.upsert(options).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }

    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.SystemFile.findOne({where: {id}})
        return data
    }
    //删除
    public async remove(id){
        let results
        let data = await this.app.model.SystemFile.findOne({where: {id}})

        await this.ctx.model.SystemFile.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        if(results.code===0 && data){
            try{
                await fs.unlinkSync(data.path)
            }catch(e){
                console.log('err==================',e)
            }
        }
        return results
    }
}
