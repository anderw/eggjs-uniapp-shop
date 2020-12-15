// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGood from '../../../app/model/Good';
import ExportGoodCategory from '../../../app/model/GoodCategory';
import ExportGoodImage from '../../../app/model/GoodImage';
import ExportGoodOrder from '../../../app/model/GoodOrder';
import ExportGoodOrderLine from '../../../app/model/GoodOrderLine';
import ExportGoodSpec from '../../../app/model/GoodSpec';
import ExportLogMessage from '../../../app/model/LogMessage';
import ExportMerchant from '../../../app/model/Merchant';
import ExportSystemFile from '../../../app/model/SystemFile';
import ExportSystemMenu from '../../../app/model/SystemMenu';
import ExportSystemPermission from '../../../app/model/SystemPermission';
import ExportSystemReqLog from '../../../app/model/SystemReqLog';
import ExportSystemRole from '../../../app/model/SystemRole';
import ExportSystemRoleMenu from '../../../app/model/SystemRoleMenu';
import ExportSystemRolePermission from '../../../app/model/SystemRolePermission';
import ExportSystemUser from '../../../app/model/SystemUser';
import ExportUserAddress from '../../../app/model/UserAddress';
import ExportUserFav from '../../../app/model/UserFav';

declare module 'egg' {
  interface IModel {
    Good: ReturnType<typeof ExportGood>;
    GoodCategory: ReturnType<typeof ExportGoodCategory>;
    GoodImage: ReturnType<typeof ExportGoodImage>;
    GoodOrder: ReturnType<typeof ExportGoodOrder>;
    GoodOrderLine: ReturnType<typeof ExportGoodOrderLine>;
    GoodSpec: ReturnType<typeof ExportGoodSpec>;
    LogMessage: ReturnType<typeof ExportLogMessage>;
    Merchant: ReturnType<typeof ExportMerchant>;
    SystemFile: ReturnType<typeof ExportSystemFile>;
    SystemMenu: ReturnType<typeof ExportSystemMenu>;
    SystemPermission: ReturnType<typeof ExportSystemPermission>;
    SystemReqLog: ReturnType<typeof ExportSystemReqLog>;
    SystemRole: ReturnType<typeof ExportSystemRole>;
    SystemRoleMenu: ReturnType<typeof ExportSystemRoleMenu>;
    SystemRolePermission: ReturnType<typeof ExportSystemRolePermission>;
    SystemUser: ReturnType<typeof ExportSystemUser>;
    UserAddress: ReturnType<typeof ExportUserAddress>;
    UserFav: ReturnType<typeof ExportUserFav>;
  }
}
