module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const User = app.model.define('system_role', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING, // 角色名
        describe: STRING, // 角色描述
        status: { type: INTEGER, defaultValue: 1 }, //  状态： 0:禁用, 1:启用
        // session_key: STRING, // 微信session_key
    },{timestamps: true,freezeTableName: true});
  
    return User;
};