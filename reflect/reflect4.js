const secretKey = Symbol('secret')

function Animal() {
  this.type = 'animal'
  this.originalType = 'animal'
  this[secretKey] = 'secret value'
  this.걷기 = function () {
    console.log('walk')
  }
}
Animal.prototype['짖기'] = function () {
  console.log('animal bark')
}
function Dog() {
  Animal.call(this)
  this.detail = 'jindotgae'
}
Dog.prototype['짖기'] = function () {
  console.log('animal bark')
}

{
  const animal = new Animal()
  const dog = new Dog()
  const printAllKeys = (obj) => {
    const keys = new Set()
    let nextObj = null
    do {
      const ownKeys = Reflect.ownKeys(obj)
      console.log('own keys: ', ownKeys, obj)
      ownKeys.forEach((key) => keys.add(key))
      obj = Object.getPrototypeOf(obj)
      nextObj = Object.getPrototypeOf(obj)

      console.log('============')
    } while (nextObj)
    console.log(keys)
  }
  console.log('===========')
  console.log('===========')
  printAllKeys(animal)
  console.log('===========')
  console.log('===========')
  printAllKeys(dog)
}
