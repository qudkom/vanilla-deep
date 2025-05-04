{
  const keyValueMap = {
    name: {
      value: 'aaa',
      enumerable: true,
      configurable: false,
      writable: false,
    },
    age: {
      value: 111,
      enumerable: false,
      configurable: false,
      writable: false,
    },
    type: {
      value: 'dog',
      enumerable: false,
      configurable: false,
      writable: false,
    },
    [Symbol('secret')]: {
      value: 'secret value',
      enumerable: false,
      configurable: false,
      writable: false,
    },
  }
  const allkeys = Reflect.ownKeys(keyValueMap)

  const result = {}
  for (const key of allkeys) {
    const valInfo = keyValueMap[key]
    Reflect.defineProperty(result, key, valInfo)
  }
  console.log('result: ', result)
  function print(obj, names) {
    for (const name of names) {
      console.log(name, name in obj, obj[name])
    }
    console.log('==============')
  }
  const keys = Object.keys(result)
  const propertyNames = Object.getOwnPropertyNames(result)
  const symbols = Object.getOwnPropertySymbols(result)
  const ownKeys = Reflect.ownKeys(result)
  console.log('==============')
  console.log('keys: ', keys)
  print(result, keys)
  console.log('own property names: ', propertyNames)
  print(result, propertyNames)
  console.log('own symbols: ', symbols)
  print(result, symbols)
  console.log('own keys: ', ownKeys)
  print(result, ownKeys)

  console.log('========')
  for (const key in result) {
    console.log(key, result[key])
  }
  console.log(Object.entries(result))
  console.log(Object.values(result))

  //   for in, Object.keys, Object.values, Object.entirs
  // enumerable 이 true인 key 에 해당하는 것들만 나옴
}
