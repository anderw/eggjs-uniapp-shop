module.exports = {
    SUCCESS_CODE: 200, // 成功
    NO_LOGIN_CODE: 401, // 未登录
    UNIQUE_CODE: 200, // 唯一性冲突
    ERROR_CODE: 500, // 失败
    user() {
        return this.ctx.session.user;
    },
    
    success(data, status) {
        this.body = { status: this.SUCCESS_CODE, result:data };
        this.status = status || 200;
    },
    
    fail(status, message,data) {
        this.body = { status, message, result:data };
        this.status = status||400;
    },
    
    notFound(msg) {
        msg = msg || 'not found';
        this.throw(404, msg);
    }
};