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
    randomNo(j) {
        var random_no = "";
        for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
        {
            random_no += Math.floor(Math.random() * 10);
        }
        random_no = new Date().getTime() + random_no;
        return random_no;
    }
};