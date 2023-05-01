import View from '../View'

export function isRoutesValid(routesArg) {
  if (!Array.isArray(routesArg)) return false
  if (routesArg.length === 0) return true

  return !routesArg.some(item => (
    !item.path || !item.view || (typeof item.path !== 'string') ||
    (!(item.view instanceof View) && (typeof item.view !== 'function'))
  ))
}
