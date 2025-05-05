const obj = {
  data: {
    name: 'aaa',
    name1: 'qqq',
  },
  [Symbol.iterator]() {
    let i = 0
    const entries = Object.entries(this.data)
    const size = entries.length
    return {
      next() {
        const idx = i++
        if (idx < size) {
          return {
            value: entries[idx],
            done: false,
          }
        }
        return {
          done: true,
        }
      },
    }
  },
}

for (const a of obj) {
  console.log(a)
}

const arr = [...obj]
console.log(arr)
