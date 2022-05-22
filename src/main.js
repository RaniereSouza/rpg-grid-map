import App from './App'

import Router, { routes } from './router'

import './styles/global.css'

App.create('#app', {
  router: {routes, ctor: Router.create}
})
