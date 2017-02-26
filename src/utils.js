import 'whatwg-fetch'
import { DATE_PATTERN } from 'config'

const post = async (url, param = null) => {
  // JSON.stringify(param)
  let options = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await get(url, options)
}

const get = async (url, options = null) => {
  // fetch(url, options)
  //   .then(response => response.json())
  //   .then(response => {
  //     return requestFilter(response, correct_cb, failure_cb)
  //   }).catch(e => {
  //     logger(e, 'error')
  //   })
  try {
    let response = await fetch(url, options)
    let data = await response.json()
    return requestFilter(data)
  } catch (e) {
    logger(e, 'error')
  }
}

const requestFilter = (response) => {
  console.debug('requestFilter =>', response)
  let { code, message, data, status} = response
  return new Promise((resolve, reject) => {
    if (code) {
      if (code === '1001') {
        resolve(data)
      } else {
        reject(data)
        logger(response, message)
      }
    }
    if (status) {
      reject(status)
      logger(response, 'error')
    }
  })
}

const logger = (object, type = 'debug', alerted = false) => {
  if (alerted) {
    alert(alerted)
  }
  let obj = JSON.stringify(object)
  console[type]('logger =>', object, obj)
  let notice = `${new Date().format(DATE_PATTERN)} [${type}] [${alerted}]`
  localStorage[notice] =  `object:${object}; parse:${obj}`
}

const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null)
    return unescape(r[2])
  return null
}

const urlEncode = (param, key, encode) => {
  if(param==null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

const emptyObject = (obj) => {
  return obj.constructor === Object && Object.keys(obj).length === 0
}

Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month 
    "D+": this.getDate(), //day 
    "H+": this.getHours(), //hour 
    "m+": this.getMinutes(), //minute 
    "s+": this.getSeconds(), //second 
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
    "S": this.getMilliseconds() //millisecond 
  }

  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

module.exports = {
  post,
  get,
  urlEncode
}