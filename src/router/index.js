import routesList from './routes'

export const routes = routesList

class Router {
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

  constructor(viewContainer, routes = []) {
    this.__viewContainer  = viewContainer
    this.__routes         = routes.map(route => ({
                              ...route,
                              pathRegex: this.__pathToRegex(route.path)
                            }))

    this.__watchForNavigation()

    return new Proxy(this, {
      get: (target, key) => {
        const keyString   = String(key)
        const visibleKeys = ['currentRoute', 'navigateTo']
        if (!visibleKeys.includes(keyString)) return undefined

        if (keyString === 'currentRoute') return target.__currentRoute.path
        if (keyString === 'navigateTo') return function() {
          target.__navigateTo.apply(target, arguments)
        }
      }
    })
  }

  static create(viewContainer, routes) {
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
      document.body.addEventListener('click', event => {
        if (event.target.matches('a[data-link]')) {
          event.preventDefault()
          this.__navigateTo(event.target.getAttribute('href'))
        }
      })
      
      this.__matchCurrentRoute()
    })

    window.addEventListener('popstate', this.__matchCurrentRoute)
  }

  __navigateTo(path) {
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

    console.log('current route match:', match)
    this.__currentRoute = match.route
    this.__currentRoute.view.render(
      this.__viewContainer,
      match.matchResult?.groups,
    )
  }
}

export default Router
