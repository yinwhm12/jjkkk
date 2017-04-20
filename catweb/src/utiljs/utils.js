/**
 * Created by Administrator on 2017/1/6.
 */
let util = {
  stampToTime(timestamp) {
    "use strict";
    let newDate = new Date();
    newDate.setTime(timestamp * 1000);
    return newDate.format('yyyy-MM-dd')
  },
  parseDate(i){
    "use strict";
    if (typeof i == "number") {
      let newDate = new Date();
      newDate.setTime(i * 1000);
      return newDate
    } else {
      return new Date(i)
    }
  },
  /**
   * @return {number}
   */
  timeToStamp(timeString){
    let timestamp2 = Date.parse(new Date(timeString));
    timestamp2 = timestamp2 / 1000;
    if (!timestamp2) {
      timestamp2 = 0
    }
    return timestamp2
  },
  buildGetParams(params){
    if (typeof params == "string") {
      return params
    }
    if (!params) {
      return params
    }
    let result = ""
    params = this._filterParams(params)

    for (let key in params) {
      result += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    }
    return result.substr(1)
  },
  buildPostParams(params){
    if (typeof params == "string") {
      return params
    }
    if (!params) {
      return params
    }
    params = this._filterParams(params)
    return JSON.stringify(params)
  },
  _filterParams(params){
    let temp = {}
    for (let key in params) {
      key = key.replace(" ", "")
      let value = params[key]
      let index = key.indexOf("|")
      if (index != -1) {
        let filter = key.substr(index + 1)
        key = key.substr(0, index)

        switch (filter) {
          case "stampToTime":
            value = this.stampToTime(value)
            break
          case "timeToStamp":
            value = this.timeToStamp(value)
            break
          case "timeFormat":
            if (typeof value == "object") {
              try {
                value = value.format("yyyy-MM-dd")
              }
              catch (e) {
                value = ""
              }
            } else {
              value = ""
            }
            break
          case "number":
            try {
              value = parseFloat(value)
              if (isNaN(value)) {
                value = 0
              }
            } catch (e) {
              value = 0
            }
            break
          case "json":
            if (typeof value === "string") {
              value = JSON.parse(value)
            } else {
              value = JSON.stringify(value)
            }
            break
          case "query":
            if (typeof value === "string") {
            } else {
              value = value.join(";")
            }
            break
          case "page":
            temp['limit'] = value.limit
            value = this.buildOffsetByPage(value.currPage, value.limit)
            break
        }
      }
      temp[key] = value
    }
    return temp
  },
  // stampToTime:时间戳转时间字符串, timeToStamp:时间字符串转时间戳
  // dateToTimeString(format):date对象转时间字符串(fomat:yyyy-MM-dd)
  // dateToTimestamp:date转时间戳,
  // timestampToDate:时间戳转date
  // number:parseFloat
  // json:json字符串与json对象互转
  _transformValue(value, rule){
    let rr = rule.split('(')
    let ruleValues = null
    rule = rr[0]
    if (rr.length == 2) {
      ruleValues = rr[1].substr(0, rr[1].length - 1).split(',')
    }
    switch (rule) {
      case "stampToTime":
        value = this.stampToTime(value)
        break
      case "timeToStamp":
        value = this.timeToStamp(value)
        break
      case "dateToTimeString":
        value = value.format(ruleValues ? ruleValues[0] : "yyyy-MM-dd")
        break
      case "dateToTimestamp":
        value = Date.parse(value) / 1000
        break
      case "timestampToDate":
        let timestamp = value
        value = new Date();
        value.setTime(timestamp * 1000);
        break
      case "number":
        try {
          value = parseFloat(value)
          if (isNaN(value)) {
            value = 0
          }
        } catch (e) {
          value = 0
        }
        break
      case "json":
        if (typeof value == "string") {
          value = JSON.parse(value)
        } else {
          value = JSON.stringify(value)
        }
        break
    }

    return value
  },
  // transform obj
  objectTransform(obj, rules){
    obj = _.cloneDeep(obj)

    for (let key in rules) {
      let rule = rules[key]
      if (rule == '-') {
        delete obj[key]
      } else if (typeof rule === 'function') {
        obj[key] = rule(obj[key])
      } else {
        obj[key] = this._transformValue(obj[key], rule)
      }
    }
    return obj
  },
  buildOffsetByPage(toPage, limit) {
    if (!toPage) {
      return 0
    }
    return (toPage - 1) * limit
  },
  downloadFileUrl(fileId){
    "use strict";
    let xtoken = sessionStorage.getItem("token")
    return ENV.HOST_URL + "/asset/" + fileId + "?_token=" + xtoken
  },
  buildFileUrl(fileId){
    "use strict";
    return ENV.HOST_URL + "/asset/" + fileId + "?_token=" + sessionStorage.getItem("token")
  },
  previewFile(fileId){
    "use strict";
    let url = this.buildFileUrl(fileId)
    eventBus.$emit("preview", url)
  },
  fileUpload(url, data, callback, before){
    "use strict";
    let oData = new FormData();
    for (let key in data) {
      oData.append(key, data[key]);
    }

    let oReq = new XMLHttpRequest();
    let xtoken = sessionStorage.getItem("token")
    oReq.open("POST", url, true);
    if (before) {
      before(oReq)
    }
    if (xtoken) {
      oReq.setRequestHeader("Authorization", xtoken);
    }
    oReq.onprogress = (e) => {
      if (e.lengthComputable) {
        let p = e.loaded / e.total * 100
        callback("progress", p)
      }
    }
    oReq.onload = (e) => {
      if (oReq.status != 200) {
        callback("error", oReq.status)
      } else {
        callback("success", oReq.response)
      }
    }
    oReq.send(oData);
  },
  // unused
  // 传入两个时间,计算出中间的月份
  splitTimeMouth(startTime, endTime){
    "use strict";
    startTime = startTime.substr(0, 7)
    endTime = endTime.substr(0, 7)

    let sT = new Date(startTime)
    let eT = new Date(endTime)

    if (sT.format('yyyy-MM') === eT.format('yyyy-MM')) {
      return [sT.format('yyyy-MM')]
    }
    if (sT > eT) {
      return this.splitTimeMouth(endTime, startTime)
    }
    let result = []
    result.push(sT.format('yyyy-MM'))

    while (true) {
      sT.setMonth(sT.getMonth() + 1)
      result.push(sT.format('yyyy-MM'))
      if (sT.format('yyyy-MM') === endTime) {
        break
      }
    }
    return result
  },

  //比较两个日期是否为同一天,只判断年月日
  checkSameDay(firstTime, secondTime){
    // console.log("firstTime", firstTime)
    // console.log("secondTime", secondTime)
    if (!firstTime || !secondTime) {
      return true
    }
    return firstTime.format("yyyy-MM-dd") == secondTime.format("yyyy-MM-dd")
  },
  // 对比两个字符串的相似度
  compare(x, y) {
    let z = 0;
    let s = x.length + y.length;

    x.sort();
    y.sort();
    let a = x.shift();
    let b = y.shift();

    while (a !== undefined && b !== undefined) {
      if (a === b) {
        z++;
        a = x.shift();
        b = y.shift();
      } else if (a < b) {
        a = x.shift();
      } else if (a > b) {
        b = y.shift();
      }
    }
    return z / s * 200;
  }
}

export default util

let freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
let freeSelf = typeof self == 'object' && self && self.Object === Object && self;
let root = freeGlobal || freeSelf || Function('return this')()

root.util = util
