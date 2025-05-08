class BadRequest extends Error {
  status = 400
  static #type = 'bad request'
  constructor(message) {
    super()
    this.message = `[${BadRequest.#type}] ${message}`
  }
}
class MethodNotAllowed extends Error {
  status = 405
  static #type = 'method not allowed'
  constructor(message) {
    super()
    this.message = `[${MethodNotAllowed.#type}] ${message}`
  }
}
class NotFound extends Error {
  status = 404
  static #type = 'not found'
  constructor(message) {
    super()
    this.message = `[${NotFound.#type}] ${message}`
  }
}

module.exports = {
  BadRequest,
  MethodNotAllowed,
  NotFound,
}
