{
  const secret = Symbol('hidden-type')

  const target = {}
  const secretValue = 'proxy'

  Object.defineProperty(Proxy, Symbol.hasInstance, {
    value(instance) {
      const symbols = Object.getOwnPropertySymbols(instance)
      console.log(symbols)
      return symbols.some((s) => instance[s] === 'proxy')
    },
  })

  // Object.defineProperty(Proxy, secret, {
  //   value: secretValue,
  // 이렇게 비밀키를 넣어놔도 new Proxy로 생성한 개별 인스턴스에 적용이 안됨
  // })

  const proxyTarget = new Proxy(target, {
    get(target, prop) {
      console.log(`accessed `, prop, target[prop])
      return target[prop]
    },
  })
  Object.defineProperty(proxyTarget, secret, {
    value: secretValue,
    // 개별 인스턴스에 따로 비밀키를 넣는건 적용이 되지만 이렇게 하면 의미가 없음
  })
  // console.log(proxyTarget.name)

  console.log(target)
  console.log(proxyTarget)

  console.log(proxyTarget instanceof Proxy)

  // Proxy 객체는 instanceof 를 지원하지 않아서 Symbol.hasInstance를 직접 정의하여 쓸 수 있게 되긴 했으나
  // 비밀키가 개별 객체에 안들어가서
}
