function Type1() {
  this.name = 'abc'

  console.log('Type1 constructor')
}

class Type2 {
  constructor() {
    this.name = 'abc'
    console.log('Type2 constructor')
  }
}
// 타입 자체에 프록시 설정
const Type1Proxy = new Proxy(Type1, {
  construct(target) {
    const instance = new target()
    instance.name = instance.name + ' type1'
    console.log('proxy constructor 1')
    return instance
  },
})
const Type2Proxy = new Proxy(Type2, {
  construct(target) {
    const instance = new target()
    instance.name = instance.name + ' type2'
    console.log('proxy constructor 2')
    return instance
  },
})

const type1 = new Type1()
// 개별 인스턴스에 프록시 설정
const type1Proxy2 = new Proxy(type1, {
  get(target, prop) {
    console.log('get')
    return target[prop]
  },
})
console.log('type1 개별 프록시', type1Proxy2.name)
const type1_2 = new Type1()
console.log('순수 type1', type1_2.name)

const result1 = new Type1Proxy()
const result2 = new Type2Proxy()
// const result3 = new Type1Proxy2()

console.log(result1.name)
console.log(result2.name)

// console.log(result3.name)
