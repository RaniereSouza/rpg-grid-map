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

  __newWindowListenerToStash({ stash, eventType, newCallback }) {
    stash.forEach((callback, index) => {
      if (!callback) return
      window.removeEventListener(eventType, callback); stash[index] = null
    })
    stash.push(newCallback); window.addEventListener(eventType, newCallback)
  }

  __onDOMContentLoaded() {
    this.__setNavigationLinkEvents(); this.__matchCurrentRoute()
  }

  __onPopstate() {
    this.__matchCurrentRoute()
  }

  __watchForNavigation() {
    this.__newWindowListenerToStash({
      stash: domContentLoadedCallbacks, eventType: 'DOMContentLoaded',
      newCallback: this.__onDOMContentLoaded.bind(this)
    })
    this.__newWindowListenerToStash({
      stash: popstateCallbacks, eventType: 'popstate',
      newCallback: this.__onPopstate.bind(this)
    })
  }

  __onClickNavigationLink(event) {
    if (event.target.matches('a[data-link]')) {
      event.preventDefault(); this.navigateTo(event.target.getAttribute('href'))
    }
  }

  __setNavigationLinkEvents() {
    this.__newWindowListenerToStash({
      stash: clickNavigationLinkCallbacks, eventType: 'click',
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
    const execute = this.__currentRoute.view.render || this.__currentRoute.view
    execute(this.__viewContainer, routeParams)
  }
}
