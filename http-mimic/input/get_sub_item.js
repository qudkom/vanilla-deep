const { ACCEPT } = require('../types/enums')
const { buildQueryStr } = require('../modules/utils')
module.exports = JSON.stringify({
  requestURL: '/item/1/sub-item/A',
  method: 'get',
  accept: ACCEPT.JSON,
})
