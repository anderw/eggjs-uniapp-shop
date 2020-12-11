import { IHelper } from 'egg';
module.exports = {
   /**
   * 获取请求IP
   */
    getReqIP(this: IHelper) {
        const req: any = this.ctx.req;
        return (req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
                req.connection.remoteAddress || // 判断 connection 的远程 IP
                req.socket.remoteAddress || // 判断后端的 socket 的 IP
                req.connection.socket.remoteAddress).replace('::ffff:', '');
    },
};