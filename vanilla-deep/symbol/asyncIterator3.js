const fs = require('fs')
const readline = require('readline')

async function* test() {
  const rl = readline.createInterface(fs.createReadStream('./input.txt', { encoding: 'utf-8' }))
  let resolve = null
  const lines = []
  rl.addListener('line', (line) => {
    lines.push(line)
    resolve()
  })
  rl.addListener('close', () => {
    lines.push(null)
    resolve()
  })
  while (true) {
    while (lines.length > 0) {
      const line = lines.shift()
      if (line === null) return
      yield line
    }
    await new Promise((res) => (resolve = res))
  }
}

;(async () => {
  for await (const line of test()) {
    console.log(line)
  }
})()
