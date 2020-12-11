import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1598064376175_9435';

    // add your egg config in here
    
//   config.middleware = [ 'adminReqLog', 'execption', 'adminAuthority' ];
    config.middleware = ['adminReqLog','execption'];

    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };

    config.jwt = {
        secret: "12345678",
        enable: false,
    }
    config.security= {
        csrf : {
            enable: false,
        },
        domainWhiteList: [ '*' ]
    }
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };
    config.sequelize = {
        timezone: '+08:00',
        dialectOptions: {
            dateStrings: true,
            typeCast(field, next) {
                // for reading from database
                if (field.type === "DATETIME") {
                    return field.string();
                }
                return next();
            }
        }
    }
    config.multipart = {
        mode: 'file',
        fileSize: '100mb',
    };
    config.pageSize = 20

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig,
    };
};
