Object.prototype[Symbol.iterator] = function () {
  const entries = Object.entries(this)
  let i = 0
  return {
    next: function () {
      if (i++ < entries.length) {
        return {
          value: entries[i - 1],
          done: false,
        }
      }
      return {
        done: true,
      }
    },
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
