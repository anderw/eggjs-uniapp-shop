import { constantMap } from '@/utils/constant';

//
let computeStyleSelect = [
    { label: '全部', value: '' },
    { label: '导入', value: '1' },
    { label: '估算', value: '2' }
]


let settleSelect = [
    { value:'','label':'全部'},
    { value:'0','label':'否' },
    { value:'1','label':'是' } 
]

let associateMaster =[
	{value:'','label': '全部'},
	{ value: '1', 'label': '已注册'},
	{ value: '0', 'label': '未注册'},
]
let billMonthDate = {
	disabledDate: time => {
		 // - 30 * 24 * 3600 * 1000;
	      return time.getTime() > new Date().getTime()
	     }
}

let billSyncMonthRange = {
	disabledDate: time => {
		 // - 30 * 24 * 3600 * 1000;
	      return time.getTime() < new Date('2020-01').getTime()
	     }
}
let billdayDate ={
	disabledDate: time => {
		// - (24 * 3600 * 1000);
	      return time.getTime() > new Date().getTime() 
	     }
}
let paymentType = [
	{ value: 'PayAsYouGo', label: '后付费'},
	{ value: 'Subscription', label: '预付费'},
]
let subTypeList = [
	{ value: 'PayAsYouGo', label: '按量付费'},
	{ value: 'Subscription', label:'包年包月'},
]
let orderSubType= [
	{ value:'',label: "全部"},
	{ value: 'PayAsYouGo', label: '按量付费'},
	{ value: 'Subscription', label:'后付费-固定带宽'},
]
let BillStatus = [
	{ value: 0, label: '开通中'},
	{ value: 1, label: '开通成功'},
	{ value: 2, label: '开通失败'},
]
let tenantStatus = [
    { value:0, label: '冻结' },
    { value:1, label: '正常' },
    { value:2, label: '待审核' },
    { value:3, label: '不通过' },
    { value:4, label: '通过'},
    
]
let customerAccountType = [
	{ value: 2, label: '客户'},
    { value: 3, label: '企业客户'},
    { value: 4, label: '转售服务商'},
    { value: 5, label: '代理服务商'},    
]
let customerAssociate =[
	{ value: 0, label: '未关联'},
	{ value: 1, label: '已关联'},
]
let accountCertType =[
	// { value: 3, label: 'endUser'},
	{ value: 4, label: '转售服务商'},
	{ value: 5, label: '代理服务商'},
]
let engineVersionList=[
    { label: "全部", value: '' },// 数据库版本
    { label: 'Redis5.0', value: '5.0' },
    { label: 'Redis4.0', value: '4.0' },
    { label: 'Redis2.8', value: '2.8' },
]
let engineList = [// 数据库类型
    { label: 'MySQL', value: 'MySQL' },
    { label: 'Microsoft SQL Server', value: 'SQLServer' },
    { label: 'PostgreSQL', value: 'PostgreSQL' },
    { label: 'PPAS', value: 'PPAS' },
    { label: 'MariaDB', value: 'MariaDB' },
]
let tenantType =[
    { label: '运营商', value: '0' },
    { label: '服务商', value: '1' },
    { label: 'EndUser', value: '2' },
]


function accountGetLabel(opt){
		let type = constantMap.CloudPlatform.find(item=>item.value == opt.cloudType)
		return opt.name +' ('+(type && type.title)+')'
}

