class BadRequest extends Error {
  message = 'bad request'
  status = 400
}
class MethodNotAllowed extends Error {
  message = 'method not allowed'
  status = 405
}
class NotFound extends Error {
  message = 'not found'
  status = 404
}

module.exports = {
  BadRequest,
  MethodNotAllowed,
  NotFound,
}
