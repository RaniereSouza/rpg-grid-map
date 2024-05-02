export function isRoutesValid(routesArg) {
  if (!Array.isArray(routesArg)) return false
  if (routesArg.length === 0) return true

  let hasValidPath = false, hasValidView = false
  return !routesArg.some(item => {
    hasValidPath = item.path && (typeof item.path === 'string')
    hasValidView = item.view && ((typeof item.view === 'function') || (
      item.view.render && (typeof item.view.render === 'function')
    ))
    return (!hasValidPath || !hasValidView)
  })
}
