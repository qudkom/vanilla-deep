const { CONTENT, ACCEPT } = require('./enums')
module.exports = JSON.stringify({
  requestURL: '/list',
  method: 'get',
  accept: ACCEPT.JSON,
})
