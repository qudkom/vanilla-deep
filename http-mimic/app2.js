// 요청 데이터 예시
const INPUT = require('./input/get_item')
const { BadRequest, MethodNotAllowed, NotFound } = require('./types/exception')
const { parseHttpRequest } = require('./util/request')
const { invokeHandler, resolveHandler } = require('./util/processor')

// request parse 이후에 사용할 것들

const processChain = [parseHttpRequest, resolveHandler, invokeHandler]

const dispatchHandlers = (handlers, request) => {
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

  const response = new Proxy(dispatchHandlers, {
    apply: (target, thisArg, args) => {
      try {
        const result = Reflect.apply(target, thisArg, args)
        return {
          status: 200,
          message: 'success',
          body: JSON.stringify(result),
        }
      } catch (err) {
        console.log(err)
        return {
          status: err.status,
          message: err.message,
          body: JSON.stringify(err.stack),
        }
      }
    },
  })(processChain, request)

  return JSON.stringify(response)
}
console.log('==================================')
console.log('[main] request: ', INPUT)
console.log('==================================')

const response = processRequest(INPUT)

console.log('==================================')
console.log('[main] response: ', response)
console.log('==================================')
