// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminReqLog from '../../../app/middleware/admin_req_log';
import ExportExecption from '../../../app/middleware/execption';
import ExportRequireLogin from '../../../app/middleware/requireLogin';

declare module 'egg' {
  interface IMiddleware {
    adminReqLog: typeof ExportAdminReqLog;
    execption: typeof ExportExecption;
    requireLogin: typeof ExportRequireLogin;
  }
}
