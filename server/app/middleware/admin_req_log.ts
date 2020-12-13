import { Context } from 'egg';

/**
 * 日志中间件，记录请求
 */
export default function AdminReqLog(): any {
    return async (ctx: Context, next: () => Promise<any>) => {
        const startTime = Date.now();
        await next();
        const reportTime = Date.now() - startTime;
        const { url } = ctx;
        // 该接口不做记录/admin/sys/log/page
        if (url.startsWith('/api') && !url.startsWith('/api/system/reqlog') && ctx.req.method!=='GET') {
            ctx.service.system.reqLog.save(url.split('?')[0],
                ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.status, reportTime, ctx.req.method, ctx.session && ctx.session.user ? ctx.session.user.id : null);
        }
    };
}
