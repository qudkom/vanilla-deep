class Type {
  constructor() {
    this.name = 'abc'
    this.age = 111
    this.del = 'del'
    this.nonDel = 'nonDel'
    this.readOnly = 'readOnly'

    const originalType = this
    this.original = originalType

    const proxyType = new Proxy(this, {
      // target은 원본, receiver는 Proxy
      get(target, prop, receiver) {
        console.log('===============')
        console.log('get', prop)

        console.log('target === originalType: ', target === originalType) // true
        console.log('receiver === proxyType: ', receiver === proxyType) // true
        const property = Reflect.get(target, prop, receiver)
        console.log('get property: ', property)
        console.log('===============')
        return property
      },
      // target은 원본, receiver는 Proxy
      // Proxy의 set은 명확하게 결과값(true, false)을 반환해주지 않으면 Type Error를 발생시킬 수 있다.
      set(target, prop, value, receiver) {
        console.log('set', prop, value)

        console.log('target === originalType: ', target === originalType) // true
        console.log('receiver === proxyType: ', receiver === proxyType) // true

        if (prop === 'readOnly') {
          console.log('property', prop, 'is read only prop')
          return false
        }

        const result = Reflect.set(target, prop, value, receiver)
        console.log('set result: ', result)
        console.log('===============')
        return result
      },
      deleteProperty(target, prop) {
        console.log('delete property', prop)
        if (prop === 'nonDel') {
          console.log('unremovable propperty', prop)
          return
        }
        console.log('before: ', target)
        const result = Reflect.deleteProperty(target, prop)
        console.log('deteled: ', result)
        console.log('after: ', target)
      },
    })
    console.log('===============')
    console.log('original: ', originalType)
    console.log('proxy: ', proxyType)
    console.log(originalType === proxyType)
    console.log('===============')

    // this.proxy = proxyType

    return proxyType
  }
  getTypeName() {
    // console.log('this is proxy', this === this.proxy) // true
    // console.log('this is original', this === this.original) // false
    return this.innerTypeName()
  }
  innerTypeName() {
    const nameTokens = this.name.split(':')
    const name = nameTokens.length > 1 ? nameTokens[1].trim() : nameTokens[0]
    return `type name: ${name}`
  }
  setTypeName(name) {
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

console.log('name >>', type.getTypeName())
type.setTypeName('qqq')
console.log('name>> ', type.getTypeName())
type.setTypeName('dddd')
console.log('name>> ', type.getTypeName())

type.readOnly = 'readAndWrite'
