const secretKey = Symbol('secret')

class Animal {
  constructor() {
    this.type = 'animal'
    this.originalType = 'animal'
    this[secretKey] = 'secret value'
    this.걷기 = function () {
      console.log('walk')
    }
  }
  짖기() {
    console.log('animal bark')
  }
}
class Dog extends Animal {
  constructor() {
    super()
    // this.type = 'dog'
    this.detail = 'jindotgae'
  }
  짖기() {
    // super.bark()
    console.log('dog bark')
  }
}
function shallowCopy(obj) {
  const keys = Reflect.ownKeys(obj)
  console.log('keys: ', Object.keys(obj))
  console.log('own keys: ', keys)
  console.log('own property names: ', Object.getOwnPropertyNames(obj))
  console.log('prototype constructor name: ', Object.getPrototypeOf(obj).constructor.name)

  const result = {}
  // Object.keys << Symbol 안나옴
  // Object.getOwnPropertyNames << Symbol 안나옴
  // Object.getOwnPropertySymbols << Symbol 당연히 나올거고
  // Reflect.ownKeys << 일반 key, Symbol 모두 나옴
  for (const key of keys) {
    const val = Reflect.get(obj, key)
    Reflect.set(result, key, val)
  }
  return result
}

function shallowCopy2(obj) {
  const keys = Reflect.ownKeys(obj)

  console.log('keys: ', Object.keys(obj))
  console.log('own keys: ', keys)
  console.log('own property names: ', Object.getOwnPropertyNames(obj))
  console.log('prototype constructor name: ', Object.getPrototypeOf(obj).constructor.name)

  const objConstructor = Object.getPrototypeOf(obj).constructor
  const result = new objConstructor()
  // const result = {}
  // Object.keys << Symbol 안나옴
  // Object.getOwnPropertyNames << Symbol 안나옴
  // Object.getOwnPropertySymbols << Symbol 당연히 나올거고
  // Reflect.ownKeys << 일반 key, Symbol 모두 나옴
  for (const key of keys) {
    const val = Reflect.get(obj, key)
    Reflect.set(result, key, val)
  }
  return result
}

{
  const original = {
    name: 'abc',
    [secretKey]: 'secret value',
  }
  const cloned = shallowCopy(original)
  console.log(original)
  console.log(cloned)
}
console.log('============')
{
  function Type() {
    this.name = 'abc'
    this[secretKey] = 'secret value'
  }
  const original = new Type()
  const cloned = shallowCopy(original)
  console.log(original)
  console.log(cloned)
}
console.log('============')
{
  class Type {
    constructor() {
      this.name = 'abc'
      this[secretKey] = 'secret value'
    }
  }
  const original = new Type()
  const cloned = shallowCopy(original)
  console.log(original)
  console.log(cloned)
}
console.log('============')
{
  const originalAnimal = new Animal()
  const originalDog = new Dog()

  const clonedAnimal = shallowCopy(originalAnimal)
  const clonedDog = shallowCopy(originalDog)

  console.log('original animal: ', originalAnimal)
  console.log('cloned animal: ', clonedAnimal)
  console.log('original dog: ', originalDog)
  console.log('cloned dog: ', clonedDog)
}
console.log('============')
{
  const originalAnimal = new Animal()
  const originalDog = new Dog()

  const clonedAnimal = shallowCopy2(originalAnimal)
  const clonedDog = shallowCopy2(originalDog)

  console.log('original animal: ', originalAnimal)
  console.log('cloned animal: ', clonedAnimal)
  console.log('original dog: ', originalDog)
  console.log('cloned dog: ', clonedDog)
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
      console.log(obj)

      console.log('============')
    } while (nextObj)

    console.log(keys)
    Object.create(null)
  }
  console.log('===========')
  console.log('===========')
  printAllKeys(animal)
  console.log('===========')
  console.log('===========')
  printAllKeys(dog)
}
