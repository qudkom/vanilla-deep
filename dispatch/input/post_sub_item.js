const { ACCEPT, CONTENT } = require('./../types/enums')
const { encodedFormBody } = require('./../util/utils')
module.exports = JSON.stringify({
  requestURL: '/item/1/sub-item',
  method: 'post',
  accept: ACCEPT.JSON,
  contentType: CONTENT.FORM,
  body: encodedFormBody({ name: '추가하는 sub item' }),
})
