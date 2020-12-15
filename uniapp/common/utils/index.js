/**
 * @description     公共方法
 *
 * @author          
 * @email           
 * @phone           
 * @create          2019-02-13 11:00
 * */

export function dateFormat(time, format) {
    if (arguments.length === 0) {
        return null
    }
    if (!time) {
        return null
    }
    let fmt = format || 'yyyy-MM-dd hh:mm:ss'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }

    const o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    } else {
      time = +time
    }
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return dateFormat(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }
//计算延期时长
export function delayTime(timestemp, option){
    const d = new Date();
    //延期
    const getDiffStr = (diff)=>{
        diff = diff/1000;
        if(diff<3600*24){
            return Math.ceil(diff / (3600))+'小时'
        }
        if(diff<3600 * 24 * 30){
            return Math.ceil(diff / (3600 * 24))+'天'
        }
        if(diff<3600*24*365){
            const days = Math.ceil(diff / (3600 * 24))
            const str = Math.floor(days/30)+'月'+days%30+'天'
            return str
        }
        if(diff>=3600*24*365){
            return Math.floor(diff/(3600*24*365))+'年'
        }
    }
    if(d.getTime()>timestemp){
        var diff = d.getTime() - timestemp;
        return getDiffStr(diff)
    }else{
        var diff = timestemp - d.getTime();
        return getDiffStr(diff)+'后延期'
    }
}

/**
 * @description     获取当前url参数
 *
 * @param       { key:String }         key为需要获取的参数
 * @return      { String }             必反，返回对应参数的值
 *
 * */
export function getQueryString(key) {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return "";
}

export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    )
}

export function objectMerge(target, source) {
    /* Merges two  objects,
       giving the last one precedence */

    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}


export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

/**
 * @description     对象深拷贝
 *
 * @param       { source:Object }         source为需要拷贝的源对象
 * @return      { Object }                返回拷贝后的新的对象
 *
 * */
export function deepClone(source) {
    if (!source || typeof source !== 'object') {
        return source;
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            if(source[keys]===null){
                targetObj[keys] = null
            }else if(source[keys].constructor===RegExp || source[keys].constructor===Date || source[keys].constructor===Symbol){
                targetObj[keys] = source[keys]
            }else{
                targetObj[keys] = deepClone(source[keys])
            }
        } else {
            targetObj[keys] = source[keys]
        }
    });
    return targetObj
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}


/**
 * 生成一个用不重复的ID
 */
export function genNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36).substr(0,randomLength)
}


/**
 * 判断空对象
 */
export function isEmptyObj(val) {
    if(!(val !== null && typeof val === 'object')){
        return false
    }
    for(const i in val){
        return true
    }
    return false;
}
function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
}

export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}