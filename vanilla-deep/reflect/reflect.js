const obj = {
  action: () => () => {},
}
const keyFunc = obj.action()
console.log(typeof keyFunc)
obj[keyFunc] = 'aaaaaa'
console.log(obj, obj[keyFunc])

Object.defineProperty(obj, 'name', {
  value: 'aaa',
  // enumerable, false 가 기본값. false일 경우 Object.keys로 안보이고 for in 반복으로 안나옴
  // writable, false 가 기본값
})

console.log(Object.getOwnPropertyNames(obj))
console.log(obj.name)

obj.name = 'ddd'

console.log(Object.keys(obj))

console.log(obj.name)
console.log(obj.action)

console.log(Reflect.get(obj, 'name'))
console.log(Reflect.get({}, 'name'))
console.log(Reflect.get(obj, 'action'))

// ECMAScript 명세에 따르면, Reflect.get(target, propertyKey)에서
// propertyKey는 실제로 **ToPropertyKey(argument)**라는 과정을 거칩니다.

// 이 ToPropertyKey(argument)는 다음 순서로 처리됩니다:

// ToPrimitive(argument, hint: string)

// If Type(argument) is Symbol, return it.

// Else ToString(argument)

// typeof keyFunc는 'function' 이지만 에러가 발생하지 않음.
// keyFunc가 Reflect.get 안에서 문자열로 바뀌게 된다
console.log(Reflect.get(obj, keyFunc))
