const fs = require('fs')
const readline = require('readline')

async function* test2() {
  const rl = readline.createInterface({
    input: fs.createReadStream('./input.txt', { encoding: 'utf-8' }),
  })
  console.log(rl[Symbol.asyncIterator])
  console.log(rl[Symbol.iterator])
  for await (const line of rl) {
    yield line
    await new Promise((res) => setTimeout(res, 100))
  }
}
;(async () => {
  for await (const line of test2()) {
    console.log(line)
  }
})()
