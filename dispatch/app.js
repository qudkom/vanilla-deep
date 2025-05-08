// 요청 데이터 예시
const INPUT = require('./input/get_item')
const { BadRequest, MethodNotAllowed, NotFound } = require('./types/exception')
const { parseHttpRequest } = require('./util/request')
const { requestMapping } = require('./controller')

// request parse 이후에 사용할 것들

const setMatchingUri = (request, context) => {
  const { requestURI } = request
  const allUriList = Object.keys(requestMapping)
  const matchingUri = allUriList.find((uri) => {
    const uriParts = uri.split('/')
    const requestUriParts = requestURI.split('/')
    if (uriParts.length !== requestUriParts.length) return false
    return uriParts.every((part, index) => (part.startsWith(':') ? true : part === requestUriParts[index]))
  })
  if (!matchingUri) {
    throw new NotFound('존재하지 않는 api 요청')
  }
  context.matchingUri = matchingUri
}
const parsePathVariables = (request, context) => {
  const { requestURI } = request
  const { matchingUri } = context
  if (!matchingUri.includes(':')) return
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

const invokeHandler = (request, context) => {
  console.log('==================================')
  console.log('[invoke] request: ', context)
  console.log('[invoke] context: ', context)
  console.log('==================================')
  const { method, parameterMap, requestBody } = request
  const { matchingUri, pathVariableMap } = context
  const handler = requestMapping[matchingUri][method]
  if (!handler) {
    throw new MethodNotAllowed(`${matchingUri}에는 ${method} 지원되지 않음`)
  }
  return handler(parameterMap || requestBody || {}, pathVariableMap || {})
}

const handlerChain = [setMatchingUri, parsePathVariables, invokeHandler]

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
      parseHttpRequest(request)
      const result = dispatchHandler(handlerChain, request)
      return {
        status: 200,
        message: 'success',
        body: JSON.stringify(result),
      }
    } catch (err) {
      console.log(err.stack)
      return {
        status: err.status,
        message: err.message,
        body: JSON.stringify(err.stack),
      }
    }
  })()
  return JSON.stringify(result)
}
console.log('==================================')
console.log('[main] request: ', INPUT)
console.log('==================================')

const response = processRequest(INPUT)

console.log('==================================')
console.log('[main] response: ', response)
console.log('==================================')
