module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const User = app.model.define('system_menu', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING, // 菜单名
        url: STRING, //菜单路径
        icon: STRING, //菜单图标
        parentId: { type: INTEGER, defaultValue: null }, // 上级菜单id
        sort: INTEGER,
        status: { type: INTEGER, defaultValue: 1 }, //  状态： 0:禁用, 1:启用
    },{freezeTableName: true});
  
    return User;
};