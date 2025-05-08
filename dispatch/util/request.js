const { HTTP, CONTENT, ACCEPT } = require('./../types/enums')
const { BadRequest, MethodNotAllowed, NotFound } = require('./../types/enums')

const { parseQueryStr } = require('./utils')

const parseHttpRequest = (request) => {
  assertAllowdMethod(request)
  assertAcceptJson(request)

  parseRequestURL(request)
  parseFormData(request)
  parseRequestBody(request)
}

const assertAllowdMethod = (request) => {
  const reqMethod = ('' + request.method).toUpperCase().trim()
  request.method = reqMethod
  if (!Object.values(HTTP).includes(reqMethod)) {
    throw new MethodNotAllowed()
  }
}

const assertAcceptJson = (request) => {
  const { accept } = request
  if (accept !== ACCEPT.JSON) {
    throw new BadRequest()
  }
}

const parseRequestURL = (request) => {
  const { requestURL, method } = request

  // 쿼리스트링 파라미터는 GET 요청에만 허용
  if (requestURL.includes('?') && method !== HTTP.GET) {
    throw new BadRequest()
  }

  const [requestURI, params] = requestURL.split('?')
  if (requestURI.includes(':')) {
    throw new BadRequest()
  }

  delete request.requestURL
  request.requestURI = requestURI

  if (params) {
    request.parameterMap = parseQueryStr(params)
  }
}

const parseFormData = (request) => {
  const { contentType, method, body } = request
  if (contentType !== CONTENT.FORM) return

  if (method !== HTTP.POST || !body) {
    throw new BadRequest()
  }
  request.parameterMap = parseQueryStr(body)
}
const parseRequestBody = (request) => {
  const { contentType, method, body } = request
  if (contentType !== CONTENT.JSON) return
  // GET, DELETE는 body로 데이터를 전달하지 않으므로 contentType은 설정하지 않음
  if (!body || [HTTP.GET, HTTP.DELETE].includes(method)) {
    throw new BadRequest()
  }
  request.requestBody = JSON.parse(body)
}

module.exports = {
  parseHttpRequest,
}
