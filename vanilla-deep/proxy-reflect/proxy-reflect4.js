class InvalidParam extends Error {
  message = 'invalid param'
}
class InvalidReturn extends Error {
  message = 'invalid return'
}
class Type {
  constructor() {
    this.name = 'abc'
    this.age = 111
    this.del = 'del'
    this.nonDel = 'nonDel'
    this.readOnly = 'readOnly'

    const exceptionHandlingProxy = {
      apply(target, thisArg, args) {
        console.log('target>> ', target)
        console.log('this>> ', thisArg)
        try {
          const result = Reflect.apply(target, thisArg, args)
          console.log('result>> ', result)

          return result
        } catch (err) {
          if (err instanceof InvalidParam) {
            console.log('부적절한 입력값 예외처리: ', err.message)
          } else if (err instanceof InvalidReturn) {
            console.log('부적절한 반환값 예외처리', err.message)
          }
          return null
        }
      },
    }

    const matchingProxy = {
      getName: {
        method: this.#getName_secret,
        validParams: (args) => {
          if (args.length > 0) {
            console.log('입력값 오류')
            return false
          }
          return true
        },
        validReturn: (value) => {
          if (typeof value !== 'string') {
            console.log('잘못된 반환값')
            return false
          }
          return true
        },
      },
      setName: {
        method: this.#setName_secret,
        validParams: (args) => {
          if (args.length !== 1 || typeof args[0] !== 'string') {
            console.log('입력값 잘못됨')
            return false
          }
          return true
        },
        validReturn: (value) => {
          if (typeof value !== 'undefined') {
            console.log('잘못된 결과값')
            return false
          }
          return true
        },
      },
    }

    for (const key in matchingProxy) {
      const { method, validParams, validReturn } = matchingProxy[key]
      const validateProxy = new Proxy(method, {
        apply(targetMethod, thisArg, args) {
          const isValidParam = validParams(args)
          if (!isValidParam) throw new InvalidParam()
          const result = Reflect.apply(targetMethod, thisArg, args)
          const isValidReturn = validReturn(result)
          if (!isValidReturn) throw new InvalidReturn()
          return result
        },
      })
      this[key] = new Proxy(validateProxy, exceptionHandlingProxy)
    }

    console.log('======================')
    console.log('initialized')
    console.log('======================')
  }
  #getName_secret() {
    const nameTokens = this.name.split(':')
    const name = nameTokens.length > 1 ? nameTokens[1].trim() : nameTokens[0]
    return `type name: ${name}`
  }
  #setName_secret(name) {
    this.name = `type name: ${name}`
  }
}

const type = new Type()
// console.log(type)

type.age = 120
console.log(type.age)

delete type.del // 정상 삭제
delete type.del // 삭제한걸 또 삭제 or 없는 속성을 삭제하려고 해도 에러가 나진 않는다.
delete type.aaa
delete type.nonDel // 삭제 못하게 막기

console.log(type.name)
type.name = 'tttt'
console.log(type.name)

console.log('name >>', type.getName())
type.setName('qqq')
console.log('name>> ', type.getName())
type.setName('dddd')
console.log('name>> ', type.getName())

type.readOnly = 'readAndWrite'
type.setName()
type.setName(21)
type.getName(111)
console.log(type.getName(11))
