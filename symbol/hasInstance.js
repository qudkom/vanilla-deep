function Type1() {
  this.name = 'type1'
}
function Type2() {
  this.name = 'type2'
}

class Type3 {
  constructor() {
    this.name = 'type3'
  }
}

const type1Instance = new Type1()
const type2Instance = new Type2()
const type3Instance = new Type3()

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

console.log(type1Instance.__proto__.constructor === Type1)
console.log(type3Instance.__proto__.constructor === Type3)
