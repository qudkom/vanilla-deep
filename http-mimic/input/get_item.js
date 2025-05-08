const { ACCEPT, CONTENT } = require('./../types/enums')
const { buildQueryStr } = require('./../modules/utils')
module.exports = JSON.stringify({
  requestURL: '/item/1',
  method: 'get',
  accept: ACCEPT.JSON,
  // accept: ACCEPT.TEXT,
  // contentType: CONTENT.JSON,
})
