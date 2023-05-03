import { isRoutesValid } from '../lib/validation/routesValidation'

export default class Router {
  __currentRoute = {}

  get __potentialMatches() {
    return this.__routes.map(route => {
      const pathnameMatch = location.pathname.match(route.pathRegex)

      return {
        route,
        isMatch:     (pathnameMatch !== null),
        matchResult: pathnameMatch,
      }
    })
  }

  get currentRoute() {
    return this.__currentRoute.path
  }

  constructor(viewContainer, routes) {
    this.__viewContainer  = viewContainer
    this.__routes         = routes.map(route => ({
                              ...route,
                              pathRegex: this.__pathToRegex(route.path)
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
    const pathRegexString = `^${
      path.replace(/\//g, '\\/').replace(/:(\w+)/g, '(?<$1>.+)')
    }$`

    return new RegExp(pathRegexString)
  }

  __watchForNavigation() {
    document.addEventListener('DOMContentLoaded', () => {
      this.__setNavigationLinkEvents()
      this.__matchCurrentRoute()
    })

    window.addEventListener('popstate', () => this.__matchCurrentRoute())
  }

  __setNavigationLinkEvents() {
    document.body.addEventListener('click', event => {
      console.log('something was clicked')
      if (event.target.matches('a[data-link]')) {
        event.preventDefault()
        this.navigateTo(event.target.getAttribute('href'))
      }
    })
  }

  navigateTo(path) {
    history.pushState(null, null, path)
    this.__matchCurrentRoute()
  }

  __matchCurrentRoute() {
    let match = this.__potentialMatches.find(item => item.isMatch)
    if (!match) match = {
      route: {
        path: location.pathname,
        view: {render: () => console.log('404: Not Found')},
      },
      isMatch: true,
    }

    this.__currentRoute = match.route
    this.__renderCurrentView(match.matchResult?.groups)
  }

  __renderCurrentView(routeParams) {
    const execute = this.__currentRoute.view.render || this.__currentRoute.view
    execute(this.__viewContainer, routeParams)
  }
}
