/**
 * @description     公共校验方法
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2019-02-13 11:00
 *
 * @editAuthor      qinjunqiang
 * @update          2019-04-04 16:44
 * */


	/* eslint-disable */
/* 正则校验数据字典 */
const regMap = {
    //大于0的数字（包含小数和整数）的正则表达式
    positiveNumber:　/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
    // url 格式
    urlReg: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,

    // 全小写字母
    lowerCase: /^[a-z]+$/,

    // 全大写字母
    upperCase: /^[A-Za-z]+$/,

    // 邮箱
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    // 手机号（国内/国际）
    // 前后端统一电话格式：20位以内的+-数字，
    phone: /^[\d+-]{3,20}$/,

    //端口范围
    //0-65535
    port:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,

    // 座机号
    tel: /^((0\d{2,3}(-)?\d{7,8})|(1\d{10}))$/,

    // 姓名 or 企业名称，1 ~30 个中英文字符串
    name: /^[^\-_@\.][a-zA-Z\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF\s\-_@\.\(\)\（\）\d]*[^\-_@\.]$/,
	// 企业管理员 不能以数字、'_'开头
	tenantName:/^[^_\d][a-zA-Z\_\d]*$/,
	// 企业域名
	domain:/^[a-zA-Z\d]{2,20}$/,
	
    //安全组名称
    //用户姓名,
    //1.长度为2-20的数字、英文大小写、汉字;
    //2.可含有全角、半角的"（）"，"()"以及"@"和"."和“-”，"_";
    //3.不能在首尾用“-”，"_"，"@"和"."
    //4不能以数字开头
	username: /^[^\-_@.*0-9][a-zA-Z0-9\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF（）\(\)@.\-_]{0,18}[^\-_@.*]$/,
    //8 - 30 个字符，必须同时包含三项（大写字母、小写字母、数字、 ()`~!@#$%^&*_-+=|{}[]:;'<>,.?/ 中的特殊符号），其中 Windows 实例不能以斜线号（/）为首字符
    instancePassword: /^[^/][a-zA-Z0-9\(\)`~!@#\$%\^&\*_\-+=|\{\}\[\]:;'<>,\.\?\/]{7,29}$/,

    //2-128个字符，以大小写字母或中文开头，可包含数字、“.”、“_”、“:”或“-”
    instanceName: /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF:\._\-]{1,127}$/,

    instanceDesc: /^(?!http)[\s\S]{2,256}$/,

    //安全组规格的cidrBlock： 0.0.0.0 或者0.0.0.0/16，
    cidrBlock: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/,

    //IP地址，例如：192.168.1.1
    ip:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,

    //安全组名称：长度为2-128个字符，不能以特殊字符及数字开头，只可包含特殊字符中的"."、"_"、"-"和":"
    securityGroupName: /^[\u4e00-\u9fa5a-zA-Z]+[\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FFa-zA-Z0-9\._\-:]{1,59}$/,
    //安全组描述：长度为2-256个字符，不能以http://和http://开头
    securityGroupDesc: /^(?!http:\/\/|https:\/\/)[\s\S]{2,99}$/,//安全组描述：长度为2-256个字符，不能以http://和http://开头

    //正整数或保留两位小数
    amount: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,

    //客户（企业）名称,
    //1.数字、英文大小写、汉字、日文;
    //2.可含有全角、半角的"（）"，"()"以及"@"和"."和“-”，"_";
    //3.不能在首尾用“-”，"_"，"@"和"."
    enterpriseName: /^[^\-_@.*][0-9a-zA-Z\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF（）\(\)@.\-_\s]{0,98}[^\-_@.*]$/,

    //客户ID（第三方系统所需）,
    //1.字符串（数字，字母，-）
    thirdPartyId: /^[0-9a-zA-Z\-]{0,64}$/,
    //联系人名称,跟进销售
    //1.数字、英文大小写、汉字、日文;
    //2.可含有全角、半角的"（）"，"()"以及"@"和"."和“-”，"_";
    //3.不能在首尾用“-”，"_"，"@"和"."
    contactName: /^[^\-_@.*（）\(\)][0-9a-zA-Z\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF（）\(\)@.\-_\s]{0,18}[^\-_@.*（）\(\)]$/,
};

/* TODO 所有暴露的方法都调用该方法 */
function validate(str, type) {
    let reg = regMap[type];
    return reg.test(str);
}



/**
 * @description                 验证 url 是否合法
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validateURL(str) {
    return regMap['urlReg'].test(str || '');
}

/**
 * @description                 验证参数是否全部是小写字母
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validateLowerCase(str) {
    return regMap['lowerCase'].test(str || '');
}

/**
 * @description                 验证参数是否全部是大写字母
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validateUpperCase(str) {
    return regMap['upperCase'].test(str || '');
}

/**
 * @description                 验证邮箱格式
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validateEmail(str) {
    return regMap['email'].test(str || '');
}

/***
 * 验证端口号正确 
 */
function validatePort(str){
    return regMap['port'].test(str || '');
}

/**
 * @description                 验证手机号码格式（国内）
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validatePhone(str) {
    return regMap['phone'].test(str || '');
}

/**
 * @description                 验证手机号和座机号格式
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validatePhoneLandLine(str) {
    return regMap['tel'].test(str || '');
}

/****
 * 验证IP地址段
 */
function validateIp(str){
    return regMap['ip'].test(str || '');
}
/**
 * @description                 个人名称/企业名称, 1~30 个中英文字符串
 *
 * @param       { Any }         <str> 必传参数
 * @return      { boolean }     必反
 * */
function validateName(str) {
    return regMap['name'].test(str || '');
}

function validateUsername(str) {
    return regMap['username'].test(str || '')
}

function validateInstancePassword(password){
    if(!regMap.instancePassword.test(password)){console.log('格式')
        return false;
    }
    var passNum = 0;
    if(/[A-Z]/g.test(password)){
        passNum++;
    }
    if(/[a-z]/g.test(password)){
        passNum++;
    }
    if(/[0-9]/g.test(password)){
        passNum++;
    }
    if(/[\(\)`~!@#\$%\^&\*_\-+=|\{\}\[\]:;'<>,\.\?\/]/g.test(password)){
        passNum++;
    }
    if(passNum<3){
        return false;
    }
    return true;
}

	/* eslint-enable */

/*
* description  新增客户（企业）的相关正则
*
*create by 2020.02.25
* */

function validateEnterpriseName(str) {
    return regMap['enterpriseName'].test(str || '')
}
function validateThirdPartyId(str) {
    return regMap['thirdPartyId'].test(str || '')
}
function validateContactName(str) {
    return regMap['contactName'].test(str || '')
}


// /* 通过该文件暴露的方法 */
// // exports.validateURL = validateURL;
export {
    regMap,
    validateURL,                 // 验证 url 是否合法
    validateLowerCase,           // 验证参数是否全部是小写字母
    validateUpperCase,           // 验证参数是否全部是大写字母
    validateEmail,               // 验证邮箱格式
    validatePhone,               // 验证手机号码格式（国内）
    validatePort,                //验证端口号正确
    validatePhoneLandLine,       // 验证手机号和座机号格式
    validateName,                // 个人名称/企业名称, 1~30 个中英文字符串
    validateUsername,            //管理员昵称
    validateInstancePassword,     // 云主机密码校验
    validateIp,             //验证IP地址段是否正确
    validateEnterpriseName,             //验证客户（企业）名称
    validateThirdPartyId,             //验证客户（企业）第三方
    validateContactName,             //验证联系人名称
}