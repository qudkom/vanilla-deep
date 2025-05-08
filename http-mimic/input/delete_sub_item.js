const { ACCEPT, CONTENT } = require('./../types/enums')
module.exports = JSON.stringify({
  requestURL: '/item/1/sub-item/A',
  method: 'delete',
  accept: ACCEPT.JSON,
})
