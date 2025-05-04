{
  const symbol = Symbol('symbol')
  class Animal {
    static #keys = new Set(['name', 'age', 'type', symbol])
    constructor() {}
    static Builder() {
      const animalInstance = new Animal()
      return Animal.#builderProps(animalInstance)
    }
    static #builderProps(animalInstance) {
      const add = (key, infoObj) => Animal.#add(animalInstance, key, infoObj)
      // const add = (key, infoObj) => Animal.#add.call(null, animalInstance, key, infoObj)
      return { add, build: () => animalInstance }
    }
    static #add(animalInstance, key, info) {
      console.log(arguments)

      const isObject = info instanceof Object
      const infoMap = isObject ? { ...info } : { value: info }
      if (Animal.#keys.has(key)) {
        Reflect.defineProperty(animalInstance, key, infoMap)
      } else {
        console.warn('not allowed property', key)
      }
      return Animal.#builderProps(animalInstance)
    }

    cry() {
      console.log('cry')
    }
  }

  const animal = Animal.Builder()
    //
    .add('name', { value: 'zz', enumerable: true })
    .add('age', { value: 111, enumerable: true })
    .add('type', 'A')
    .add('undefinedKey', { value: 111, enumerable: true })
    .add(symbol, 'secret')
    .build()

  animal.cry()

  console.log(animal)

  console.log(Object.keys(animal))
  console.log(Reflect.ownKeys(animal))
}
