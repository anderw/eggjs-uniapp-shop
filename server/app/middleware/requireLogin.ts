import { Context } from 'egg';
module.exports = function(needLogin){
    return async function requireLogin(ctx: Context) {
        const token = ctx.request.header.authorization;
        needLogin = typeof(needLogin)=='undefined'?true: needLogin
    //   let decode: any;
        if (token) {
            try {
                // 解码token
                var pass = false;
                ctx.app.jwt.verify(token, ctx.app.config.secret,(err, payload) => {
                    if(err){
                        needLogin && ctx.fail(401,err.message||'登录过期')
                        pass = false
                        return false
                    }
                    else{
                        ctx.session.user = payload.user;
                        // console.log('获取到用户===============',payload)
                        pass =true
                    }
                });
                
                return pass;
            } catch (error) {
                needLogin && ctx.fail(401,error.message||'解析失败')
                return needLogin || false;
            }
        } else {
            needLogin && ctx.fail(401,"未登录")
            return needLogin || false;
        }
    }
};

  