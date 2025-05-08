const { HTTP, CONTENT, ACCEPT } = require('./../types/enums')
const { BadRequest, MethodNotAllowed, NotFound } = require('./../types/exception')

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
    throw new MethodNotAllowed(`지원되지 않는 유형의 요청 ${reqMethod}`)
  }
}

const assertAcceptJson = (request) => {
  const { accept } = request
  if (accept !== ACCEPT.JSON) {
    throw new BadRequest(`지원되지 않는 응답 헤더 ${accept}`)
  }
}

const parseRequestURL = (request) => {
  const { requestURL, method } = request

  // 쿼리스트링 파라미터는 GET 요청에만 허용
  if (requestURL.includes('?') && method !== HTTP.GET) {
    throw new BadRequest('쿼리 스트링은 get 요청에만 허용')
  }

  const [requestURI, params] = requestURL.split('?')
  if (requestURI.includes(':')) {
    throw new BadRequest('request URI에는 ":" 를 포함할 수 없음')
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
    throw new BadRequest('form 데이터 전송은 post만 가능, body 필수')
  }
  request.parameterMap = parseQueryStr(body)
}
const parseRequestBody = (request) => {
  const { contentType, method, body } = request
  if (contentType !== CONTENT.JSON) return
  // GET, DELETE는 body로 데이터를 전달하지 않으므로 contentType은 설정하지 않음
  if ([HTTP.GET, HTTP.DELETE].includes(method)) {
    throw new BadRequest('get, delete 는 json 형식의 데이터를 전송받지 않음')
  }
  if (!body) {
    throw new BadRequest('전송하는 데이터가 json인 경우 body 필수')
  }
  request.requestBody = JSON.parse(body)
}

module.exports = {
  parseHttpRequest,
}
