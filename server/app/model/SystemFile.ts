module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const SystemFile = app.model.define('system_file', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        format: STRING,
        url: STRING,//文件路径，相对路径,用于前端图片访问
        path: STRING,//物理路径，服务器上的路径
        size: INTEGER,//文件大小
        name: STRING,//文件名称
        type: STRING,//文件类型 image/video/application
        creator: INTEGER,//创建的用户id
    },{freezeTableName: true,timestamps: true});
    
    return SystemFile;
};