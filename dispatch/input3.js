module.exports = JSON.stringify({
  requestURL: '/item',
  method: 'post',
  body: JSON.stringify({
    name: ['aaa', 'bbb'],
  }),
  contentType: 'application/json',
})
