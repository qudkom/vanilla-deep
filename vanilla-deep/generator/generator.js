Object.prototype[Symbol.iterator] = function* () {
  for (const key in this) {
    yield key + this[key]
  }
}

const obj = {
  name: 'aaa',
  name1: 'sss',
}

for (const a of obj) {
  console.log(a)
}

const arr = [...obj]
console.log(arr)
