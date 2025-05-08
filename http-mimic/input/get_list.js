const { CONTENT, ACCEPT } = require('./../types/enums')
const { buildQueryStr } = require('./../modules/utils')
module.exports = JSON.stringify({
  requestURL: '/items',
  method: 'get',
  accept: ACCEPT.JSON,
})
