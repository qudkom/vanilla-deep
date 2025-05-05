const proxyObj = new Proxy(
  {
    name: 'name',
    secret: 'secret',
    del: 'del',
    hidden: 'hidden',
  },
  {
    has(target, prop) {
      if (prop === 'secret') return false
      return target[prop]
    },
    deleteProperty(target, prop) {
      if (prop === 'del') return false
      return delete target[prop]
    },
    ownKeys(target) {
      return Object.keys(target).filter((key) => key !== 'hidden')
      // const obj = { // ArrayLike 타입에 맞춘 반환값
      //   0: 'name',
      //   1: 'secret',
      //   2: 'del',
      //   length: 3,
      // }
      // return obj
    },
  }
)
console.log('name' in proxyObj)
console.log('secret' in proxyObj)
console.log('del' in proxyObj)

console.log(Object.keys(proxyObj))

let deleted = delete proxyObj.del
console.log(deleted, proxyObj)

deleted = delete proxyObj.name
console.log(deleted, proxyObj)
