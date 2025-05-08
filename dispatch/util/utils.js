const buildQueryStr = (obj) => {
  const query = Object.entries(obj)
    .map(([key, value]) => (Array.isArray(value) && value.length > 1 ? value.map((val) => [key, val]) : [[key, value]]))
    .flat()
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return query ? '?' + query : ''
}

const parseQueryStr = (input) => {
  const params = input.split('&')
  const paramMap = params.reduce((acc, item) => {
    const [key, value] = item.split('=')
    let values = []
    if (!acc[key]) {
      acc[key] = values
    }
    values.push(value.trim())
    return acc
  }, {})
  const finalParamMap = Object.fromEntries(Object.entries(paramMap).map((key, values) => (values.length === 1 ? [key, values[0]] : [key, values])))
  return finalParamMap
}

module.exports = {
  buildQueryStr,
  parseQueryStr,
}

// console.log(buildQueryStr({ name: 'aaa', age: [1, 2, 3] }))
