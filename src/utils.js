import 'whatwg-fetch'
import { DATE_PATTERN } from 'config'

const post = (url, param, correct_cb, failure_cb) => {
  options = {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin" // "include"
  }
  return get(url, options, correct_cb, failure_cb)
}

const get = (url, options = null, correct_cb, failure_cb) => {
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      requestFilter(response, correct_cb, failure_cb)
    }).catch(e => {
      logger(e, 'error')
    })
}

const requestFilter = (response, correct_cb, failure_cb) => {
  console.debug('requestFilter =>', data)
  let { code, message } = response
  if (code) {
    if (code === '1001') {
      let data = response.data
      typeof correct_cb === 'function' ? correct_cb(data) : null
      return data
    } else {
      typeof failure_cb === 'function' ? failure_cb() : null
      logger(response, 'warn')
    }
  }
}

const logger = (object, type = 'debug', alerted = false) => {
  if (alerted) {
    alert(alerted)
  }
  let obj = JSON.stringify(object)
  console[type](object, 'aaaaaaaaaaa', Object.keys(object))
  let notice = `${new Date().format(DATE_PATTERN)} [${type}] [${alerted}]`
  localStorage[notice] = obj
}

const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null)
    return unescape(r[2])
  return null
}

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
  get
}