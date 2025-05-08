const { HTTP } = require('./types/enums')
const { item: allItems } = require('./sample/data')

const searchItem = (params, pathVarMap) => {
  console.log('=================')
  console.log('GET', '/item/:id')
  console.log('param: ', params)
  console.log('pathVars: ', pathVarMap)
  console.log('=================')
  const itemId = Number(pathVarMap.id)
  const searchedItem = allItems.find((r) => r.id === itemId)
  return searchedItem ? { ...searchedItem } : null
}

const searchSubItem = (params, pathVarMap) => {
  console.log('=================')
  console.log('GET', '/item/:itemId/sub/:subId')
  console.log('param: ', params)
  console.log('pathVars: ', pathVarMap)
  console.log('=================')
  const itemId = Number(pathVarMap.itemId)
  const subId = pathVarMap.subId
  const searchedItem = allItems.find((r) => r.id === itemId)
  if (!searchedItem) return []
  const subItem = searchedItem.sub?.find((s) => s.id === subId)
  return subItem ? { ...subItem } : null
}
const registerItem = (params, pathVarMap) => {
  console.log('=================')
  console.log('POST', '/item/:id')
  console.log('param: ', params)
  console.log('pathVars: ', pathVarMap)
  console.log('=================')
  const nextId = Math.max(...allItems.map((r) => r.id), 0) + 1
  sampleData.item.push({ id: nextId, name: `아이템${nextId}` })
}
const registerSubItem = (params, pathVarMap) => {
  console.log('=================')
  console.log('POST', '/item/:id/sub')
  console.log('param: ', params)
  console.log('pathVars: ', pathVarMap)
  console.log('=================')
  const itemId = Number(pathVarMap.id)
  const searchedItem = allItems.find((r) => r.id === itemId)
  if (!searchedItem.sub) searchedItem.sub = []
  const nextSubId = Math.max(...searchedItem.sub.map((r) => r.id), 'A')
  searchedItem.sub.push({ id: nextSubId, name: `서브아이템${nextSubId}` })
}

const searchItemList = (params) => {
  console.log('=================')
  console.log('GET', '/list')
  console.log('param: ', params)
  console.log('=================')

  const nameParam = params.name
  const nameArr = Array.isArray(nameParam) ? [...nameParam] : [nameParam]
  const searchedList = nameArr.length === 0 ? allItems : allItems.filter((r) => nameArr.some((n) => r.name.includes(n)))
  return structuredClone(searchedList)
}

const middleware = (handler, args) => {
  console.log('items(before): ', allItems)
  const result = handler(...args)
  console.log('items(after): ', allItems)
  return result
}

const requestMapping = {
  '/item/:id': {
    // 항목 조회
    [HTTP.GET]: searchItem,
  },
  '/item/:itemId/sub/:subId': {
    // 서브 항목 조회
    [HTTP.GET]: searchSubItem,
  },
  '/item': {
    // 항목 추가
    [HTTP.POST]: registerItem,
  },
  '/item/:id/sub': {
    // 서브 항목 추가
    [HTTP.POST]: registerSubItem,
  },
  '/list': {
    // 목록 조회
    [HTTP.GET]: searchItemList,
  },
}

for (const uri in requestMapping) {
  const handlerMap = requestMapping[uri]
  for (const method in handlerMap) {
    const handler = handlerMap[method]
    handlerMap[method] = (...args) => middleware(handler, args)
  }
}

module.exports = {
  requestMapping,
}
