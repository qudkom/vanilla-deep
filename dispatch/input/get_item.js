const { ACCEPT } = require('./../types/enums')

module.exports = JSON.stringify({
  requestURL: '/item/1',
  method: 'get',
  accept: ACCEPT.JSON,
})
