module.exports = app => {
    const { STRING } = app.Sequelize;
  
    const Permission = app.model.define('system_permission', {
        id: { type: STRING, primaryKey: true },//权限id
        name: STRING, //权限名
        describe: STRING, //描述
        actions: STRING, // 操作
    },{freezeTableName: true});
  
    return Permission;
};