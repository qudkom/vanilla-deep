Object.prototype.toString = function () {
  return (
    '{' +
    Object.entries(obj)
      .map((entry) => entry.join('='))
      .join(',') +
    '}'
  )
}

const obj = {
  name: 'aaa',
  age: 111,
}
console.log(obj.toString())
