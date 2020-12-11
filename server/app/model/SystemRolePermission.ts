module.exports = app => {
    const { INTEGER,STRING } = app.Sequelize;
  
    const RolePermission = app.model.define('system_role_permission', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        roleId: INTEGER, // 角色Id
        permissionId: STRING, //权限Id
        actions: STRING
    },{freezeTableName: true});
    // 表关联的字段
    RolePermission.associate = function() {
        /**
         * User.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
        */
        // 一对一
        RolePermission.belongsTo(app.model.SystemPermission, { foreignKey: 'permissionId', targetKey: 'id', as: 'permission'});
    }
    return RolePermission;
};