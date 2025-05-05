function Person(name1) {
  this.name1 = name1
}
Person.prototype.sayHi = function () {
  console.log(`[instance] Hi, I'm ${this.name1}`)
  console.log(this)
}
Person.sayHi = function () {
  console.log(`[static] Hi, I'm ${this.name1}`)
  console.log(this)
}

function Person2(name1) {
  this.name1 = name1
  this.sayHi = function () {
    console.log(`[in object] Hi, I'm ${this.name1}`)
    console.log(this)
  }
}

var sayHi = new Person('이동근').sayHi
var sayHi = new Person2('이동근').sayHi

function test() {
  console.log('test')
}
test.sayHi = function () {
  console.log('test say hi')
  console.log(this)
}

new Person('이동근1').sayHi === new Person('이동근2').sayHi
// true
new Person2('이동근1').sayHi === new Person2('이동근2').sayHi
// false

const person = new Person('이동근1')
console.log(person)
person.sayHi()

const person1 = new Person2('이동근2')
console.log(person1)
person1.sayHi()

Person.sayHi()
