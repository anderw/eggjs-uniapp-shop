import { dateFormat, formatTime } from '@/utils'
import {cloudPlatform} from '@/utils/cloudPlatform'
import {constantMap} from '@/utils/constant'
import store from "@/store";
/**
 * @description     数字 格式化
 *
 * @param       { num:Number, digits:Number } num为要转化的源数字，digits为保留小数点位数
 * @return      { String }              必反，返回转化后的数字字符串
 *
 * @example     numberFormatter(145678,2)  =>  14.57万
 * */
export function numberFormatter(num, digits) {
    const si = [
        { value: 1E12, symbol: '万亿' },
        { value: 1E8, symbol: '亿' },
        { value: 1E4, symbol: '万' },
        { value: 1E3, symbol: '千' }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

/**
 * @description     将数字转化为以逗号隔开的数字字符串
 *
 * @param       { num:Number }    num为要转化的源数字
 * @param       { digit: Number}  digit为保留小数点的位数，默认为2
 * @return      { String }        必反，返回转化后的数字字符串
 *
 * @example     toThousandFilter(14567867)  =>  14,567,867
 * */
export function toThousandFilter(num,digit) {
    var amount = (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    if(amount.indexOf('.')<=-1){
        amount += '.00';
    }
    return amount;
}


/**
 * @description     时间 格式化
 *
 * @param       { timeStamp:Number }    timeStamp为时间搓
 * @return      { String }              必反，返回转化后的时间字符串
 *
 * */

 export function time(timeStamp,farmat){
    return timeStamp?dateFormat(timeStamp,farmat) : '--'
 }


/**
 * @description     空白占位符
 *
 * @return      { String }              数据为空时显示 --
 *
 * */
 export function emptyFilter(val){
    return (val===''||val===null||val==undefined)?'--':val;
 }

/**
 * @description     枚举类型（常量转换）
 *
 * */

export function constant(input,name){
    var ref = constantMap[name];
    try {
        if(typeof input == null || typeof input == "undefined" || input === ""){
            return '--'
        }{
            for (var i = 0; i < ref.length; i++) {
                if (ref[i].value == input) {
                    break ;
                }
            }
            return ref[i] && ref[i].displayName||ref[i].label || input;
        }
    }catch (e){
       return input
    }
}

/**
 * @description     金额过滤器
 *
 * */
export function amount(amount,len){
    //解决toFixed兼容问题
        if(len>20 || len<0){
            throw new RangeError('toFixed() digits argument must be between 0 and 20');
        }
        // .123转为0.123
        var number = Number(amount);

        if (isNaN(number) || number >= Math.pow(10, 21)) {
            return number.toString();
        }

        if (typeof (len) == 'undefined' || len == 0) {
            return (Math.round(number)).toString();
        }

        var result = number.toString(),

            numberArr = result.split('.');

        if(numberArr.length<2){
            //整数的情况
            return padNum(result);
        }

        var intNum = numberArr[0], //整数部分
            deciNum = numberArr[1],//小数部分
            lastNum = deciNum.substr(len, 1);//最后一个数字

        if(deciNum.length == len){
            //需要截取的长度等于当前长度
            return result;
        }
        if(deciNum.length < len){
            //需要截取的长度大于当前长度 1.3.toFixed(2)
            return padNum(result)
        }
        //需要截取的长度小于当前长度，需要判断最后一位数字
        result = intNum + '.' + deciNum.substr(0, len);
        if(parseInt(lastNum, 10)>=5){
            //最后一位数字大于5，要进位
            var times = Math.pow(10, len); //需要放大的倍数
            var changedInt = Number(result.replace('.',''));//截取后转为整数
            changedInt++;//整数进位
            changedInt /= times;//整数转为小数，注：有可能还是整数
            result = padNum(changedInt+'');
        }
        return result;


        //对数字末尾加0
        function padNum(num){
            var dotPos = num.indexOf('.');
            if(dotPos === -1){
                //整数的情况
                num += '.';
                for(var i = 0;i<len;i++){
                    num += '0';
                }
                return num;
            } else {
                //小数的情况
                var need = len - (num.length - dotPos - 1);
                for(var j = 0;j<need;j++){
                    num += '0';
                }
                return num;
            }
        }
}

export function castFilter(num,digit) {
    if(!digit){
        digit = 2;
    }
    if(!num){
        return '0.'+new Array(digit).fill('0').join('');
    }
    num = parseFloat(num).toFixed(digit);//-0.0005返回仍然是-0.00
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if(num == '-0' || num=='-0.00'){parts[0] = 0;}
    return parts.join(".");
}


/*
* 为邮箱和电话号码打掩码
*
* 格式：12****23
* */

export function maskSecret(val){
    let maskSecret = store.getters.maskSecret;
    let isSecret = maskSecret.value;// 返回值："true"
    if(!val) {
        return '--'
    }
    let str = val+'';
    if(isSecret){
        str = val.substr(0,2)+'****'+val.substr(val.length-2,2)
    }else {
        str = val;
    }
    return str;
}
