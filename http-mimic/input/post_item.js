const { ACCEPT, CONTENT } = require('./../types/enums')
const { encodedFormBody } = require('./../modules/utils')
module.exports = JSON.stringify({
  requestURL: '/item',
  method: 'post',
  accept: ACCEPT.JSON,
  contentType: CONTENT.FORM,
  body: encodedFormBody({ name: '추가하는 item' }),
})
