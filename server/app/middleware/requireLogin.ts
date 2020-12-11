import { Context } from 'egg';
module.exports = function(){
    return async function requireLogin(ctx: Context) {
        const token = ctx.request.header.authorization;
    //   let decode: any;
        if (token) {
            try {
                // 解码token
                var pass = false;
                ctx.app.jwt.verify(token, ctx.app.config.secret,(err, payload) => {
                    if(err){
                        ctx.fail(401,err.message||'登录过期')
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
                ctx.fail(401,error.message||'解析失败')
                return false;
            }
        } else {
            ctx.fail(401,"未登录")
            return false;
        }
    }
};

  