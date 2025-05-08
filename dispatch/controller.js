const { HTTP } = require('./types/enums')
const { item: allItems } = require('./sample/data')
const { NotFound } = require('./types/exception')

const searchItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.id)
  const searchedItem = allItems.find((r) => r.id === itemId)
  return searchedItem ? { ...searchedItem } : null
}

const updateItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.id)
  const { name } = params
  const item = allItems.find((r) => r.id === itemId)
  item.name = name
}
const deleteItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.id)
  const itemIdx = allItems.findIndex((r) => r.id === itemId)
  allItems.splice(itemIdx, 1)
}
const updateSubItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.id)
  const subItemId = pathVarMap.subId
  const { name } = params
  const item = allItems.find((r) => r.id === itemId)
  const subItem = item.sub?.find((r) => r.id === subItemId)
  subItem.name = name
}
const deleteSubItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.id)
  const subItemId = pathVarMap.subId
  const item = allItems.find((r) => r.id === itemId)
  const subItemIdx = item.sub?.findIndex((r) => r.id === subItemId)
  item.sub.splice(subItemIdx, 1)
}

const searchItemList = (params) => {
  const nameParam = params.name
  const names = (Array.isArray(nameParam) ? [...nameParam] : [nameParam]).filter(Boolean)
  const searchedList = names.length === 0 ? allItems : allItems.filter((r) => names.some((n) => r.name.includes(n)))
  return structuredClone(searchedList)
}

const searchSubItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.itemId)
  const subId = pathVarMap.subId
  const searchedItem = allItems.find((r) => r.id === itemId)
  if (!searchedItem) return []
  const subItem = searchedItem.sub?.find((s) => s.id === subId)
  return subItem ? { ...subItem } : null
}

const searchSubItemList = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.itemId)
  const nameParam = params.name
  const subNames = (Array.isArray(nameParam) ? [...nameParam] : [nameParam]).filter(Boolean)
  const searchedItem = allItems.find((r) => r.id === itemId)
  const subItemList = searchedItem?.sub || []
  const searchedList = subNames.length === 0 ? subItemList : subItemList.filter((r) => subNames.some((n) => r.name.includes(n)))
  return structuredClone(searchedList)
}

const registerItem = (params, pathVarMap) => {
  const nextId = Math.max(...allItems.map((r) => r.id), 0) + 1
  const regItemName = params.name || `아이템${nextId}`
  allItems.push({ id: nextId, name: regItemName })
}
const registerSubItem = (params, pathVarMap) => {
  const itemId = Number(pathVarMap.id)
  const searchedItem = allItems.find((r) => r.id === itemId)
  if (!searchItem) {
    throw new NotFound()
  }
  if (!searchedItem.sub) searchedItem.sub = []
  const nextSubIdCode = Math.max(...searchedItem.sub.map((r) => r.id.charCodeAt(0)), 'A'.charCodeAt(0)) + 1
  const nextSubId = String.fromCharCode(nextSubIdCode)
  const regItemName = params.name || `아이템${nextSubId}`
  searchedItem.sub.push({ id: nextSubId, name: regItemName })
}

const middleware = (handler, args) => {
  console.log('==================================')
  console.log('[controller] items(before)')
  console.dir(allItems, { depth: null })
  console.log('[controller] handler: ', handler)
  console.log('[controller] param: ', args[0])
  if (args[1]) {
    console.log('[controller] pathValues: ', args[1])
  }
  const result = handler(...args)
  console.log('[controller] result: ', result)
  console.log('[controller] items(after)')
  console.dir(allItems, { depth: null })
  console.log('==================================')
  return result
}

const requestMapping = {
  '/item/:id': {
    // 항목 조회
    [HTTP.GET]: searchItem,
    [HTTP.PUT]: updateItem,
    [HTTP.DELETE]: deleteItem,
  },
  '/item/:id/sub-item/:subId': {
    // 서브 항목 조회
    [HTTP.GET]: searchSubItem,
    [HTTP.PUT]: updateSubItem,
    [HTTP.DELETE]: deleteSubItem,
  },
  '/item/:id/sub-items': {
    // 서브 항목 조회
    [HTTP.GET]: searchSubItemList,
  },
  '/item': {
    // 항목 추가
    [HTTP.POST]: registerItem,
  },
  '/item/:id/sub-item': {
    // 서브 항목 추가
    [HTTP.POST]: registerSubItem,
  },
  '/items': {
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
