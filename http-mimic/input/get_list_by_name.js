const { CONTENT, ACCEPT } = require('./../types/enums')
const { buildQueryStr } = require('./../util/utils')
module.exports = JSON.stringify({
  requestURL: '/items' + buildQueryStr({ name: [1, 2] }),
  method: 'get',
  accept: ACCEPT.JSON,
})
