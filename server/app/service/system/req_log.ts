import { Service } from 'egg';

/**
 * 请求追踪服务
 */
export default class SysReqLogService extends Service {

    /**
     * 记录日志
     */
    async save(url: string, params: string, status: number, consumeTime: number, method: string | undefined, userId: number | null) {
        const ip = this.ctx.helper.getReqIP();
        await this.app.model.SystemReqLog.create({
            action: url,
            params: JSON.stringify(params),
            userId: userId === null ? undefined : userId,
            ip,
            method: method ? method.toUpperCase() : undefined,
            status,
            consumeTime,
        });
    }

    /**
     * 计算日志总数
     */
    async count() {
        return await this.app.model.SystemReqLog.count();
    }

    /**
     * 分页加载日志信息
     */
    async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        const result = await this.app.model.SystemReqLog.findAndCountAll({
            order: [
                ["id", 'DESC'],
            ],
            limit: +pageSize,
            offset: pageSize * (page-1),
            include:[
                {model: this.app.model.SystemUser,as:'user'}
            ]
        });
        return result;
    }

    
    //删除
    public async remove(id){
        let results
        await this.ctx.model.SystemReqLog.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }


}
