const { BadRequest, MethodNotAllowed, NotFound } = require('./../types/exception')
const { requestMapping } = require('./../controller')

const routeResolver = (request, context) => {
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
const pathVariablesResolver = (request, context) => {
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

const resolveHandler = (request, context) => {
  routeResolver(request, context)
  pathVariablesResolver(request, context)
}

module.exports = {
  invokeHandler,
  resolveHandler,
}
