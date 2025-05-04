{
  class Animal {
    static #uniqueKey = Symbol.for('Animal')
    static get UNIQUE_KEY() {
      return Animal.#uniqueKey
    }
    static #keys = new Set(['name', 'age', 'type', Animal.UNIQUE_KEY])
    static #instanceMap = new Map()
    constructor() {}

    static getInstance(keyValue) {
      return Animal.#instanceMap.get(keyValue) || null
    }
    static Builder() {
      const animalInstance = new Animal()
      const builder = {
        add(key, info) {
          const isObject = info instanceof Object
          const infoMap = isObject ? { ...info } : { value: info }
          if (Animal.#keys.has(key)) {
            Reflect.defineProperty(animalInstance, key, infoMap)
          } else {
            console.warn('not allowed property', key)
          }
          return builder
        },
        build() {
          const symbolKeyExists = Object.getOwnPropertySymbols(animalInstance).some((r) => r === Animal.UNIQUE_KEY)
          console.log('own keys in build time: ', Reflect.ownKeys(animalInstance))
          if (!symbolKeyExists) {
            throw new Error('key is not exists')
          }
          const keyValue = animalInstance[Animal.UNIQUE_KEY]
          if (Animal.#instanceMap.has(keyValue)) {
            throw new Error('dupplicated key')
          }
          Animal.#instanceMap.set(keyValue, animalInstance)
          return animalInstance
        },
      }
      return builder
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
    .add(Animal.UNIQUE_KEY, 'secret')
    .build()
  const animal1 = Animal.Builder()
    //
    .add('name', { value: 'zz', enumerable: true })
    .add('age', { value: 111, enumerable: true })
    .add('type', 'A')
    .add('undefinedKey', { value: 111, enumerable: true })
    .add(Animal.UNIQUE_KEY, 'secret1')
    .build()
  try {
    Animal.Builder()
      //
      .add('name', { value: 'zz', enumerable: true })
      .add('age', { value: 111, enumerable: true })
      .add('type', 'A')
      .add('undefinedKey', { value: 111, enumerable: true })
      .add(Animal.UNIQUE_KEY, 'secret') // animal 과 중복되는 키
      .build()
  } catch (err) {
    console.log(err)
  }
  try {
    Animal.Builder()
      //
      .add('name', { value: 'zz', enumerable: true })
      .add('age', { value: 111, enumerable: true })
      .add('type', 'A')
      .add('undefinedKey', { value: 111, enumerable: true })
      // .add(Animal.ID_COL, 'secret') // 식별값 없을 경우
      .build()
  } catch (err) {
    console.log(err)
  }
  animal.cry()

  console.log('animal 0: ', animal)
  console.log('animal 1', animal1)

  console.log(Object.keys(animal))
  console.log(Reflect.ownKeys(animal))

  console.log(animal === Animal.getInstance('secret'))
  console.log(animal === Animal.getInstance('secret1'))
  console.log(animal1 === Animal.getInstance('secret1'))
  console.log(animal === Animal.getInstance('secret1'))
}
