import App from './App'

import Router from './router'
import routes from './router/routes'

import './styles/global.css'

App.create('#app', {
  router: (viewContainer) => Router.create(viewContainer, routes),
})
