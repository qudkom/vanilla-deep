function introduce(lang) {
  console.log(`${lang}: My name is ${this.name1}`)
}

const person1 = { name1: 'Alice' }
const person2 = { name1: 'Bob' }

introduce.call(person1, 'English') // English: My name is Alice
introduce.call(person2, 'Korean') // Korean: My name is Bob

const introPerson1 = introduce.bind(person1)
const introPerson2 = introduce.bind(person2)

introPerson1('FR')
introPerson2('JP')

introduce('EN')
