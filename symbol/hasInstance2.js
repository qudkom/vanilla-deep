function Type1() {
  this.name = 'type1'
  this.type = 'type1'
}
// Type1[Symbol.hasInstance] = function (obj) {
//   console.log('instanceof Type1')
//   return obj.name === 'type1'
// }
Object.defineProperty(Type1, Symbol.hasInstance, {
  value(obj) {
    console.log(obj.type, 'is instanceof Type1: ', obj.name === 'type1')
    return obj.name === 'type1'
  },
})
function Type2() {
  this.name = 'type1'
  this.type = 'type2'
}

class Type3 {
  constructor() {
    this.name = 'type3'
    this.type = 'type3'
  }
  static [Symbol.hasInstance](obj) {
    console.log(obj.type, 'is instanceof Type3: ', obj.name === 'type3')
    return obj.name === 'type3'
  }
}

const type1Instance = new Type1()
const type2Instance = new Type2()
const type3Instance = new Type3()
const obj = {
  name: 'type1',
  type: 'type0',
}

console.log(type1Instance)
console.log(type1Instance instanceof Type1)
console.log(type1Instance instanceof Type2)
console.log(type1Instance instanceof Type3)

console.log(type2Instance)
console.log(type2Instance instanceof Type1)
console.log(type2Instance instanceof Type2)
console.log(type2Instance instanceof Type3)

console.log(type3Instance)
console.log(type3Instance instanceof Type1)
console.log(type3Instance instanceof Type2)
console.log(type3Instance instanceof Type3)
console.log('======')
console.log(obj instanceof Type1)
