class Type {
  constructor() {
    this.name = 'abc'
    this.age = 111
    this.del = 'del'
    this.nonDel = 'nonDel'
    this.readOnly = 'readOnly'

    const originalType = this

    console.log('===============')
    console.log('original: ', originalType)
    console.log('===============')

    // this.proxy = proxyType
    const proxyGetName = new Proxy(this.#getName_secret, {
      apply(target, thisArg, args) {
        console.log('===============')
        console.log('=====apply=====')
        console.log('target: ', target)
        console.log('thisArg: ', thisArg)
        console.log('args: ', args)
        console.log('target is original method: ', target === originalType.#getName_secret)
        console.log('target is proxy method: ', target === proxyGetName)

        console.log('thisArg is original', thisArg === originalType)

        console.log('apply before')
        const result = Reflect.apply(target, thisArg, args)
        console.log('result: ', result)
        console.log('apply after')
        console.log('=====apply=====')
        console.log('===============')
        return result
      },
    })
    const proxySetName = new Proxy(this.#setName_secret, {
      apply(target, thisArg, args) {
        console.log('===============')
        console.log('=====apply=====')
        console.log('target: ', target)
        console.log('thisArg: ', thisArg)
        console.log('args: ', args)
        console.log('target is original method: ', target === originalType.#setName_secret)
        console.log('target is proxy method: ', target === proxySetName)

        console.log('thisArg is original', thisArg === originalType)

        console.log('apply before')
        const result = Reflect.apply(target, thisArg, args)
        console.log('result: ', result)
        console.log('apply after')
        console.log('=====apply=====')
        console.log('===============')
        return result
      },
    })
    this.getName = proxyGetName
    this.setName = proxySetName
    console.log('======================')
    console.log('initialized')
    console.log('======================')
  }
  #getName_secret() {
    // console.log('this is proxy', this === this.proxy)
    // console.log('this is original', this === this.original)
    const nameTokens = this.name.split(':')
    const name = nameTokens.length > 1 ? nameTokens[1].trim() : nameTokens[0]
    return `type name: ${name}`
  }
  #setName_secret(name) {
    this.name = `type name: ${name}`
  }
}

const type = new Type()
console.log(type)

type.age = 120
console.log(type.age)

delete type.del // 정상 삭제
delete type.del // 삭제한걸 또 삭제 or 없는 속성을 삭제하려고 해도 에러가 나진 않는다.
delete type.aaa
delete type.nonDel // 삭제 못하게 막기

console.log(type.name)
type.name = 'tttt'
console.log(type.name)

console.log('name >>', type.getName())
type.setName('qqq')
console.log('name>> ', type.getName())
type.setName('dddd')
console.log('name>> ', type.getName())

type.readOnly = 'readAndWrite'
