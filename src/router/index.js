import { isRoutesValid } from '../lib/validation/routesValidation'

const domContentLoadedCallbacks = [], popstateCallbacks = [], clickNavigationLinkCallbacks = []
const default404View = () => console.log('404: Not Found')

export default class Router {
  __currentRoute = {}

  get __potentialMatches() {
    return this.__routes.map(route => {
      const pathnameMatch = location.pathname.match(route.pathRegex)
      return {route, isMatch: (pathnameMatch !== null), matchResult: pathnameMatch}
    })
  }

  get currentRoute() {
    return this.__currentRoute.path
  }

  constructor(viewContainer, routes) {
    this.__viewContainer = viewContainer
    this.__routes = routes.map(route => ({
      ...route, pathRegex: this.__pathToRegex(route.path),
    }))

    this.__watchForNavigation()
  }

  static create(viewContainer, routes = []) {
    if (!(viewContainer instanceof HTMLElement))
      throw TypeError('viewContainer argument must be an HTMLElement')

    if (!isRoutesValid(routes))
      throw TypeError('routes argument must be a valid array of routes')

    return new Router(viewContainer, routes)
  }

  __pathToRegex(path) {
    const pathRegexString = `^${path.replace(/\//g, '\\/').replace(/:(\w+)/g, '(?<$1>.+)')}$`
    return new RegExp(pathRegexString)
  }

  /**
   * TODO: Since it's just removing old listeners and replacing them with one new,
   * I think there are better ways to handle it... Maybe just a single reference
   * instead of an array of callbacks? What about the case of more than one router,
   * how should this behave? Anyway, the current strategy seems inefficient
   */
  __registerWindowListener({ callbacksList, eventType, newCallback }) {
    callbacksList.forEach((callback, index) => {
      if (!callback) return
      window.removeEventListener(eventType, callback); callbacksList[index] = null // <- Probably a waste of memory, removed callbacks just become null values in the array
    })
    callbacksList.push(newCallback); window.addEventListener(eventType, newCallback) // <- The only thing remaining in the array is one valid callback and a bunch of null values
  }

  __onDOMContentLoaded() {
    this.__setNavigationLinkEvents(); this.__matchCurrentRoute()
  }

  __onPopstate() {
    this.__matchCurrentRoute()
  }

  __watchForNavigation() {
    this.__registerWindowListener({
      callbacksList: domContentLoadedCallbacks, eventType: 'DOMContentLoaded',
      newCallback: this.__onDOMContentLoaded.bind(this)
    })
    this.__registerWindowListener({
      callbacksList: popstateCallbacks, eventType: 'popstate',
      newCallback: this.__onPopstate.bind(this)
    })
  }

  __onClickNavigationLink(event) {
    if (event.target.matches('a[data-link]')) {
      event.preventDefault(); this.navigateTo(event.target.getAttribute('href'))
    }
  }

  __setNavigationLinkEvents() {
    this.__registerWindowListener({
      callbacksList: clickNavigationLinkCallbacks, eventType: 'click',
      newCallback: this.__onClickNavigationLink.bind(this)
    })
  }

  navigateTo(path) {
    history.pushState(null, null, path); this.__matchCurrentRoute()
  }

  __matchCurrentRoute() {
    let match = this.__potentialMatches.find(item => item.isMatch)
    if (!match) match = {
      route: {path: location.pathname, view: default404View}, isMatch: true,
    }

    this.__currentRoute = match.route
    this.__renderCurrentView(match.matchResult?.groups)
  }

  __renderCurrentView(routeParams) {
    const render = this.__currentRoute.view.render || this.__currentRoute.view
    render(this.__viewContainer, routeParams)
  }
}
