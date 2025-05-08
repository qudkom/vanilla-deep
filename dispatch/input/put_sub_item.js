const { ACCEPT, CONTENT } = require('./../types/enums')
module.exports = JSON.stringify({
  requestURL: '/item/1/sub-item/A',
  method: 'put',
  accept: ACCEPT.JSON,
  contentType: CONTENT.JSON,
  body: JSON.stringify({ name: '수정될 서브항목' }),
})
