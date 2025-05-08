const { ACCEPT, CONTENT } = require('./../types/enums')
const { encodedFormBody } = require('./../modules/utils')
module.exports = JSON.stringify({
  requestURL: '/item/1',
  method: 'put',
  accept: ACCEPT.JSON,
  contentType: CONTENT.JSON,
  body: JSON.stringify({ name: '수정될 item' }),
})
