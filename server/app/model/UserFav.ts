module.exports = app => {
    const {  INTEGER } = app.Sequelize;
  
    const UserFav = app.model.define('user_fav', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        goodId: INTEGER,
        userId: INTEGER,
        // session_key: STRING, // 微信session_key
    },{freezeTableName: true});
    
    // 表关联的字段
    UserFav.associate = function() {
        // 一对一
        UserFav.belongsTo(app.model.SystemUser, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
        UserFav.belongsTo(app.model.Good, { foreignKey: 'goodId', targetKey: 'id', as: 'good'});
    }
    return UserFav;
};