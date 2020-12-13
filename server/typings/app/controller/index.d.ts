// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportGoodCategory from '../../../app/controller/good/category';
import ExportGoodHome from '../../../app/controller/good/home';
import ExportGoodOrder from '../../../app/controller/good/order';
import ExportLogMessage from '../../../app/controller/log/message';
import ExportMemberAddress from '../../../app/controller/member/address';
import ExportMerchantIndex from '../../../app/controller/merchant/index';
import ExportSystemFile from '../../../app/controller/system/file';
import ExportSystemMenu from '../../../app/controller/system/menu';
import ExportSystemPermission from '../../../app/controller/system/permission';
import ExportSystemReqLog from '../../../app/controller/system/req_log';
import ExportSystemRole from '../../../app/controller/system/role';
import ExportSystemUser from '../../../app/controller/system/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    good: {
      category: ExportGoodCategory;
      home: ExportGoodHome;
      order: ExportGoodOrder;
    }
    log: {
      message: ExportLogMessage;
    }
    member: {
      address: ExportMemberAddress;
    }
    merchant: {
      index: ExportMerchantIndex;
    }
    system: {
      file: ExportSystemFile;
      menu: ExportSystemMenu;
      permission: ExportSystemPermission;
      reqLog: ExportSystemReqLog;
      role: ExportSystemRole;
      user: ExportSystemUser;
    }
  }
}
