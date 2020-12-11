module.exports = app => {
    const { INTEGER } = app.Sequelize;
  
    const RoleMenu = app.model.define('system_role_menu', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        roleId: INTEGER, // 角色Id
        menuId: INTEGER, //菜单Id
    },{freezeTableName: true});
    // 表关联的字段
    RoleMenu.associate = function() {
        /**
         * User.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
        */
        // 一对一
        RoleMenu.belongsTo(app.model.SystemMenu, { foreignKey: 'menuId', targetKey: 'id', as: 'menu'});
    }
    return RoleMenu;
};