module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const ReqLog = app.model.define('system_req_log', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        ip: STRING, 
        userId: INTEGER,
        params: STRING,
        action: STRING,
        method: STRING,
        status: { type: INTEGER }, //  状态： 0:禁用, 1:启用
        consumeTime: INTEGER
        // session_key: STRING, // 微信session_key
    },{timestamps: true,freezeTableName: true});
   // 表关联的字段
    ReqLog.associate = function() {
        // 一对一
        ReqLog.belongsTo(app.model.SystemUser, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
    }
    return ReqLog;
};