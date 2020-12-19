import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.sequelize = {
        dialect: "mysql",// 数据库类型
        host: "localhost",// host
        port: 3306,// 端口号
        username: "root",// 用户名
        password: "root",// 密码
        database: "eggjs-uniapp-shop"// 数据库名
    };
    return config;
};