let searchList = [
	{ label: "月份", searchType: "billMonth", type: 'month',format:'yyyy-MM',valueFormat:'yyyy-MM',pickerOptions:billMonthDate,deletion:true},	
	{ label: "月份", searchType: "billDayCycle", type: 'date',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd',pickerOptions:billdayDate},
    { label: "订单号", searchType: "orderId", type: 'input' },
    { label: "产品名称", searchType: "productName", type: 'input' },
    { label: "云平台", searchType: "cloudType", type: 'default' },
    { label: "名称", searchType: "name", type: 'input',maxLength:30},
    { label: "订单类型", searchType: "orderType", type: 'select', selectList: constantMap.OrderType,all:true},
    { label: "订单状态", searchType: "orderStatus", type: 'select', selectList: constantMap.PaymentStatus },
    { label: "专有网络名称/ID", searchType: "vpcName", type: 'input',labelWidth:'130px' },//专有网络名称/ID
    { label: "IPv4网段", searchType: "ipv4", type: 'input' },//专有网络ipv4
    { label: "IPv6网段", searchType: "ipv6", type: 'input' },//专有网络ipv6
    { label: "镜像名称", searchType: "imageName", type: 'input' },//镜像名称
    { label: "镜像类型", searchType: "imageOwnerAlias", type: 'select', selectList: constantMap.ImageOwnerAlias },//镜像类型
    { label: "镜像状态", searchType: "imageStatus", type: 'select', selectList: constantMap.ImageStatus },//镜像状态
    { label: "名称", searchType: "instanceName", type: 'input' },//云主机名称/ID
    { label: "弹性公网 IP", searchType: "eip", type: 'input' },//弹性公网 IP
    { label: "云主机状态", searchType: "instanceStatus", type: 'select', selectList: constantMap.InstanceStatus },//云主机状态
    { label: '状态', searchType: "vpcStatus", type: 'select', selectList: constantMap.VpcStatusList },
    { label: "地域", searchType: "regionId", type: 'region', selectList: [], valueKey: 'providerId' },
    { label: "地域", searchType: "regionIds", type: 'region', selectList: [], valueKey: 'providerId', checkbox: true },
	{ label: "地域", searchType: "regionName", type: 'region', selectList: [], valueKey: 'name' },
    { label: "规格名称", searchType: "flavorName", type: 'input' }, //规格名称
    { label: 'CPU（核)', searchType: "cpus", type: 'input' },
    { label: '内存（GB）', searchType: "memorySize", type: 'input' },
    { label: '路由表名称/ID', searchType: "routerTableName", type: 'input',labelWidth:'190px' },
    
    { label: "用户", searchType: "userName", type: 'input' },//用户
    { label: "状态", searchType: "read", type: 'select', selectList: constantMap.MessageStatus },//消息已读未读状态
    { label: "事件类型", searchType: "eventType", type: 'input' },//事件类型
    { label: "事件名称", searchType: "eventName", type: 'input' },//事件名称
    { label: "发起人", searchType: "applyUserId", type: 'user', selectList: [] },//发起人
    { label:'名称', searchType: "routeName", type: 'input' ,labelWidth:'170px' },//边界路由名称
    { label: "运行环境", searchType: "sysType", type: 'OsVersion', selectList: [] },// 脚本类型
    { label: "版本", searchType: "engineVersion", type: 'select', selectList: engineVersionList },
    { label: "实例 ID", searchType: "createProviderId", type: 'input' },//实例Id
    { label: 'vpcID', searchType: "vpcId", type: 'input' },
    { label: "实例规格", searchType: "instanceClass", type: 'input' },//实例规格
    { label: "付费类型", searchType: "chargeType", type: 'select', selectList: constantMap.PaymentTypes },// 付费类型
    { label: "运行状态", searchType: "dataStatus", type: 'select', selectList: constantMap.DataOperationStatus },// 数据运行状态
    { label: "运行状态", searchType: "dbInstanceStatus", type: 'input' },
    { label: "实例类型", searchType: "dbType", type: 'select', selectList: constantMap.InstanceTypes },// 实例类型
    {label: "数据库类型", searchType: "engine", type: 'select', selectList: engineList            },
    { label: "网络类型", searchType: "instanceNetworkType", type: 'select', selectList: constantMap.NetworkType },// 网络类型
    { label: "状态", searchType: "statuState", type: 'select', selectList: constantMap.statuStates },// 应用模板状态
    { label: "操作人", searchType: "onUserName", type: 'input' },
    { label: "操作选择", searchType: "action", type: 'select', selectList: constantMap.AuditStatusList },// 操作日志的操作状态
    { label: "IP", searchType: "ip", type: 'input' },
    { label: "状态", searchType: 'slbStatus', type: 'select', selectList: constantMap.SlbStatusList },
    { label: "可用区", searchType: 'masterZoneId', type: 'zone', selectList: [] },
    { label: "是否已结清",searchType:'settle',type:'select', selectList:settleSelect},
    // { label: '云账号名称/ID', searchType: "cloudAccountId", type: 'select',selectList:[], 'remoteMethod': fetchCloudTenantList, valueKey: 'accountId',getLabel:accountGetLabel,labelDesc:'accountId',remote:true,all:true},
	{ label: "云账号名称", searchType: "customerCloudAccountName", type: 'input',maxLength:30},
	{ label: "云账号 ID", searchType: "accountId", type: 'input' },
	{ label: "登录邮箱", searchType: "email", type: 'input' },
	{ label: "设备名称", searchType: "deviceName", type: 'input' },
	{ label: "模板名称", searchType: "TemplateName", type: 'input' },
	{ label: "月份", searchType: "billingCycle", type: 'month',format:'yyyy-MM',valueFormat:'yyyy-MM' },
    { label: "客户名称", searchType: "billCustomerName", type: 'input' },
	{ label: "月份", searchType: "billCycle", type: 'date',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
	{ label: "注册状态", searchType: "associateMaster", type: 'select' ,selectList:associateMaster},
	{ label: "产品代码", searchType: "productCode", type: 'input' },
	{ label: 'UID', searchType: "uid", type: 'input' },
	{ label: "云账号", searchType: "cloudAccount", type: 'input'},
    { label: "客户名称", searchType: "IntClientName", type: 'input',maxLength:30},
    { label: "云账号邮箱", searchType: "cloudAccountEmail", type: 'input' },//云账号邮箱
    { label: "跟进销售", searchType: "sales", type: 'input' },
    { label: "生效时间",searchType:'policyTime',type:'daterange',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
	
	
	{ label: "付费类型", searchType: "subscriptionType", type: 'select' ,selectList:paymentType,all:true},
	{ label: "订单类型", searchType: "billorderType", type: 'input' },
	{ label: "地域", searchType: "billRegion", type: 'input' },
	{ label: "实例 ID", searchType: "instanceId", type: 'input' },//实例id  
	{ label: '实例名称', searchType: 'instanceBillNAme', type: 'input' },//实例名称
	{ label: "产品代码", searchType: "billProduct1", type: 'input' },//产品代码
	{ label: "产品代码", searchType: "billProduct",type: 'INTLProductSelect', selectList: []  },//产品代码

    { label: "IPv4网段", searchType:"cidrBlock", type:'input'},
    { label: "状态",searchType:"redisStatus",type:'select',selectList:constantMap.redisStatusList },
	
	{ label: '产品类型', searchType: 'productType', type: 'input' },
	{label: "付费类型", searchType: "subType", type: 'select', selectList:subTypeList,all:true},
	{ label: '客户', searchType:"orderCustomer", type:'input'},
	{ label: "结束账期",searchType:'billingEndCycle',type:'month',format:'yyyy-MM',valueFormat:'yyyy-MM'},
	{ label: "开始账期",searchType:'billingStartCycle',type:'month',format:'yyyy-MM',valueFormat:'yyyy-MM'},
	
	
	{label: "付费类型", searchType: "orderSubType", type: 'select', selectList:orderSubType},
	{ label: "账单开始时间",searchType:'usageStartTime',type:'date',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
	{ label: "账单结束时间",searchType:'usageEndTime',type:'date',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
    { label: "用户名",searchType:'username',type:'input'},
    { label: "连接地址",searchType:'authUrl',type:'input'},
    { label: "互联IP段",searchType:'gatewayIp',type:'input'},
    { label: "云侧互联IP",searchType:'localGatewayIp',type:'input'},
    { label: "客户侧互联IP",searchType:'peerGatewayIp',type:'input'},
    { label: "虚拟专线ID",searchType:'virtualDirectConnectionId',type:'input'},
    { label: "Vlan Id",searchType:'vlanId',type:'input'},
    { label: "客户专线",searchType:'directConnectId',type:'input'},
    { label: "设备IP",searchType:'ipAddress',type:'input'},
    { label: "状态",searchType:'vbrStatus',type:'select',selectList: [{value: 1,label:'开通中'},{value: 2,label:'使用中'}],all:true},
    { label: "开通时间",searchType:'enabledTime',type:'date',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
    { label: "状态",searchType:'cenStatus',type:'select',selectList: [{value: 1,label:'创建中'},{value: 2,label:'运行中'},{value: 3,label:'删除中'}],all:true},
    { label: "网元类型",searchType:'neType',type:'select',selectList: [{value: 1,label:'云侧AC'},{value: 2,label:'网侧AC'},{value: 3,label:'主网元'}],all:true},
    { label: "网元通信状态",searchType:'communicationState',type:'select',selectList: [{value: 0,label:'正常'},{value: 1,label:'中断'},{value: 10,label:'未知'}],all:true},
    /* 云企业网 qinjunqiang 20200622 update by tcy:providerId所有资源共用 */
    { label: '实例 ID', searchType: 'providerId', type: 'input' },
	{label: '支付状态', searchType: "paymentStatus", type: 'select', selectList:constantMap.cloudPaymentStatus,all:true},
	{ label: "云上创建时间",searchType:'cloudCreateTime',type:'date',format:'yyyy-MM-dd',valueFormat:'timestamp'},//valueFormat为timestamp就是传时间戳
	{ label:"申请时间",searchType:'createTime',type:'date',format:'yyyy-MM-dd',valueFormat:'timestamp'},
	{ label:"开通时间",searchType:'openTime',type:'date',format:'yyyy-MM-dd',valueFormat:'timestamp'},
	{ label: '云账号ID', searchType: 'orderAccountId', type: 'input' },
	{ label: '订单ID', searchType: 'BillOrderId', type: 'input' },
    {label: '状态', searchType: "status", type: 'select', selectList:BillStatus,all:true},
    {label:'状态',searchType:'tenantStatus',type:'select',selectList:tenantStatus,all:true},
	{ label: '厂商账号ID', searchType: 'customerAccountId', type: 'input' },
	{label: '账号类型', searchType: "accountType", type: 'select', selectList:customerAccountType,all:true},
	{label: '关联客户状态', searchType: "associateCustomer", type: 'select', selectList:customerAssociate,all:true},
	{ label: '账号邮箱', searchType: 'customerEmail', type: 'input' },
	{label: '资质类型', searchType: "certType", type: 'select', selectList: accountCertType,all:true},
	{ label: '标签名称', searchType: 'tagName', type: 'input' },
	{ label: '云盘类型', searchType: "volumeType", type: 'select', selectList: constantMap.DiskAttr,all:true},

    { label: '主网元', searchType: "masterNeName", type: 'input'},
    { label: '主网元端口', searchType: "masterNePortName", type: 'input'},
    { label: '备网元', searchType: "slaveNeName", type: 'input'},
    { label: '备网元端口', searchType: "slaveNePortName", type: 'input'},
	{ label: '公网IP', searchType: "floatingIp", type: 'input'},
	{ label: '私有IP', searchType: "primaryIp", type: 'input'},
    // { label:'GPU(核)',searchType:'gpus',type:'input'},
    // { label: 'GROUP', searchType: "groupCode", type: 'input'},
    { label:'账号来源',searchType:'platformRelatedAccount',type:'select',selectList:constantMap['relatedAccount'],all:true},
	{ label: 'GROUP', searchType: "groupCode", type: 'input'},
    { label: '客户类型', searchType: "tenantType", type: 'select', selectList:tenantType,all:true},
	{ label: '客户名称', searchType: "tenantId", type: 'input'},
    // { label: '账号来源', searchType: "platformRelatedAccount", type: 'select', selectList:constantMap['relatedAccount'],all:true},
    

];
export default searchList