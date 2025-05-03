class Person {
  constructor() {
    this.name = 'abc'
    return new Proxy(this, {
      get(target, prop) {
        console.log('get', prop, target[prop])
        return target[prop]
      },
      set(target, prop, value) {
        console.log('set', prop, target[prop])
        target[prop] = value
      },
    })
  }
}
const person = new Person()
console.log(person)

console.log(person.name)
person.name = 'def'
console.log(person.name)
