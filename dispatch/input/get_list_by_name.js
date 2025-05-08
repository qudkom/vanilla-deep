const { CONTENT, ACCEPT } = require('./enums')
module.exports = JSON.stringify({
  requestURL: '/list?name=1&name=2',
  method: 'get',
  contentType: CONTENT.JSON,
  accept: ACCEPT.JSON,
})
