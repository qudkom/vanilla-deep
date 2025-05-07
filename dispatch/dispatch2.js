const INPUT = require('./input')
const GET = 'GET'
const POST = 'POST'
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

/**
 * @param {string} method
 * @returns {Function[]}
 */
const matchHandler = (request) => {
  const { method } = request
  let handlers = null
  switch (method) {
    case GET: {
      handlers = getHandlers
      break
    }
    case POST: {
      handlers = postHandlers
      break
    }
    default: {
      throw new MethodNotAllowed()
    }
  }
  return handlers
}

const wrapResponse = (resopnse) => {
  const responseBody = JSON.stringify(resopnse)
  return {
    status: 200,
    message: 'success',
    body: responseBody,
  }
}

const parseRequest = () => {}

const parseGetRequest = (request) => {
  const { requestURL } = request
  const [requestURI, params] = requestURL.split('?')
  delete request.requestURL
  request.requestURI = requestURI
  if (params) {
    request.parameterMap = parseKeyValues(params)
  }
}
const parsePostRequest = (request) => {
  const { requestURL, body, contentType } = request
  delete request.requestURL
  request.requestURI = requestURL
  switch (contentType) {
    case 'application/x-www-form-urlencoded': {
      request.parameterMap = parseKeyValues(body)
      break
    }
    case 'application/json': {
      request.requestBody = JSON.parse(body)
      break
    }
    default: {
      throw new BadRequest()
    }
  }
  return result
}
const parseKeyValues = (input) => {
  const params = input.split('&')
  const paramMap = params.reduce((acc, item) => {
    const [key, value] = item.split('=')
    let values = []
    if (!acc[key]) {
      acc[key] = values
    }
    values.push(value.trim())
    return acc
  }, {})
  const finalParamMap = Object.fromEntries(Object.entries(paramMap).map((key, values) => (values.length === 1 ? [key, values[0]] : [key, values])))
  return finalParamMap
}
//
// request parse 이후에 사용할 것들
const parsePathVariables = (request, context) => {
  const { matchingUri } = context
  const { requestURI } = request
  if (!matchingUri.contains(':')) return
  const pathVariableMap = {}
  const matchingUriParts = matchingUri.split('/')
  const requestUriParts = requestURI.split('/')

  for (const [i, matchingPart] of matchingUriParts.entries()) {
    if (!matchingPart.startsWith(':')) continue
    const requestPart = requestUriParts[i]
    const pathVariable = matchingPart.slice(1)
    pathVariableMap[pathVariable] = requestPart
  }
  context.pathVariableMap = pathVariableMap
}

const findMatchingHandler = (request, context) => {
  const { requestURI, method, parameterMap, requestBody } = request
  if (requestURI.contains(':')) throw new BadRequest()

  const allUriList = Object.keys(requestMapping)
  const matchingUri = allUriList.find((uri) => {
    const uriParts = uri.split('/')
    const requestUriParts = requestURI.split('/')
    if (uriParts.length !== requestUriParts.length) return false
    return uriParts.every((part, index) => (part.startsWith(':') ? true : part === requestUriParts[index]))
  })
  if (!matchingUri) {
    throw new NotFound()
  }
  context.matchingUri = matchingUri
}

const requestMapping = {
  '/item/:id': {
    GET: (params, pathVarMap) => {},
    POST: (params, pathVarMap) => {},
  },
  '/list': {
    GET: (params) => {},
  },
}

const invokeHandler = (request, context) => {
  const { method, parameterMap, requestBody } = request
  const { matchingUri } = context
  const handler = requestMapping[matchingUri][method]
  if (!handler) {
    throw new MethodNotAllowed()
  }
  const { pathVariableMap } = context
  return handler(parameterMap || requestBody || {}, pathVariableMap || {})
}

// const requestProcessor = [matchHandler, serializeResponse]

const getHandlers = [parseGetRequest, findMatchingHandler, parsePathVariables, invokeHandler]
const postHandlers = [parsePostRequest, findMatchingHandler, parsePathVariables, invokeHandler]

const dispatchHandler = (handlers, request) => {
  let index = 0
  let handler = null
  let result = null
  const context = {}
  while (index < handlers.length) {
    handler = handlers[index++]
    result = handler(request, context)
  }
  return result
}

const processRequest = (input) => {
  const request = JSON.parse(input)
  const result = (() => {
    try {
      request.method = ('' + request.method).toUpperCase().trim()
      const handlers = matchHandler(request)
      const result = dispatchHandler(handlers, request)
      return wrapResponse(result)
    } catch (err) {
      console.log(err.message)
      return {
        status: err.status,
        message: err.status,
      }
    }
  })()
  return JSON.stringify(result)
}
