const secretKey = Symbol('secret')

class Animal {
  // private key, private 메서드는 런타임에 직접 접근이 불가능.
  // ownKeys로 나오지 않음.
  #hiddenKey
  static staticAnimal = 'static'
  static #hiddenStaticKey = 'hidden static'
  constructor() {
    this.type = 'animal'
    this.originalType = 'animal'
    this[secretKey] = 'secret value'
    this.걷기 = function () {
      console.log('walk')
    }
    this.#hiddenKey = 'ㅇㅇㅇ'
  }
  짖기() {
    console.log('animal bark')
  }

  static staticMethod() {}

  #hiddenMethod() {
    console.log('hidden')
  }
  static #hiddenStaticMethod() {}
}
class Dog extends Animal {
  static staticDog = 'dd'
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
{
  const animal = new Animal()
  const dog = new Dog()
  const printAllKeys = (obj) => {
    const keys = new Set()
    let nextObjOrType = null
    try {
      do {
        const ownKeys = Reflect.ownKeys(obj)
        console.log('obj: ', obj, typeof obj, typeof obj.constructor)
        console.log('own keys: ', ownKeys)
        ownKeys.forEach((key) => keys.add(key))
        obj = Object.getPrototypeOf(obj)
        nextObjOrType = Object.getPrototypeOf(obj)
        console.log(obj.constructor, nextObjOrType?.constructor)

        console.log('method names: ', Reflect.ownKeys(Object.getPrototypeOf(obj.constructor)))
        // console.log('next method names: ', Reflect.ownKeys(Object.getPrototypeOf(nextObj?.constructor)))

        console.log('static keys: ', Object.getOwnPropertyNames(obj.constructor))
        // console.log('next static keys: ', Object.getOwnPropertyNames(nextObj?.constructor))

        console.log('============')
      } while (nextObjOrType)
    } catch (err) {
      console.log('error occured')
      // console.log(err)
    }
    console.log(keys)
  }
  console.log('===========')
  console.log('===========')
  printAllKeys(animal)
  console.log('===========')
  console.log('===========')
  printAllKeys(dog)
}
