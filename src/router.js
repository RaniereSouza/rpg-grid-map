import HomeComponent from './pages/Home'

class Router {
  __currentRoute = {}
  __routes = [
    {path: '/',             component: new HomeComponent()},
    {path: '/map-creation', component: {render: () => console.log('viewing Map Creation page')}},
  ]

  get __potentialMatches() {
    return this.__routes.map(route => {
      return {
        route,
        isMatch: (location.pathname === route.path),
      }
    })
  }

  constructor(pageContainer) {
    this.__pageContainer      = pageContainer
    this.__watchForNavigation = this.__watchForNavigation.bind(this)
    this.__navigateTo         = this.__navigateTo.bind(this)
    this.__matchCurrentRoute  = this.__matchCurrentRoute.bind(this)
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

  static create(pageContainer) {
    return new Router(pageContainer)
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
  }

  __navigateTo(path) {
    history.pushState(null, null, path)
    this.__matchCurrentRoute()
  }

  __matchCurrentRoute() {
    let match = this.__potentialMatches.find(item => item.isMatch)
    if (!match) match = {
      route: {
        path:      location.pathname,
        component: {render: () => console.log('404: Not Found')}
      },
      isMatch: true,
    }

    console.log('current route match:', match)
    this.__currentRoute = match.route
    this.__currentRoute.component.render(this.__pageContainer)
  }
}

export default Router
